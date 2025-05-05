"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface EventItem {
  name: string;
  from_date: Date;
  to_date: Date  ;
  from_time: string;
  to_time: string;
  venue: string;
  description: string;
  category: "Upcoming" | "Past";
}

const convertDate = (date: Date | string) => {
  if(!date){
    return "NA";
  }
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const convertTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const supabase = createClient();

  const fetchEvents = async () => {
    const { data: eventsData, error: eventsError } = await supabase
      .from("Events")
      .select("*");

    if (eventsError) {
      toast({
        title: "Error",
        description: "Failed to fetch Events",
        variant: "destructive",
      });
    } else {
      const processedEvents = (eventsData as EventItem[]).map((event) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today
      
        const fromDate = new Date(event.from_date);
        const toDate = event.to_date ? new Date(event.to_date) : null;
      
        fromDate.setHours(0, 0, 0, 0);
        if (toDate) toDate.setHours(0, 0, 0, 0);
      
        let category: "Upcoming" | "Past" = "Past";
      
        if (toDate && toDate >= today) {
          category = "Upcoming";
        } else if (!toDate && fromDate >= today) {
          category = "Upcoming";
        }
      
        return { ...event, category };
      });
      
      setEvents(processedEvents);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
 

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <div className="bg-black py-6 mb-12">
          <h1 className="text-3xl font-bold text-center text-white">
            Community Events
          </h1>
        </div>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" className="text-[#B22222]">
              Upcoming / Ongoing Events
            </TabsTrigger>
            <TabsTrigger value="past" className="text-[#B22222]">
              Past Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <EventList
              events={events.filter((event) => event.category === "Upcoming")}
              setSelectedEvent={setSelectedEvent}
            />
          </TabsContent>
          <TabsContent value="past">
            <EventList
              events={events.filter((event) => event.category === "Past")}
              setSelectedEvent={setSelectedEvent}
            />
          </TabsContent>
        </Tabs>
      </div>
      <AnimatePresence>
        {selectedEvent && (
          <Dialog
            open={!!selectedEvent}
            onOpenChange={() => setSelectedEvent(null)}
          >
            <DialogContent className="bg-white border-2 border-[#B22222]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#B22222]">
                  {selectedEvent.name}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <div className="flex items-center text-[#4A2C2A] mb-2">
                  <Calendar className="mr-2" size={16} />
                  <span>
                    {convertDate(selectedEvent.from_date)} {selectedEvent.to_date ? `- ${convertDate(selectedEvent.to_date)}` : ""}
                  </span>
                </div>
                <div className="flex items-center text-[#4A2C2A] mb-2">
                  <Clock className="mr-2" size={16} />
                  <span>
                    {convertTime(selectedEvent.from_time)} -{" "}
                    {convertTime(selectedEvent.to_time)}
                  </span>
                </div>
                <div className="flex items-center text-[#4A2C2A] mb-4">
                  <MapPin className="mr-2" size={16} />
                  <span>{selectedEvent.venue}</span>
                </div>
                <p className="text-[#4A2C2A]">{selectedEvent.description}</p>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function EventList({
  events,
  setSelectedEvent,
}: {
  events: EventItem[];
  setSelectedEvent: (event: EventItem) => void;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <motion.div
          key={event.name}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-white border-2 border-[#B22222] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-[#B22222]">{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-[#4A2C2A] mb-2">
                <Calendar className="mr-2" size={16} />
                <span>
                  {convertDate(event.from_date)} 
                  {event.to_date ? `- ${convertDate(event.to_date)}` : ""}

                </span>
              </div>
              <div className="flex items-center text-[#4A2C2A] mb-2">
                <Clock className="mr-2" size={16} />
                <span>
                  {convertTime(event.from_time)} - {convertTime(event.to_time)}
                </span>
              </div>
              <div className="flex items-center text-[#4A2C2A] mb-4">
                <MapPin className="mr-2" size={16} />
                <span>{event.venue}</span>
              </div>
              <Button
                onClick={() => setSelectedEvent(event)}
                className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
