"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { withAdminAuth } from "@/app/components/withAdminAuth"

interface Event {
  id: number
  title: string
  date: string
  description: string
}

function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Ganesh Festival",
      date: "September 10-19",
      description: "Join us for our annual Ganesh Festival celebrations.",
    },
    {
      id: 2,
      title: "Diwali Mela",
      date: "November 5",
      description: "Experience the festival of lights with our community Diwali fair.",
    },
  ])
  const [newTitle, setNewTitle] = useState("")
  const [newDate, setNewDate] = useState("")
  const [newDescription, setNewDescription] = useState("")

  const handleAddEvent = () => {
    if (newTitle && newDate && newDescription) {
      setEvents([...events, { id: Date.now(), title: newTitle, date: newDate, description: newDescription }])
      setNewTitle("")
      setNewDate("")
      setNewDescription("")
      toast({
        title: "Success",
        description: "Event added successfully.",
      })
    }
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
    toast({
      title: "Success",
      description: "Event deleted successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Manage Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newTitle" className="text-[#4A2C2A]">
                  New Event Title
                </Label>
                <Input
                  id="newTitle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDate" className="text-[#4A2C2A]">
                  New Event Date
                </Label>
                <Input
                  id="newDate"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDescription" className="text-[#4A2C2A]">
                  New Event Description
                </Label>
                <Textarea
                  id="newDescription"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <Button onClick={handleAddEvent} className="bg-[#B22222] text-white hover:bg-[#8B0000]">
                Add Event
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="bg-white border-2 border-[#B22222]">
              <CardHeader>
                <CardTitle className="text-[#B22222]">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A2C2A] font-semibold">{event.date}</p>
                <p className="text-[#4A2C2A]">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleDeleteEvent(event.id)} variant="destructive" className="ml-auto">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withAdminAuth(ManageEventsPage)

