"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "@/components/ui/use-toast"

interface AnnouncementItem {
  id: number
  name: string
  description: string
  date: string
  category: string
}

export default function AnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null)
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({})
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([])
  const supabase = createClient()

  const fetchAnnouncements = async () => {
    const { data: announcementData, error: announcementError } = await supabase
      .from("Announcements")
      .select("*")

    if (announcementError) {
      toast({
        title: "Error",
        description: "Failed to fetch Announcements",
        variant: "destructive",
      })
    } else {
      setAnnouncements(announcementData as AnnouncementItem[])
    }
  }

  const toggleCardExpansion = (title: string) => {
    setExpandedCards((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <div className="bg-black py-6 mb-12">
          <h1 className="text-3xl font-bold text-center text-white">Community Announcements</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border-2 border-[#B22222] overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-[#B22222] flex justify-between items-center">
                    {announcement.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCardExpansion(announcement.name)}
                    >
                      {expandedCards[announcement.name] ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#4A2C2A] mb-2">Announced on: {announcement.date}</p>
                  <p className="text-sm font-semibold text-[#B22222] mb-2">Category: {announcement.category}</p>
                  <motion.div
                    initial={false}
                    animate={{ height: expandedCards[announcement.name] ? "auto" : "80px" }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#4A2C2A]">{announcement.description}</p>
                  </motion.div>
                  {!expandedCards[announcement.name] && (
                    <Button
                      variant="link"
                      onClick={() => setSelectedAnnouncement(announcement)}
                      className="mt-2 text-[#B22222]"
                    >
                      Read More
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAnnouncement && (
          <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
            <DialogContent className="bg-white border-2 border-[#B22222]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#B22222]">{selectedAnnouncement.name}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <p className="text-sm text-[#4A2C2A] mb-2">Announced on: {selectedAnnouncement.date}</p>
                <p className="text-sm font-semibold text-[#B22222] mb-4">Category: {selectedAnnouncement.category}</p>
                <p className="text-[#4A2C2A]">{selectedAnnouncement.description}</p>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
