"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { createClient} from "@/utils/supabase/client"
import { v4 as uuidv4 } from "uuid";

// Mock API call for OTP generation
const generateOTP = async (type: "email" | "phone", value: string) => {
  // In a real scenario, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
  return Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP
}

export default function MembershipPage() {
  const router = useRouter()
  const supabase=createClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession:"",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  })
  const [emailOTPSent, setEmailOTPSent] = useState(false)
  const [phoneOTPSent, setPhoneOTPSent] = useState(false)
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [acknowledged, setAcknowledged] = useState(false)
  const [documents, setDocuments] = useState<File[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendOTP = async (type: "email" | "phone") => {
    try {
      const value = type === "email" ? formData.email : formData.phone
      await generateOTP(type, value)
      if (type === "email") setEmailOTPSent(true)
      else setPhoneOTPSent(true)
      toast({
        title: "OTP Sent",
        description: `OTP has been sent to your ${type}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to send OTP to your ${type}.`,
        variant: "destructive",
      })
    }
  }
  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      // Generate a unique filename
      const uniqueFileName = `${uuidv4()}-${file.name}`;
      
      // Upload the file
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: true
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
      const { data: { publicUrl } } = supabase.storage
        .from("documents")
        .getPublicUrl(uniqueFileName);
      
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
  const handleUploadDocuments = async () => {
    if (documents.length === 0) {
      // Optionally, add toast or message to prompt the user to select files
      console.error("No files selected for upload.");
      return;
    }

    setUploading(true);
    try {
      // Upload each selected file concurrently
      const uploadedUrlsPromises = documents.map((file) => uploadFile(file));
      const fileUrls = await Promise.all(uploadedUrlsPromises);

      // Filter out failed uploads (null values)
      const validFileUrls = fileUrls.filter((url): url is string => url !== null);
      setUploadedUrls(validFileUrls);

      console.log("Uploaded URLs:", validFileUrls, typeof(validFileUrls));
      // You might show a toast message here indicating success.
    } catch (error) {
      console.error("An error occurred during the file upload process:", error);
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailOTPSent || !phoneOTPSent) {
      toast({
        title: "Verification Required",
        description: "Please verify both your email and phone number.",
        variant: "destructive",
      })
      return
    }
    if (documents.length === 0) {
      // Optionally, add toast or message to prompt the user to select files
      console.error("No files selected for upload.");
      return;
    }

    setUploading(true);
    try {
      // Upload each selected file concurrently
      const uploadedUrlsPromises = documents.map((file) => uploadFile(file));
      const fileUrls = await Promise.all(uploadedUrlsPromises);

      // Filter out failed uploads (null values)
      const validFileUrls = fileUrls.filter((url): url is string => url !== null);
      setUploadedUrls(validFileUrls);

      console.log("Uploaded URLs:", validFileUrls, typeof(validFileUrls));
      // You might show a toast message here indicating success.
    } catch (error) {
      console.error("An error occurred during the file upload process:", error);
    } finally {
      setUploading(false);
    }
    if (uploadedUrls.length === 0) {
      toast({
        title: "Documents Required",
        description: "Please upload the required documents.",
        variant: "destructive",
      })
      return
    }
   
    
    const { data:applicantData, error: insertError } = await supabase
    .from("Applicants")
    .insert([
      {
        name: formData.name,
        email_id: formData.email,
        phone_no: formData.phone,
        profession:formData.profession,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: Number(formData.pincode),
        documents:uploadedUrls ,// pending admin approval
        // Optionally, handle documents upload separately (e.g., store URLs)
      },
    ])
    if (insertError) {
      toast({
        title: "Error",
        description: insertError.message,
        variant: "destructive",
      })
      return
    }
    console.log(applicantData)
    // Store form data in localStorage (in a real app, consider more secure options)
    // localStorage.setItem("membershipFormData", JSON.stringify(formData))
    // In a real application, you would send the form data and documents to your backend here
    toast({
      title: "Application Submitted",
      description:
        "Your membership application has been submitted for admin approval. You will be notified once it's processed.",
    })
    router.push("/membership/success")
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">Become a Member</h1>
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Your membership application will be reviewed by an admin. You will be notified once your application is
            approved.
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
                onClick={() => handleSendOTP("email")}
                disabled={emailOTPSent}
                className="bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                {emailOTPSent ? "Sent" : "Send OTP"}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#4A2C2A]">
              Phone Number
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
                onClick={() => handleSendOTP("phone")}
                disabled={phoneOTPSent}
                className="bg-[#B22222] text-white hover:bg-[#8B0000]"
              >
                {phoneOTPSent ? "Sent" : "Send OTP"}
              </Button>
            </div>
          </div>
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
              Please upload all required documents (ID proof, address proof, etc.)
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
            disabled={!acknowledged || !emailOTPSent || !phoneOTPSent }
          >
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  )
}

