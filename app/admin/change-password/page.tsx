"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"


function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }
    // In a real application, you would send this to your backend
    toast({
      title: "Success",
      description: "Password changed successfully.",
    })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="max-w-md mx-auto bg-white border-2 border-[#B22222]">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-[#4A2C2A]">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-[#4A2C2A]">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#4A2C2A]">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
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
              Change Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ChangePasswordPage

