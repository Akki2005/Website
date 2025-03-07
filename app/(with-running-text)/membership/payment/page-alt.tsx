"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

// Mock API call for payment processing
const processPayment = async (paymentDetails: any) => {
  // In a real scenario, this would be an API call to a payment gateway
  await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate payment processing
  return Math.random() > 0.1 // 90% success rate for demo purposes
}

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const storedData = localStorage.getItem("membershipFormData")
    if (storedData) {
      setFormData(JSON.parse(storedData))
    } else {
      router.push("/membership")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const paymentDetails = {
        method: paymentMethod,
        cardNumber,
        expiryDate,
        cvv,
        amount: 1000, // Example membership fee
      }

      const isSuccess = await processPayment(paymentDetails)

      if (isSuccess) {
        toast({
          title: "Payment Successful",
          description: "Your membership payment has been processed successfully.",
        })
        // In a real application, you would typically create the membership record here
        localStorage.removeItem("membershipFormData") // Clear stored form data
        router.push("/membership/success")
      } else {
        toast({
          title: "Payment Failed",
          description: "There was an issue processing your payment. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (!formData) return null

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">Membership Payment</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md border-2 border-[#B22222]"
        >
          <div className="space-y-2">
            <Label className="text-[#4A2C2A]">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit-card" id="debit-card" />
                <Label htmlFor="debit-card">Debit Card</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-[#4A2C2A]">
              Card Number
            </Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
              className="border-[#B22222]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-[#4A2C2A]">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
                className="border-[#B22222]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-[#4A2C2A]">
                CVV
              </Label>
              <Input
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
                className="border-[#B22222]"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay ₹1000"}
          </Button>
        </form>
      </div>
    </div>
  )
}

