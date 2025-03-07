"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  { id: 1, src: "/placeholder.svg?height=400&width=800&text=Community+Event", alt: "Community Event" },
  { id: 2, src: "/placeholder.svg?height=400&width=800&text=Cultural+Festival", alt: "Cultural Festival" },
  { id: 3, src: "/placeholder.svg?height=400&width=800&text=Charity+Drive", alt: "Charity Drive" },
]

export default function Carousel() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <AnimatePresence initial={false} custom={currentImage}>
        <motion.div
          key={currentImage}
          custom={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage].src || "/placeholder.svg"}
            alt={images[currentImage].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold text-center px-4">{images[currentImage].alt}</h2>
          </div>
        </motion.div>
      </AnimatePresence>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={prevImage}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={nextImage}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentImage ? "bg-white" : "bg-white bg-opacity-50"}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  )
}

