"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simple check for demo purposes. In a real app, this would be a server-side check.
    if (username === "admin" && password === "password") {
      // Set a flag in localStorage to indicate the user is logged in
      localStorage.setItem("isAdminLoggedIn", "true")
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      })
      router.push("/admin/dashboard")
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9E6]">
      <Card className="w-full max-w-md bg-white border-2 border-[#B22222]">
        <CardHeader>
          <CardTitle className="text-[#B22222]">Admin Login</CardTitle>
          <CardDescription className="text-[#4A2C2A]">
            Please enter your credentials to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#4A2C2A]">
                  Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#4A2C2A]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-[#B22222]"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline" className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-[#B22222] text-white hover:bg-[#8B0000]" onClick={handleSubmit}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

