"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function DonatePage() {
  const [isCommunityMember, setIsCommunityMember] = useState<string | undefined>()

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">Donate to Our Community</h1>
        <Card className="max-w-md mx-auto bg-white border-2 border-[#B22222]">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Donation Form</CardTitle>
            <CardDescription className="text-[#4A2C2A]">Your support helps our community thrive.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#4A2C2A]">
                Name
              </Label>
              <Input id="name" placeholder="Enter your name" required className="border-[#B22222]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#4A2C2A]">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                required
                className="border-[#B22222]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#4A2C2A]">Are you part of the community?</Label>
              <RadioGroup onValueChange={setIsCommunityMember} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="community-yes" className="border-[#B22222]" />
                  <Label htmlFor="community-yes" className="text-[#4A2C2A]">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="community-no" className="border-[#B22222]" />
                  <Label htmlFor="community-no" className="text-[#4A2C2A]">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-[#4A2C2A]">
                Donation Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter donation amount"
                required
                className="border-[#B22222]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-mode" className="text-[#4A2C2A]">
                Payment Mode
              </Label>
              <Select>
                <SelectTrigger id="payment-mode" className="border-[#B22222]">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="net-banking">Net Banking</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white">
              Donate
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

