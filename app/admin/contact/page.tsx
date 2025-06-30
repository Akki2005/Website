"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"


function UpdateContactPage() {
  const [phone, setPhone] = useState("+91 824 123 4567")
  const [email, setEmail] = useState("info@mangalorehinducommunity.org")
  const [address, setAddress] = useState("123 Kadri Temple Road, Mangalore, Karnataka 575003, India")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    toast({
      title: "Success",
      description: "Contact information updated successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto bg-white border-2 border-[#B22222]">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Update Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#4A2C2A]">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#4A2C2A]">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#4A2C2A]">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/admin/dashboard">
              <Button variant="outline" className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="bg-[#B22222] text-white hover:bg-[#8B0000]" onClick={handleSubmit}>
              Update Contact Information
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default UpdateContactPage