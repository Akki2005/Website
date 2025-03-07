import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const galleryImages = [
  { src: "/placeholder.svg?height=300&width=400&text=Yakshagana+Performance", alt: "Yakshagana Performance" },
  { src: "/placeholder.svg?height=300&width=400&text=Mangalore+Temple", alt: "Mangalore Temple" },
  { src: "/placeholder.svg?height=300&width=400&text=Traditional+Dance", alt: "Traditional Dance" },
  { src: "/placeholder.svg?height=300&width=400&text=Tulu+Nadu+Landscape", alt: "Tulu Nadu Landscape" },
  { src: "/placeholder.svg?height=300&width=400&text=Festival+Celebration", alt: "Festival Celebration" },
  { src: "/placeholder.svg?height=300&width=400&text=Local+Cuisine", alt: "Local Cuisine" },
]

export default function GalleryPage() {
  return (
    <div className="container mx-auto py-8 bg-gallery-background text-gallery-text">
      <h1 className="text-3xl font-bold mb-8 text-center text-gallery-primary">Our Community Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <Card key={index} className="bg-gallery-background border-gallery-secondary">
            <CardContent className="p-4">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={400}
                height={300}
                className="rounded-lg"
              />
              <p className="mt-2 text-center">{image.alt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

