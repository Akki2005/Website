"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

// Mock API call for OTP verification
const verifyOTP = async (type: "email" | "phone", otp: string) => {
  // In a real scenario, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
  return Math.random() > 0.2 // 80% success rate for demo purposes
}

export default function VerifyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [emailOTP, setEmailOTP] = useState("")
  const [phoneOTP, setPhoneOTP] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)

  useEffect(() => {
    const storedData = localStorage.getItem("membershipFormData")
    if (storedData) {
      setFormData(JSON.parse(storedData))
    } else {
      router.push("/membership")
    }
  }, [router])

  const handleVerify = async (type: "email" | "phone") => {
    try {
      const otp = type === "email" ? emailOTP : phoneOTP
      const isVerified = await verifyOTP(type, otp)
      if (isVerified) {
        if (type === "email") setEmailVerified(true)
        else setPhoneVerified(true)
        toast({
          title: "Verification Successful",
          description: `Your ${type} has been verified.`,
        })
      } else {
        toast({
          title: "Verification Failed",
          description: `Failed to verify your ${type}. Please try again.`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred during ${type} verification.`,
        variant: "destructive",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailVerified && phoneVerified) {
      router.push("/membership/payment")
    } else {
      toast({
        title: "Verification Required",
        description: "Please verify both your email and phone number.",
        variant: "destructive",
      })
    }
  }

  if (!formData) return null

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">Verify OTP</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md border-2 border-[#B22222]"
        >
          <div className="space-y-2">
            <Label htmlFor="emailOTP" className="text-[#4A2C2A]">
              Email OTP
            </Label>
            <div className="flex space-x-2">
              <Input
                id="emailOTP"
                value={emailOTP}
                onChange={(e) => setEmailOTP(e.target.value)}
                placeholder="Enter Email OTP"
                required
                className="border-[#B22222]"
                disabled={emailVerified}
              />
              <Button
                type="button"
                onClick={() => handleVerify("email")}
                disabled={emailVerified}
                className="bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                {emailVerified ? "Verified" : "Verify Email"}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneOTP" className="text-[#4A2C2A]">
              Phone OTP
            </Label>
            <div className="flex space-x-2">
              <Input
                id="phoneOTP"
                value={phoneOTP}
                onChange={(e) => setPhoneOTP(e.target.value)}
                placeholder="Enter Phone OTP"
                required
                className="border-[#B22222]"
                disabled={phoneVerified}
              />
              <Button
                type="button"
                onClick={() => handleVerify("phone")}
                disabled={phoneVerified}
                className="bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                {phoneVerified ? "Verified" : "Verify Phone"}
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white"
            disabled={!emailVerified || !phoneVerified}
          >
            Proceed to Payment
          </Button>
        </form>
      </div>
    </div>
  )
}

