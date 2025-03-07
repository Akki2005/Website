"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { withAdminAuth } from "@/app/components/withAdminAuth"

function EditFooterPage() {
  const [copyrightText, setCopyrightText] = useState("© 2023 Mangalore Hindu Community. All rights reserved.")
  const [contactEmail, setContactEmail] = useState("info@mangalorehinducommunity.org")
  const [contactPhone, setContactPhone] = useState("(123) 456-7890")
  const [backgroundColor, setBackgroundColor] = useState("#000000")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  })

  const handleSocialLinkChange = (platform: keyof typeof socialLinks, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }))
  }

  const handleSaveChanges = () => {
    // In a real application, you would send this data to your backend
    toast({
      title: "Success",
      description: "Footer settings saved successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Edit Footer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="copyrightText" className="text-[#4A2C2A]">
                  Copyright Text
                </Label>
                <Input
                  id="copyrightText"
                  value={copyrightText}
                  onChange={(e) => setCopyrightText(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-[#4A2C2A]">
                  Contact Email
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-[#4A2C2A]">
                  Contact Phone
                </Label>
                <Input
                  id="contactPhone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="border-[#B22222]"
                />
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
              <div className="space-y-2">
                <Label className="text-[#4A2C2A]">Social Media Links</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="facebook" className="w-24 text-[#4A2C2A]">
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      value={socialLinks.facebook}
                      onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="twitter" className="w-24 text-[#4A2C2A]">
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="instagram" className="w-24 text-[#4A2C2A]">
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={socialLinks.instagram}
                      onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="youtube" className="w-24 text-[#4A2C2A]">
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      value={socialLinks.youtube}
                      onChange={(e) => handleSocialLinkChange("youtube", e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preview" className="text-[#4A2C2A]">
                  Preview
                </Label>
                <div id="preview" className="p-4 text-center" style={{ backgroundColor, color: textColor }}>
                  <p>{copyrightText}</p>
                  <p>
                    Contact: {contactEmail} | Phone: {contactPhone}
                  </p>
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

export default withAdminAuth(EditFooterPage)

