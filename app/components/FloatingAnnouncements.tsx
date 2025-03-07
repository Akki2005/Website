"use client"

import { useEffect, useState } from "react"

const announcements = [
  "Join us for the Annual Marathi Literature Festival next month!",
  "New Marathi language classes starting soon. Register now!",
  "Volunteers needed for the upcoming community clean-up drive.",
  "Don't miss our traditional Marathi cuisine workshop this weekend!",
]

export default function FloatingAnnouncements() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 5000) // Change announcement every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-green-200 opacity-50 animate-pulse"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Announcements</h3>
        <p className="text-green-700 transition-opacity duration-500 ease-in-out">
          {announcements[currentAnnouncement]}
        </p>
      </div>
    </div>
  )
}

