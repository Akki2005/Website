"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

export default function MembershipPage() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    otp: "",
    emailOtp: "",
  });

  const [acknowledged, setAcknowledged] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [emailOTPSent, setEmailOTPSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [phoneOTPSent, setPhoneOTPSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [sendingPhoneOtp, setSendingPhoneOtp] = useState(false);
  const [sendingEmailOtp, setSendingEmailOtp] = useState(false);
  const [verifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [verifyingEmailOtp,setIsVerifyingEmailOtp]=useState(false);
  const [wrongEmailOTP,setIsWrongEmailOTP]=useState(false);
  const [wrongPhoneOTP,setIsWrongPhoneOTP]=useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmailOTP = async () => {
    setSendingEmailOtp(true);
    const { email } = formData;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: undefined,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setEmailOTPSent(true);
    setSendingEmailOtp(false);

   
  };

  const handleVerifyEmailOTP = async () => {
    setIsVerifyingEmailOtp(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email: formData.email,
      token: formData.emailOtp,
      type:"email"
    });
     if (error) {
      setIsWrongEmailOTP(true);
      setIsVerifyingEmailOtp(false);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setIsEmailVerified(true);
    setIsVerifyingEmailOtp(false);
  };

  const handleSendPhoneOTP = async () => {
    setSendingPhoneOtp(true);
    const res = await fetch("/api/send_otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber: formData.phone }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      //setServerGeneratedPhoneOTP(data.otp);
      setPhoneOTPSent(true);
      setSendingPhoneOtp(false);
      toast({
        title: "OTP Sent",
        description: `OTP sent to ${formData.phone}`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to send OTP",
        variant: "destructive",
      });
    }
  };

  const handleVerifyPhoneOTP = async () => {
    setIsVerifyingPhoneOtp(true);

    const res = await fetch("/api/verify_otp", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: formData.phone,
        code: formData.otp,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      setIsPhoneVerified(true);
      setIsVerifyingPhoneOtp(false);
      toast({ title: "Phone Verified" });
    } else {
      toast({
        title: "Invalid OTP",
        description: data.message || "Please enter a valid OTP",
        variant: "destructive",
      });
    }
  };
  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      // Generate a unique filename
      const uniqueFileName = `${uuidv4()}-${file.name}`;

      // Upload the file
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(uniqueFileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error uploading file:", error);
        toast({
          title: "Upload Error",
          description: `Failed to upload ${file.name}: ${error.message}`,
          variant: "destructive",
        });
        return null;
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(uniqueFileName);

      return publicUrl;
    } catch (error) {
      console.error("Unexpected error during upload:", error);
      return null;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDocuments(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check verifications
    if (!isEmailVerified) {
      toast({
        title: "Email Verification Required",
        description: "Please verify your email before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!isPhoneVerified) {
      toast({
        title: "Phone Verification Required",
        description: "Please verify your phone number before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (documents.length === 0) {
      toast({
        title: "Documents Required",
        description: "Please select documents to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!acknowledged) {
      toast({
        title: "Acknowledgement Required",
        description: "Please acknowledge that the information is accurate.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload documents first
      const uploadedUrlsPromises = documents.map((file) => uploadFile(file));
      const fileUrls = await Promise.all(uploadedUrlsPromises);

      // Filter out failed uploads (null values)
      const validFileUrls = fileUrls.filter(
        (url): url is string => url !== null
      );

      if (validFileUrls.length === 0) {
        toast({
          title: "Upload Failed",
          description: "Failed to upload documents. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Now insert into database with the uploaded URLs
      const { data: applicantData, error: insertError } = await supabase
        .from("Applicants")
        .insert([
          {
            name: formData.name,
            email_id: formData.email,
            phone_no: formData.phone,
            profession: formData.profession,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            pincode: Number(formData.pincode),
            documents: validFileUrls, // Use the uploaded URLs
          },
        ]);

      if (insertError) {
        toast({
          title: "Error",
          description: insertError.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Application submitted successfully:", applicantData);

      toast({
        title: "Application Submitted",
        description:
          "Your membership application has been submitted for admin approval. You will be notified once it's processed.",
      });

      router.push("/membership/success");
    } catch (error) {
      console.error("An error occurred during the submission process:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  useEffect(() => {
  if (wrongEmailOTP) {
    setFormData(prev => ({ ...prev, emailOtp: "" }));
    setIsVerifyingEmailOtp(false);
    
    const timer = setTimeout(() => setIsWrongEmailOTP(false), 1000);
    return () => clearTimeout(timer);

  }
  if (wrongPhoneOTP) {
    setFormData(prev => ({ ...prev, otp: "" }));
    setIsVerifyingPhoneOtp(false);
    
    const timer = setTimeout(() => setIsWrongPhoneOTP(false), 1000);
    return () => clearTimeout(timer);

  }
}, [wrongEmailOTP,wrongPhoneOTP]);

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">
          Become a Member
        </h1>
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Your membership application will be reviewed by an admin. You will
            be notified once your application is approved.
          </AlertDescription>
        </Alert>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md border-2 border-[#B22222]"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#4A2C2A]">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
              className="border-[#B22222]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#4A2C2A]">
              Email ID
            </Label>
            <div className="flex space-x-2">
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                placeholder="Enter your email"
                required
                className="border-[#B22222]"
              />

              <Button
                type="button"
                onClick={handleSendEmailOTP}
                disabled={emailOTPSent || isEmailVerified || !formData.email}
                className="bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                {emailOTPSent ? "Sent" : sendingEmailOtp ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          </div>
          {emailOTPSent && (
            <div className="space-y-2">
              <Label htmlFor="emailOtp" className="text-[#4A2C2A]">
                OTP
              </Label>
              <Input
                id="emailOtp"
                name="emailOtp"
                value={formData.emailOtp}
                onChange={handleInputChange}
                type="number"
                placeholder="Enter 6-digit OTP sent to your email"
                required
                className="border-[#B22222]"
              />
              {wrongEmailOTP && (
                <p className="text-red-600 text-sm">You entered incorrect OTP</p>
                
              )}
              <Button
                type="button"
                onClick={() => {
                  handleVerifyEmailOTP();
                }}
                disabled={
                  verifyingEmailOtp || isEmailVerified || formData.emailOtp.length !== 6
                }
                className="bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                {isEmailVerified
                  ? "Verified"
                  : verifyingEmailOtp
                  ? "Verifying..."
                  : "Verify"}
              </Button>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#4A2C2A]">
              Phone Number (with country code)
            </Label>
            <div className="flex space-x-2">
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="tel"
                placeholder="Enter your phone number"
                required
                className="border-[#B22222]"
              />
              <Button
                type="button"
                onClick={() => {
                  handleSendPhoneOTP();
                }}
                disabled={phoneOTPSent || sendingPhoneOtp || !formData.phone}
                className="bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                {phoneOTPSent ? "Sent" : sendingPhoneOtp ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          </div>
          {phoneOTPSent && (
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-[#4A2C2A]">
                OTP
              </Label>
              <Input
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                type="number"
                placeholder="Enter 6-digit OTP sent to your number"
                required
                className="border-[#B22222]"
              />
               {wrongPhoneOTP && (
                <p className="text-red-600 text-sm">You entered incorrect OTP</p>
                
              )}
              <Button
                type="button"
                onClick={() => {
                  handleVerifyPhoneOTP();
                }}
                disabled={
                  verifyingPhoneOtp || isPhoneVerified || formData.otp.length !== 6
                }
                className="bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                {isPhoneVerified
                  ? "Verified"
                  : verifyingPhoneOtp
                  ? "Verifying..."
                  : "Verify"}
              </Button>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="profession" className="text-[#4A2C2A]">
              Profession
            </Label>
            <Input
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              placeholder="Enter your profession"
              required
              className="border-[#B22222]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#4A2C2A]">Address</Label>
            <Input
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="Street Address"
              required
              className="border-[#B22222]"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
                className="border-[#B22222]"
              />
              <Input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                required
                className="border-[#B22222]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                required
                className="border-[#B22222]"
              />
              <Input
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                required
                className="border-[#B22222]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents" className="text-[#4A2C2A]">
              Upload Documents
            </Label>
            <Input
              id="documents"
              type="file"
              onChange={handleFileUpload}
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              required
              className="border-[#B22222]"
            />
            <p className="text-sm text-muted-foreground">
              Please upload all required documents (ID proof, address proof,
              etc.)
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acknowledgement"
              checked={acknowledged}
              onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
              className="border-[#B22222]"
            />
            <Label htmlFor="acknowledgement" className="text-[#4A2C2A]">
              I acknowledge that the information provided is accurate
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white"
            disabled={!acknowledged || !isEmailVerified || !isPhoneVerified}
          >
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
}
