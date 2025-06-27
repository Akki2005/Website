"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function EditMovingAnnouncementPage() {
  const [announcements, setAnnouncements] = useState<string[]>([
    // "Join us for the Annual Marathi Literature Festival next month!",
    // "New Marathi language classes starting soon. Register now!",
    // "Volunteers needed for the upcoming community clean-up drive.",
    // "Don't miss our traditional Marathi cuisine workshop this weekend!",
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [currentAnnouncements, setCurrentAnnouncements] = useState<string[]>(
    []
  );

  const supabase = createClient();
  const fetchAnnouncements = async () => {
    const { data: announcementData, error: announcementError } = await supabase
      .from("MovingAnnouncement")
      .select("announcements")
      .single();

    if (announcementError) {
      toast({
        title: "Error",
        description: "Failed to fetch Announcement.",
        variant: "destructive",
      });
      return;
    } else {
      setCurrentAnnouncements(announcementData.announcements);
    }
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement) {
      setAnnouncements([...announcements, newAnnouncement]);
      setNewAnnouncement("");
      toast({
        title: "Success",
        description: "Announcement added successfully.",
      });
    }
  };

  const handleDeleteAnnouncement = (index: number) => {
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements.splice(index, 1);
    setAnnouncements(updatedAnnouncements);
    toast({
      title: "Success",
      description: "Announcement deleted successfully.",
    });
  };
  const handleDeleteCurrentAnnouncement = async (
    deleteAnnouncement: string
  ) => {
    const { data, error } = await supabase
      .from("MovingAnnouncement")
      .select("id, announcements")
      .limit(1)
      .single();

    const updatedArray = data.announcements.filter(
      (item: string) => item !== deleteAnnouncement
    );

    const { error: updateError } = await supabase
      .from("MovingAnnouncement")
      .update({ announcements: updatedArray })
      .eq("id", data.id);

    if (updateError) {
      toast({
        title: "Error",
        description: "Failed to delete Announcement.",
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
  const handleSaveChanges = async () => {
    // In a real application, you would send this data to your backend
    const { error } = await supabase
      .from("MovingAnnouncement")
      .delete()
      .not("id", "eq", -1);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcements.",
        variant: "destructive",
      });
    }

    const { data: insertData, error: insertError } = await supabase
      .from("MovingAnnouncement")
      .insert({
        backgroundColor: backgroundColor,
        textColor: textColor,
        announcements: [...currentAnnouncements, ...announcements],
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
    
    fetchAnnouncements();
    setAnnouncements([])
  };
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              
            }}
          >
            <CardHeader>
              <CardTitle className="text-[#B22222]">
                Edit Moving Announcement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor" className="text-[#4A2C2A]">
                    Background Color
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1 border-[#B22222]"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textColor" className="text-[#4A2C2A]">
                    Text Color
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="textColor"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-16 h-10 p-1 border-[#B22222]"
                    />
                    <Input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preview" className="text-[#4A2C2A]">
                    Preview
                  </Label>
                  <div
                    id="preview"
                    className="p-2 overflow-hidden whitespace-nowrap"
                    style={{ backgroundColor, color: textColor }}
                  >
                    {announcements.map((announcement, index) => (
                      <span key={index} className="inline-block mx-4">
                        {announcement}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newAnnouncement" className="text-[#4A2C2A]">
                    Add New Announcement
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="newAnnouncement"
                      value={newAnnouncement}
                      onChange={(e) => setNewAnnouncement(e.target.value)}
                      className="border-[#B22222]"
                    />
                    <Button
                      onClick={handleAddAnnouncement}
                      className="bg-[#B22222] text-white hover:bg-[#8B0000] whitespace-nowrap"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#4A2C2A]">New Announcements</Label>
                  <div className="space-y-2">
                    {announcements.map((announcement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <p className="text-[#4A2C2A]">{announcement}</p>
                        <Button
                          onClick={() => handleDeleteAnnouncement(index)}
                          variant="destructive"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#4A2C2A]">
                    Current Announcements
                  </Label>
                  <div className="space-y-2">
                    {currentAnnouncements.map(
                      (announcement: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <p className="text-[#4A2C2A]">{announcement}</p>
                          <Button
                            onClick={() =>
                              handleDeleteCurrentAnnouncement(announcement)
                            }
                            variant="destructive"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  onClick={handleSaveChanges}
                  className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]"
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/dashboard">
                <Button
                  variant="outline"
                  className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]"
                >
                  Back to Dashboard
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default EditMovingAnnouncementPage;
