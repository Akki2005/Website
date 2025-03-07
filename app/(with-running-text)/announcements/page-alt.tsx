"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AnnouncementItem {
  title: string
  content: string
  date: string
  category: string
}

const announcements: AnnouncementItem[] = [
  {
    title: "Community center renovation complete",
    content:
      "We are excited to announce that our newly renovated community center is now open for all members. The renovation includes updated meeting rooms, a state-of-the-art auditorium, and improved accessibility features. We invite all members to visit and explore the new facilities. A grand opening ceremony will be held next month.",
    date: "July 1, 2023",
    category: "Facilities",
  },
  {
    title: "Annual cultural festival announced",
    content:
      "Mark your calendars for our biggest cultural celebration yet, coming next month! This year's festival will feature traditional Marathi music and dance performances, a food fair showcasing regional cuisines, and workshops on various aspects of Marathi culture. Stay tuned for the detailed schedule and ticket information.",
    date: "July 15, 2023",
    category: "Events",
  },
  {
    title: "New language classes starting",
    content:
      "Enroll now for our new batch of Marathi language classes for beginners and intermediate learners. Classes will be held twice a week in the evening to accommodate working professionals. We have also introduced an advanced course for those looking to deepen their knowledge of Marathi literature.",
    date: "August 1, 2023",
    category: "Education",
  },
  {
    title: "Community outreach program success",
    content:
      "Our recent outreach program has successfully connected with over 1000 new individuals in the greater metropolitan area. This initiative has helped raise awareness about our community and culture, and has resulted in a significant increase in membership applications. We thank all volunteers who made this possible.",
    date: "August 10, 2023",
    category: "Community",
  },
  {
    title: "Online library launch",
    content:
      "Access our new digital library of Marathi literature and resources, available to all members. The library includes a vast collection of e-books, audiobooks, and research papers. Members can access the library 24/7 from any device. A workshop on how to use the digital library will be conducted next week.",
    date: "August 20, 2023",
    category: "Education",
  },
]

export default function AnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null)
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({})

  const toggleCardExpansion = (title: string) => {
    setExpandedCards((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <div className="bg-black py-6 mb-12">
          <h1 className="text-3xl font-bold text-center text-white">Community Announcements</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border-2 border-[#B22222] overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-[#B22222] flex justify-between items-center">
                    {announcement.title}
                    <Button variant="ghost" size="sm" onClick={() => toggleCardExpansion(announcement.title)}>
                      {expandedCards[announcement.title] ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#4A2C2A] mb-2">Announced on: {announcement.date}</p>
                  <p className="text-sm font-semibold text-[#B22222] mb-2">Category: {announcement.category}</p>
                  <motion.div
                    initial={false}
                    animate={{ height: expandedCards[announcement.title] ? "auto" : "80px" }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#4A2C2A]">{announcement.content}</p>
                  </motion.div>
                  {!expandedCards[announcement.title] && (
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
                <DialogTitle className="text-2xl text-[#B22222]">{selectedAnnouncement.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <p className="text-sm text-[#4A2C2A] mb-2">Announced on: {selectedAnnouncement.date}</p>
                <p className="text-sm font-semibold text-[#B22222] mb-4">Category: {selectedAnnouncement.category}</p>
                <p className="text-[#4A2C2A]">{selectedAnnouncement.content}</p>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

