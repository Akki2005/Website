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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleMethod = () =>
    setMethod((prev) => (prev === "phone_no" ? "email_id" : "phone_no"));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const field = method === "phone_no" ? "phone_no" : "email_id";
    const { data, error } = await supabase
      .from("Applicants")
      .select("*")
      .eq(field, inputValue)
      .single();

    if (error || !data) {
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
      toast({
        title: "OTP Sent",
        description: `Check your ${method} for the OTP.`,
      });
      // Navigate or show OTP input next
    }

    setLoading(false);
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
            >
              Switch to {method === "phone_no" ? "Email OTP" : "Phone OTP"}
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login" className="text-[#4A2C2A]">
                {method === "phone_no" ? "Phone Number" : "Email Address"}
              </Label>
              <Input
                id="login"
                type={method === "phone_no" ? "tel" : "email_id"}
                placeholder={
                  method === "phone_no" ? "+91XXXXXXXXXX" : "your@email.com"
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className="border-[#B22222]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#B22222] text-white hover:bg-[#8B0000] transition"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-[#4A2C2A]">
          Only registered members can log in.
        </CardFooter>
      </Card>
    </div>
  );
}
