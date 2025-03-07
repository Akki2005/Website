"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin } from "lucide-react"

interface EventItem {
  title: string
  date: string
  time: string
  location: string
  description: string
  category: "Upcoming" | "Past"
}

const events: EventItem[] = [
  {
    title: "Navaratri Celebrations",
    date: "October 15-24, 2023",
    time: "6:00 PM - 10:00 PM",
    location: "Community Center Main Hall",
    description:
      "Join us for nine nights of devotion and cultural performances dedicated to Goddess Durga. Each night will feature traditional garba and dandiya raas, along with special performances by community members. Don't miss our grand finale on the last day with a professional dance troupe performance.",
    category: "Upcoming",
  },
  {
    title: "Deepavali Mela",
    date: "November 12, 2023",
    time: "2:00 PM - 9:00 PM",
    location: "City Park Grounds",
    description:
      "Experience the festival of lights with our community Deepavali fair and fireworks display. Enjoy traditional food stalls, games, cultural performances, and a special lamp lighting ceremony. The event will conclude with a spectacular fireworks show.",
    category: "Upcoming",
  },
  {
    title: "Tulu Drama Festival",
    date: "December 5-7, 2023",
    time: "7:00 PM - 10:00 PM",
    location: "Community Theater",
    description:
      "Enjoy a series of traditional Tulu language plays showcasing our rich theatrical heritage. Local drama groups will perform both classic and contemporary pieces. A discussion session with the actors and directors will follow each performance.",
    category: "Upcoming",
  },
  {
    title: "Yakshagana Workshop",
    date: "July 10-15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Cultural Center",
    description:
      "We hosted a workshop on the traditional theater form of Yakshagana, teaching makeup, costume, and performance techniques. Participants learned from master artists and put on a small performance at the end of the workshop.",
    category: "Past",
  },
  {
    title: "Mangalore Food Festival",
    date: "August 20-22, 2023",
    time: "11:00 AM - 8:00 PM",
    location: "Community Center Grounds",
    description:
      "We celebrated the unique flavors of Mangalorean cuisine with food stalls, cooking demonstrations, and tasting sessions. The festival featured both traditional and fusion dishes, and included a cooking competition for community members.",
    category: "Past",
  },
  {
    title: "Tulu Language Day",
    date: "September 5, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "Community Library",
    description:
      "We promoted the preservation of Tulu language through poetry recitations, story-telling sessions, and language workshops. The event also included the launch of a new Tulu language learning app developed by community volunteers.",
    category: "Past",
  },
]

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <div className="bg-black py-6 mb-12">
          <h1 className="text-3xl font-bold text-center text-white">Community Events</h1>
        </div>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" className="text-[#B22222]">
              Upcoming Events
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
          <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
            <DialogContent className="bg-white border-2 border-[#B22222]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#B22222]">{selectedEvent.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <div className="flex items-center text-[#4A2C2A] mb-2">
                  <Calendar className="mr-2" size={16} />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center text-[#4A2C2A] mb-2">
                  <Clock className="mr-2" size={16} />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center text-[#4A2C2A] mb-4">
                  <MapPin className="mr-2" size={16} />
                  <span>{selectedEvent.location}</span>
                </div>
                <p className="text-[#4A2C2A]">{selectedEvent.description}</p>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

function EventList({
  events,
  setSelectedEvent,
}: { events: EventItem[]; setSelectedEvent: (event: EventItem) => void }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <motion.div
          key={event.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-white border-2 border-[#B22222] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-[#B22222]">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-[#4A2C2A] mb-2">
                <Calendar className="mr-2" size={16} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-[#4A2C2A] mb-2">
                <Clock className="mr-2" size={16} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-[#4A2C2A] mb-4">
                <MapPin className="mr-2" size={16} />
                <span>{event.location}</span>
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
  )
}

