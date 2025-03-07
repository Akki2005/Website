"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { withAdminAuth } from "@/app/components/withAdminAuth"
import Image from "next/image"
import { Trash2, Upload, MoveUp, MoveDown } from "lucide-react"

interface CarouselImage {
  id: number
  src: string
  alt: string
}

function EditCarouselPage() {
  const [images, setImages] = useState<CarouselImage[]>([
    { id: 1, src: "/placeholder.svg?height=400&width=800&text=Community+Event", alt: "Community Event" },
    { id: 2, src: "/placeholder.svg?height=400&width=800&text=Cultural+Festival", alt: "Cultural Festival" },
    { id: 3, src: "/placeholder.svg?height=400&width=800&text=Charity+Drive", alt: "Charity Drive" },
  ])
  const [newImageAlt, setNewImageAlt] = useState("")
  const [autoplayInterval, setAutoplayInterval] = useState(5000)

  const handleAddImage = () => {
    if (newImageAlt) {
      const newId = Math.max(0, ...images.map((img) => img.id)) + 1
      setImages([
        ...images,
        {
          id: newId,
          src: `/placeholder.svg?height=400&width=800&text=${newImageAlt.replace(/\s+/g, "+")}`,
          alt: newImageAlt,
        },
      ])
      setNewImageAlt("")
      toast({
        title: "Success",
        description: "Image added successfully.",
      })
    }
  }

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
    toast({
      title: "Success",
      description: "Image deleted successfully.",
    })
  }

  const handleMoveImage = (id: number, direction: "up" | "down") => {
    const index = images.findIndex((img) => img.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === images.length - 1)) {
      return
    }

    const newImages = [...images]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    // Swap the images
    ;[newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]]

    setImages(newImages)
  }

  const handleSaveChanges = () => {
    // In a real application, you would send this data to your backend
    toast({
      title: "Success",
      description: "Carousel settings saved successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Edit Carousel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="autoplayInterval" className="text-[#4A2C2A]">
                  Autoplay Interval (milliseconds)
                </Label>
                <Input
                  id="autoplayInterval"
                  type="number"
                  min="1000"
                  step="500"
                  value={autoplayInterval}
                  onChange={(e) => setAutoplayInterval(Number(e.target.value))}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newImageAlt" className="text-[#4A2C2A]">
                  Add New Image
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="newImageAlt"
                    placeholder="Image description"
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                    className="border-[#B22222]"
                  />
                  <Button
                    onClick={handleAddImage}
                    className="bg-[#B22222] text-white hover:bg-[#8B0000] whitespace-nowrap"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Note: In a real application, you would be able to upload actual images.
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-[#4A2C2A]">Current Images</Label>
                <div className="space-y-4">
                  {images.map((image, index) => (
                    <div key={image.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-[#4A2C2A]">{image.alt}</h3>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoveImage(image.id, "up")}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoveImage(image.id, "down")}
                            disabled={index === images.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteImage(image.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="relative h-40 w-full">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleSaveChanges} className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                Save Changes
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/dashboard">
              <Button variant="outline" className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]">
                Back to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default withAdminAuth(EditCarouselPage)

