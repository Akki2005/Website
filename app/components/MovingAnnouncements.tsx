"use client"

import { useEffect, useRef, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "@/components/ui/use-toast"

interface AnnouncementsData {
  announcements: string[],
  backgroundColor: string, // e.g. "#FF0000" or "red"
  textColor: string        // e.g. "#FFFFFF" or "white"
}

export default function MovingAnnouncements() {
  const supabase = createClient()
  const [position, setPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentAnnouncements, setCurrentAnnouncements] = useState<AnnouncementsData>({
    announcements: [],
    backgroundColor: "#000000",  
    textColor: "#FFFFFF"         
  })

  const fetchAnnouncements = async () => {
    const { data: announcementData, error: announcementError } = await supabase
      .from("MovingAnnouncement")
      .select("*")
      .single()

    if (announcementError) {
      toast({
        title: "Error",
        description: "Failed to fetch Announcement.",
        variant: "destructive",
      })
    } else {
      setCurrentAnnouncements(announcementData)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const totalWidth = container.scrollWidth
    const viewportWidth = container.offsetWidth

    const animate = () => {
      setPosition((prevPosition) => {
        if (prevPosition <= -totalWidth) {
          return viewportWidth
        }
        return prevPosition - 1
      })
    }

    const animationId = setInterval(animate, 20)
    fetchAnnouncements()
    return () => clearInterval(animationId)
  }, [])

  return (
    <div
      className="py-2 overflow-hidden"
      style={{
        backgroundColor: currentAnnouncements.backgroundColor,
        color: currentAnnouncements.textColor
      }}
    >
      <div
        ref={containerRef}
        className="whitespace-nowrap"
        style={{ transform: `translateX(${position}px)` }}
      >
        {currentAnnouncements.announcements.map((announcement, index) => (
          <span key={index} className="inline-block mx-4">
            {announcement}
          </span>
        ))}
      </div>
    </div>
  )
}
