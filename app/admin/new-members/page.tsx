"use client";
import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function NewMembersRequestsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [docLink, setDocLink] = useState<String>("");
  interface ApprovalRequest {
    id: number;
    name: string;
    city: string;
    profession: string;
    phone_no: string;
  }

  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(
    []
  );
  const [loading, setLoading] = useState<Boolean>(true);

  const generateRandomPassword = (length = 8) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const fetchApplicants = async () => {
    const { data, error } = await supabase
      .from("Applicants")
      .select("id, name,city,profession,phone_no");

    if (error) {
      console.error("Error fetching applicants:", error.message);
    } else {
      setApprovalRequests(data);
    }
    setLoading(false);
  };

  const handleApproveRequest = async (id: number) => {
    // In a real application, you would send this to your backend
    //fetching the record whch admin approved
    const { data: sourceData, error: sourceError } = await supabase
      .from("Applicants")
      .select(
        "name,email_id,phone_no,profession,street,city,state,country,pincode,documents"
      )
      .eq("id", id);

    if (sourceError) {
      toast({
        title: "Error",
        description: "Failed to Approve request.",
        variant: "destructive",
      });
      return;
    }
    const password = generateRandomPassword();

    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: sourceData[0].email_id,
        password,
        email_confirm: true,
      });
    if (authError) {
      toast({
        title: "Error",
        description: "Failed to create auth user.",
        variant: "destructive",
      });
      return;
    }
    //transferring the record from Applicants table to the Members Table
    const { data: insertData, error: insertError } = await supabase
      .from("Members")
      .insert(sourceData);

    if (insertError) {
      toast({
        title: "Error",
        description: "Failed to Approve request.",
        variant: "destructive",
      });
      return;
    }
    //Deleting the record from Applicants table
    const { error } = await supabase.from("Applicants").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to Approve request.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Success",
        description: "Request approved successfully.",
      });
      fetchApplicants();
    }
  };

  const handleRejectRequest = async (id: number) => {
    // In a real application, you would send this to your backend

    const { error } = await supabase.from("Applicants").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to Approve request.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Success",
        description: "Request approved successfully.",
      });
    }
    fetchApplicants();
  };

  const handleViewDocuments = async (id: number) => {
    const { data, error } = await supabase
      .from("Applicants")
      .select("documents")
      .eq("id", id);

    const link = String(data[0].documents);
    window.open(link, "_blank");
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white border-2 border-[#B22222] md:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Approval Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {approvalRequests.length === 0 ? (
              <p>No pending approval requests.</p>
            ) : (
              <ul className="space-y-4">
                {approvalRequests.map((request) => (
                  <li
                    key={request.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-semibold">Name: {request.name}</p>
                      <p className="text-sm">
                        Profession: {request.profession}
                      </p>
                      <div className="flex gap-1">
                        <p className="text-sm">City: {request.city},</p>
                        <p className="text-sm">Phone: {request.phone_no}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button onClick={() => handleViewDocuments(request.id)}>
                        View documents
                      </Button>
                      <Button
                        onClick={() => handleApproveRequest(request.id)}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleRejectRequest(request.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Reject
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
