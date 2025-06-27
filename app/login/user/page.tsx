"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [method, setMethod] = useState<"phone_no" | "email_id">("phone_no");
  const [inputValue, setInputValue] = useState("");
  const [otp, setOTP] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [wrongOTP, setIsWrongOTP] = useState(false);
  const [memberExist, setIsMemberExist] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const toggleMethod = () => {
    setMethod((prev) => (prev === "phone_no" ? "email_id" : "phone_no"));
    setInputValue("");
    setOTP("");
    setIsOtpSent(false);
    setIsWrongOTP(false);
    setIsMemberExist(true);
  };

  const handleOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsMemberExist(true);
    setIsWrongOTP(false);

    try {
      const field = method === "phone_no" ? "phone_no" : "email_id";
      const { data, error } = await supabase
        .from("Applicants")
        .select("*")
        .eq(field, inputValue)
        .single();

      if (error || !data) {
        setIsMemberExist(false);
        toast({
          title: "Member Not Found",
          description: `No registered member found with this ${method}.`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Send OTP using Supabase Auth
      const otpResponse =
        method === "phone_no"
          ? await supabase.auth.signInWithOtp({ phone: inputValue })
          : await supabase.auth.signInWithOtp({ email: inputValue });

      if (otpResponse.error) {
        toast({
          title: "OTP Error",
          description: otpResponse.error.message,
          variant: "destructive",
        });
      } else {
        setIsOtpSent(true);
        toast({
          title: "OTP Sent",
          description: `Check your ${method} for the OTP.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setVerifyLoading(true);
    setIsWrongOTP(false);

    try {
      const { data, error } =
        method === "phone_no"
          ? await supabase.auth.verifyOtp({
              phone: inputValue,
              token: otp,
              type: "sms",
            })
          : await supabase.auth.verifyOtp({
              email: inputValue,
              token: otp,
              type: "email",
            });

      if (error) {
        setIsWrongOTP(true);
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Success",
          description: "Login successful! Redirecting...",
        });
        
        
        setTimeout(() => {
          router.push("/community/dashboard");
          router.refresh(); 
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9E6] transition-all">
      <Card className="w-full max-w-md bg-white border-2 border-[#B22222] transition-transform duration-300">
        <CardHeader>
          <CardTitle className="text-[#B22222]">Member Login</CardTitle>
          <CardDescription className="text-[#4A2C2A]">
            Login via {method === "phone_no" ? "Phone OTP" : "Email OTP"}.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={toggleMethod}
              className="text-sm text-[#B22222] hover:underline transition"
              disabled={loading || verifyLoading}
            >
              Switch to {method === "phone_no" ? "Email OTP" : "Phone OTP"}
            </button>
          </div>
          
          <form onSubmit={handleOTP} className="space-y-4">
            <div>
              <Label htmlFor="login" className="text-[#4A2C2A]">
                {method === "phone_no" ? "Phone Number" : "Email Address"}
              </Label>
              <Input
                id="login"
                name="login"
                type={method === "phone_no" ? "tel" : "email"}
                placeholder={
                  method === "phone_no" ? "+91XXXXXXXXXX" : "your@email.com"
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className="border-[#B22222]"
                disabled={isOtpSent || loading || verifyLoading}
              />
            </div>
            
            {isOtpSent && (
              <div>
                <Label htmlFor="otp" className="text-[#4A2C2A]">
                  OTP
                </Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter 6 digit OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                  className="border-[#B22222]"
                  disabled={verifyLoading}
                  maxLength={6}
                />
              </div>
            )}
            
            {wrongOTP && (
              <p className="text-red-600 text-sm">You entered incorrect OTP</p>
            )}
            
            {!memberExist && (
              <p className="text-red-500 text-sm font-semibold">
                Member doesn't exist. Please contact support.
              </p>
            )}

            <div className="space-y-2">
              {!isOtpSent ? (
                <Button
                  type="submit"
                  className="w-full bg-[#B22222] text-white hover:bg-[#8B0000] transition"
                  disabled={loading || !inputValue.trim()}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    className="w-fit bg-gray-600 text-white hover:bg-gray-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Resend OTP"}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleVerifyOTP}
                    className="w-full bg-[#B22222] text-white hover:bg-[#8B0000] transition"
                    disabled={verifyLoading || otp.length !== 6}
                  >
                    {verifyLoading ? "Verifying..." : "Login"}
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-[#4A2C2A]">
          Only registered members can log in.
        </CardFooter>
      </Card>
    </div>
  );
}