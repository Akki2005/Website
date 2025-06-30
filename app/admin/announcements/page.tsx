"use client";

import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";

interface Announcement {
  id: number;
  name: string;
  description: string;
  date:number;
}

function ManageAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const supabase = createClient();

  const fetchAnnouncements = async () => {
    const { data: announcementData, error: announcementError } = await supabase
      .from("Announcements")
      .select("*");

    if (announcementError) {
      toast({
        title: "Error",
        description: "Failed to fetch Announcements",
        variant: "destructive",
      });
      return;
    } else {
      setAnnouncements(announcementData);
    }
  };

  const handleAddAnnouncement = async () => {
    const { data: insertData, error: insertError } = await supabase
      .from("Announcements")
      .insert({
        name: newTitle,
        description: newContent,
        category: newCategory,
      });
    if (insertError) {
      toast({
        title: "Error",
        description: "Failed to Add Announcement.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Success",
        description: "Announcement added successfully.",
      });
    }
    setNewTitle("");
    setNewContent("");
    setNewCategory("");
    toast({
      title: "Success",
      description: "Announcement added successfully.",
    });
    fetchAnnouncements();
  };

  const handleDeleteAnnouncement = async (id: number) => {
    const { error: deleteError } = await supabase
      .from("Announcements")
      .delete()
      .eq("id", id);
    if (deleteError) {
      toast({
        title: "Error",
        description: "Failed to Delete Announcement.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Success",
        description: "Announcement deleted successfully.",
      });
    }
    fetchAnnouncements();
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">
              Manage Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAnnouncement();
              }}
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3 ">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="newTitle" className="text-[#4A2C2A]">
                      New Announcement Title
                    </Label>
                    <Input
                      id="newTitle"
                      value={newTitle}
                      required
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="newCategory" className="text-[#4A2C2A]">
                      New Announcement Category
                    </Label>
                    <Input
                      id="newCategory"
                      required
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newContent" className="text-[#4A2C2A]">
                    New Announcement Content
                  </Label>
                  <Textarea
                    id="newContent"
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#B22222] text-white hover:bg-[#8B0000]"
                >
                  Add Announcement
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <p className="text-[#4A2C2A] text-2xl font-bold">Announcements List:</p>
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="bg-white border-2 border-[#B22222]"
            >
              <CardHeader>
                <CardTitle className="text-[#B22222]">
                  {announcement.id}. {announcement.name} 
                </CardTitle>
              </CardHeader>
              <CardContent>
              <p className="text-[#4A2C2A]"><span className="text-[#B22222]">Announced on:</span> {announcement.date} </p>
              <br/>
                <p className="text-[#4A2C2A]">{announcement.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  variant="destructive"
                  className="ml-auto"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/admin/dashboard">
            <Button
              variant="outline"
              className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]"
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManageAnnouncementsPage;
