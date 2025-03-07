"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Newspaper, Calendar } from "lucide-react"
import { ShivajiArtisticBg } from "./ShivajiArtisticBg"

interface NewsItem {
  title: string
  content: string
}

interface EventItem {
  title: string
  date: string
  description: string
}

const newsItems: NewsItem[] = [
  {
    title: "Community center renovation complete",
    content: "Our newly renovated community center is now open for all members.",
  },
  {
    title: "Annual cultural festival announced",
    content: "Mark your calendars for our biggest cultural celebration yet, coming next month!",
  },
  {
    title: "New language classes starting",
    content: "Enroll now for our new batch of Marathi language classes for beginners and intermediate learners.",
  },
  {
    title: "Youth leadership program",
    content: "Join our new youth leadership program and develop essential skills for the future.",
  },
]

const eventItems: EventItem[] = [
  {
    title: "Ganesh Festival",
    date: "September 10-19",
    description: "Join us for our annual Ganesh Festival celebrations.",
  },
  {
    title: "Diwali Mela",
    date: "November 5",
    description: "Experience the festival of lights with our community Diwali fair.",
  },
  {
    title: "New Year's Gala",
    date: "December 31",
    description: "Ring in the New Year with fellow community members at our grand gala.",
  },
  {
    title: "Republic Day Parade",
    date: "January 26",
    description: "Participate in our Republic Day parade and cultural program.",
  },
]

export default function NewsEvents() {
  return (
    <section className="container mx-auto my-8 px-4">
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FFF3E0] rounded-lg p-8 border-4 border-[#B22222] relative overflow-hidden"
        >
          <ShivajiArtisticBg />
          <Newspaper className="absolute top-4 right-4 text-[#B22222] opacity-20" size={80} />
          <h2 className="text-2xl font-bold mb-4 text-[#B22222] relative z-10">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col bg-white border-2 border-[#B22222]">
                  <CardHeader>
                    <CardTitle className="text-[#B22222]">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-800">{item.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/announcements"
              className="inline-block bg-[#B22222] text-white px-4 py-2 rounded hover:bg-[#8B0000] transition-colors"
            >
              View all announcements
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#FFF3E0] rounded-lg p-8 border-4 border-[#B22222] relative overflow-hidden"
        >
          <ShivajiArtisticBg />
          <Calendar className="absolute top-4 right-4 text-[#B22222] opacity-20" size={80} />
          <h2 className="text-2xl font-bold mb-4 text-[#B22222] relative z-10">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col bg-white border-2 border-[#B22222]">
                  <CardHeader>
                    <CardTitle className="text-[#B22222]">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="font-semibold text-gray-800">{item.date}</p>
                    <p className="text-gray-800">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/events"
              className="inline-block bg-[#B22222] text-white px-4 py-2 rounded hover:bg-[#8B0000] transition-colors"
            >
              View all events
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

