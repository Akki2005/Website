"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface ContactUs {
  id: number;
  phone: string;
  alternatePhone: string;
  emailAddress: string;
  location: string;
}

export default function ContactUsPage() {
  const [contactUsData, setContactUs] = useState<ContactUs | null>(null);
  const supabase = createClient();

  const fetchContactUs = async () => {
    const { data, error } = await supabase.from("ContactUs").select("*").single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch ContactUs",
        variant: "destructive",
      });
    } else {
      setContactUs(data);
    }
  };

  useEffect(() => {
    fetchContactUs();
  }, []);

  if (!contactUsData) {
    return (
      <div className="container mx-auto py-8 bg-[#F5EFE6] min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">
          Contact Us
        </h1>
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 bg-[#F5EFE6] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">
        Contact Us
      </h1>
      <Card className="max-w-md mx-auto bg-white border-[#B22222] border-2">
        <CardHeader>
          <CardTitle className="text-[#B22222]">
            Mangalore Hindu Community
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[#4A2C2A]">
          <p>
            <strong className="text-[#B22222]">Phone:</strong> {contactUsData.phone}
          </p>
          {contactUsData.alternatePhone && (
            <p>
              <strong className="text-[#B22222]">Alternate Phone:</strong> {contactUsData.alternatePhone}
            </p>
          )}
          <p>
            <strong className="text-[#B22222]">Email:</strong> {contactUsData.emailAddress}
          </p>
          <p>
            <strong className="text-[#B22222]">Address:</strong> {contactUsData.location}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
