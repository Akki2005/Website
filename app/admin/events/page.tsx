"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";

interface Event {
  id: number;
  name: string;
  from_date: Date;
  to_date: Date;
  from_time: TimeRanges;
  to_time: TimeRanges;
  description: string;
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

function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newFromDate, setNewFromDate] = useState("");
  const [newToDate, setNewToDate] = useState<Date | null>(null);
  const [newVenue, setNewVenue] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFromTime, setNewFromTime] = useState("");
  const [newToTime, setNewToTime] = useState("");
  const [minDate, setMinDate] = useState("");
  const supabase = createClient();
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const fetchEvents = async () => {
    const { data: EventData, error: EventError } = await supabase
      .from("Events")
      .select("*");

    if (EventError) {
      toast({
        title: "Error",
        description: "Failed to fetch Events",
        variant: "destructive",
      });
      return;
    } else {
      setEvents(EventData);
    }
  };

  const handleAddEvent = async () => {
    const { data: insertData, error: insertError } = await supabase
      .from("Events")
      .insert({
        name: newTitle,
        description: newDescription,
        from_time: String(newFromTime),
        to_time: String(newToTime),
        venue: newVenue,
        from_date: newFromDate,
        to_date: newToDate
      });
    if (insertError) {
      toast({
        title: "Error",
        description: "Failed to Add Events.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Success",
        description: "Events added successfully.",
      });
    }
    setNewTitle("");
    setNewFromDate("");
    setNewToDate("");
    setNewFromTime("");
    setNewToTime("");
    setNewVenue("");
    setNewDescription("");
    fetchEvents();
  };

  const handleDeleteEvent = async (id: number) => {
    const { error: deleteError } = await supabase
      .from("Events")
      .delete()
      .eq("id", id);
    if (deleteError) {
      toast({
        title: "Error",
        description: "Failed to Delete Event.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully.",
      });
    }
    fetchEvents();
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Manage Events</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddEvent();
              }}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newTitle" className="text-[#4A2C2A]">
                    Event Name
                  </Label>
                  <Input
                    id="newTitle"
                    value={newTitle}
                    required
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>

                <div className="space-y-2 w-full">
                  <Label htmlFor="newVenue" className="text-[#4A2C2A]">
                    Event Venue
                  </Label>
                  <Input
                    id="newVenue"
                    value={newVenue}
                    required
                    onChange={(e) => setNewVenue(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>

                <div className="flex justify-between gap-2">
                  <div className="flex flex-col">
                    <div>
                      <p className="font-semibold">Event Date</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="newFromDate" className="text-[#4A2C2A]">
                          From/On
                        </Label>
                        <Input
                          id="newFromDate"
                          value={newFromDate}
                          type="date"
                          min={minDate}
                          required
                          onChange={(e) => setNewFromDate(e.target.value)}
                          className="border-[#B22222]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newToDate" className="text-[#4A2C2A]">
                          To
                        </Label>
                        <Input
                          id="newToDate"
                          value={newToDate}
                          min={minDate}
                          type="date"
                          onChange={(e) => setNewToDate(new Date(e.target.value))
}                          className="border-[#B22222]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <p className="font-semibold">Event Time</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="newFromTime" className="text-[#4A2C2A]">
                          From
                        </Label>
                        <Input
                          id="newFromTime"
                          value={newFromTime}
                          type="time"
                          required
                          onChange={(e) => setNewFromTime(e.target.value)}
                          className="border-[#B22222]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newToTime" className="text-[#4A2C2A]">
                          To
                        </Label>
                        <Input
                          id="newToTime"
                          value={newToTime}
                          type="time"
                          required
                          onChange={(e) => setNewToTime(e.target.value)}
                          className="border-[#B22222]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newDescription" className="text-[#4A2C2A]">
                    Event Description
                  </Label>
                  <Textarea
                    id="newDescription"
                    value={newDescription}
                    required
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#B22222] text-white hover:bg-[#8B0000]"
                >
                  Add Event
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="bg-white border-2 border-[#B22222]">
              <CardHeader>
                <CardTitle className="text-[#B22222]">{event.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A2C2A] font-semibold">{convertDate(event.from_date)} {event.to_date ? `- ${convertDate(event.to_date)}` : ""}</p>
                <p className="text-[#4A2C2A]">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleDeleteEvent(event.id)}
                  variant="destructive"
                  className="ml-auto"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/admin/dashboard">
            <Button
              variant="outline"
              className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]"
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManageEventsPage;
