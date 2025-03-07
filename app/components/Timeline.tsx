"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TimelineEvent {
  year: number
  title: string
  description: string
}

interface TimelineProps {
  events: TimelineEvent[]
  onSelectEvent: (event: TimelineEvent) => void
}

export default function Timeline({ events, onSelectEvent }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  return (
    <div className="relative w-full h-[600px]">
      <div className="absolute left-0 w-1/2 h-full border-r-2 border-primary rounded-r-full"></div>
      {events.map((event, index) => {
        const angle = (index / (events.length - 1)) * 180
        const x = 50 - Math.cos((angle * Math.PI) / 180) * 50
        const y = 50 - Math.sin((angle * Math.PI) / 180) * 50

        return (
          <div
            key={event.year}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            <Button
              variant="ghost"
              className={`p-0 h-auto text-left hover:bg-transparent flex flex-col items-center ${
                selectedEvent?.year === event.year ? "text-primary" : ""
              }`}
              onClick={() => {
                setSelectedEvent(event)
                onSelectEvent(event)
              }}
            >
              <div className="w-4 h-4 bg-primary rounded-full mb-2"></div>
              <div className="font-bold text-lg">{event.year}</div>
              <div className="text-sm max-w-[100px] text-center">{event.title}</div>
            </Button>
          </div>
        )
      })}
    </div>
  )
}

