"use client"

import { useEffect, useRef, useState } from "react"

const announcements = [
  "Join us for the Annual Marathi Literature Festival next month!",
  "New Marathi language classes starting soon. Register now!",
  "Volunteers needed for the upcoming community clean-up drive.",
  "Don't miss our traditional Marathi cuisine workshop this weekend!",
]

export default function MovingAnnouncements() {
  const [position, setPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

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

    return () => clearInterval(animationId)
  }, [])

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div ref={containerRef} className="whitespace-nowrap" style={{ transform: `translateX(${position}px)` }}>
        {announcements.map((announcement, index) => (
          <span key={index} className="inline-block mx-4">
            {announcement}
          </span>
        ))}
      </div>
    </div>
  )
}

