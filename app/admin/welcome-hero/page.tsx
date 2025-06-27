"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"


function EditWelcomeHeroPage() {
  const [title, setTitle] = useState("Welcome to Mangalore Hindu Community")
  const [subtitle, setSubtitle] = useState("Celebrating our culture, heritage, and community spirit")
  const [primaryButtonText, setPrimaryButtonText] = useState("Learn More")
  const [primaryButtonUrl, setPrimaryButtonUrl] = useState("/about/community")
  const [secondaryButtonText, setSecondaryButtonText] = useState("Join Us")
  const [secondaryButtonUrl, setSecondaryButtonUrl] = useState("/membership")
  const [backgroundColor, setBackgroundColor] = useState("#F5E6D3")
  const [textColor, setTextColor] = useState("#333333")
  const [primaryButtonColor, setPrimaryButtonColor] = useState("#FF9933")
  const [secondaryButtonColor, setSecondaryButtonColor] = useState("#B22222")

  const handleSaveChanges = () => {
    // In a real application, you would send this data to your backend
    toast({
      title: "Success",
      description: "Welcome hero settings saved successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Edit Welcome Hero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#4A2C2A]">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle" className="text-[#4A2C2A]">
                  Subtitle
                </Label>
                <Textarea
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryButtonText" className="text-[#4A2C2A]">
                    Primary Button Text
                  </Label>
                  <Input
                    id="primaryButtonText"
                    value={primaryButtonText}
                    onChange={(e) => setPrimaryButtonText(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryButtonUrl" className="text-[#4A2C2A]">
                    Primary Button URL
                  </Label>
                  <Input
                    id="primaryButtonUrl"
                    value={primaryButtonUrl}
                    onChange={(e) => setPrimaryButtonUrl(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secondaryButtonText" className="text-[#4A2C2A]">
                    Secondary Button Text
                  </Label>
                  <Input
                    id="secondaryButtonText"
                    value={secondaryButtonText}
                    onChange={(e) => setSecondaryButtonText(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryButtonUrl" className="text-[#4A2C2A]">
                    Secondary Button URL
                  </Label>
                  <Input
                    id="secondaryButtonUrl"
                    value={secondaryButtonUrl}
                    onChange={(e) => setSecondaryButtonUrl(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backgroundColor" className="text-[#4A2C2A]">
                  Background Color
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 p-1 border-[#B22222]"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor" className="text-[#4A2C2A]">
                  Text Color
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-10 p-1 border-[#B22222]"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryButtonColor" className="text-[#4A2C2A]">
                    Primary Button Color
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryButtonColor"
                      type="color"
                      value={primaryButtonColor}
                      onChange={(e) => setPrimaryButtonColor(e.target.value)}
                      className="w-16 h-10 p-1 border-[#B22222]"
                    />
                    <Input
                      value={primaryButtonColor}
                      onChange={(e) => setPrimaryButtonColor(e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryButtonColor" className="text-[#4A2C2A]">
                    Secondary Button Color
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondaryButtonColor"
                      type="color"
                      value={secondaryButtonColor}
                      onChange={(e) => setSecondaryButtonColor(e.target.value)}
                      className="w-16 h-10 p-1 border-[#B22222]"
                    />
                    <Input
                      value={secondaryButtonColor}
                      onChange={(e) => setSecondaryButtonColor(e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preview" className="text-[#4A2C2A]">
                  Preview
                </Label>
                <div id="preview" className="p-8 text-center" style={{ backgroundColor, color: textColor }}>
                  <h1 className="text-2xl font-bold mb-2">{title}</h1>
                  <p className="mb-4">{subtitle}</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      className="px-4 py-2 rounded"
                      style={{ backgroundColor: primaryButtonColor, color: "#FFFFFF" }}
                    >
                      {primaryButtonText}
                    </button>
                    <button
                      className="px-4 py-2 rounded"
                      style={{ backgroundColor: secondaryButtonColor, color: "#FFFFFF" }}
                    >
                      {secondaryButtonText}
                    </button>
                  </div>
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

export default EditWelcomeHeroPage;

