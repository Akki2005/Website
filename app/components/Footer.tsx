"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";
interface ContactUs {
  id: number;
  phone: string;
  alternatePhone: string;
  emailAddress: string;
  location: string;
}
export default function Footer() {
  const supabase = createClient();
  const [contactUsData, setContactUs] = useState<ContactUs | null>(null);
  const fetchContactUs = async () => {
    const { data, error } = await supabase
      .from("ContactUs")
      .select("*")
      .single();

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

  return (
    <footer className="bg-black text-white p-4 mt-8 text-sm sm:text-base max-w-full overflow-hidden">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Mangalore Hindu Community. All rights reserved.</p>
        <p>
          Contact: {contactUsData?.emailAddress} | Phone: {contactUsData?.phone}{" "}
          |{" "}
          {contactUsData?.alternatePhone && (
            <>
              <span >Alternate Phone:</span>{" "}
              {contactUsData?.alternatePhone}
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
