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

interface Announcement {
  id: number
  title: string
  content: string
}

function ManageAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Community center renovation complete",
      content: "Our newly renovated community center is now open for all members.",
    },
    {
      id: 2,
      title: "Annual cultural festival announced",
      content: "Mark your calendars for our biggest cultural celebration yet, coming next month!",
    },
  ])
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")

  const handleAddAnnouncement = () => {
    if (newTitle && newContent) {
      setAnnouncements([...announcements, { id: Date.now(), title: newTitle, content: newContent }])
      setNewTitle("")
      setNewContent("")
      toast({
        title: "Success",
        description: "Announcement added successfully.",
      })
    }
  }

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id))
    toast({
      title: "Success",
      description: "Announcement deleted successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Manage Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newTitle" className="text-[#4A2C2A]">
                  New Announcement Title
                </Label>
                <Input
                  id="newTitle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newContent" className="text-[#4A2C2A]">
                  New Announcement Content
                </Label>
                <Textarea
                  id="newContent"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <Button onClick={handleAddAnnouncement} className="bg-[#B22222] text-white hover:bg-[#8B0000]">
                Add Announcement
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="bg-white border-2 border-[#B22222]">
              <CardHeader>
                <CardTitle className="text-[#B22222]">{announcement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A2C2A]">{announcement.content}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
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
            <Button variant="outline" className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withAdminAuth(ManageAnnouncementsPage)

