"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { RazorpayResponse, RazorpayOptions, CreateOrderResponse, VerifyPaymentResponse } from "@/types/razorpay";

export default function DonatePage() {
  const [isCommunityMember, setIsCommunityMember] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const [donationAmount, setDonationAmount] = useState<string>("");
  
  const router = useRouter();

  // Success Modal Component
  const SuccessModal = () => (
    <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-600 text-center text-xl">
            🎉 Donation Successful!
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p className="text-lg font-medium">
              Thank you for your generous contribution!
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p><strong>Amount:</strong> ₹{donationAmount}</p>
              <p><strong>Transaction ID:</strong> {transactionId}</p>
            </div>
            <p className="text-sm text-gray-600">
              Your support helps our community thrive. A confirmation will be sent to your registered contact.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              router.push('/');
            }}
            className="bg-[#B22222] hover:bg-[#8B0000] text-white w-full"
          >
            Return to Home Page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Load Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (removed payment mode validation)
    if (!name || !phoneNumber || !isCommunityMember || !amount) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const donationAmount = parseFloat(amount);
    if (donationAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script");
      }

      // Create order (removed payment_type from request)
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: donationAmount,
          name,
          phone_no: phoneNumber,
          member_status: isCommunityMember,
        }),
      });

      const orderData: CreateOrderResponse = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // Initialize Razorpay payment with proper UPI configuration
      const options: RazorpayOptions = {
        key: orderData.key!,
        amount: orderData.amount!,
        currency: orderData.currency!,
        name: "Community Donation",
        description: "Thank you for supporting our community",
        order_id: orderData.order_id!,
        handler: async function (response: RazorpayResponse) {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donor_details: orderData.donor_details,
              }),
            });

            const verifyData: VerifyPaymentResponse = await verifyResponse.json();

            if (verifyData.success) {
              // Set transaction details for modal
              setTransactionId(response.razorpay_payment_id);
              setDonationAmount(amount);
              
              // Show success toast
              toast({
                title: "🎉 Donation Successful!",
                description: "Thank you for your generous contribution to our community!",
              });
              
              // Reset form
              setName("");
              setPhoneNumber("");
              setIsCommunityMember("");
              setAmount("");

              // Show success modal after a short delay
              setTimeout(() => {
                setShowSuccessModal(true);
              }, 1000);

            } else {
              throw new Error(verifyData.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast({
              title: "❌ Verification Error",
              description: "Payment completed but verification failed. Please contact support with your transaction ID.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: name,
          contact: phoneNumber,
        },
        // Proper UPI configuration
        config: {
          display: {
            blocks: {
              utib: {
                name: 'Pay using UPI',
                instruments: [
                  {
                    method: 'upi'
                  },
                ],
              },
              other: {
                name: 'Other Payment Methods',
                instruments: [
                  {
                    method: 'card',
                  },
                  {
                    method: 'netbanking',
                  },
                  {
                    method: 'wallet',
                  },
                ],
              },
            },
            hide: [
              {
                method: 'emi'
              }
            ],
            sequence: ['block.utib', 'block.other'],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
        notes: {
          member_status: isCommunityMember,
          donation_type: 'community_donation',
        },
        theme: {
          color: "#B22222",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        modal: {
          ondismiss: function () {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
              variant: "destructive",
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Payment initiation error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">
            Donate to Our Community
          </h1>
          <Card className="max-w-md mx-auto bg-white border-2 border-[#B22222]">
            <CardHeader>
              <CardTitle className="text-[#B22222]">Donation Form</CardTitle>
              <CardDescription className="text-[#4A2C2A]">
                Your support helps our community thrive. Payment method will be automatically detected.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#4A2C2A]">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-[#B22222]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#4A2C2A]">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="border-[#B22222]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[#4A2C2A]">
                    Are you part of the community? *
                  </Label>
                  <RadioGroup
                    value={isCommunityMember}
                    onValueChange={setIsCommunityMember}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes"
                        id="community-yes"
                        className="border-[#B22222]"
                      />
                      <Label htmlFor="community-yes" className="text-[#4A2C2A]">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no"
                        id="community-no"
                        className="border-[#B22222]"
                      />
                      <Label htmlFor="community-no" className="text-[#4A2C2A]">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-[#4A2C2A]">
                    Donation Amount (₹) *
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter donation amount"
                    required
                    className="border-[#B22222]"
                  />
                </div>
                
                {/* Payment mode selection removed - will be detected automatically */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Payment Options:</strong> UPI, Cards, Net Banking, and Wallets are all supported. 
                    Choose your preferred method during checkout.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white"
                >
                  {isLoading ? "Processing..." : "Donate Now"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        {/* Success Modal */}
        <SuccessModal />
      </div>
    </>
  );
}