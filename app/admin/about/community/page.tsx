"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function CommunityPage() {
  const supabase = createClient();
  const [heading, setHeading] = useState("");
  const [aboutContent, setAboutContent] = useState("");

  const handleAboutContent = async () => {
    const { data: insertData, error: insertError } = await supabase
      .from("AboutUs")
      .insert({
        heading: heading,
        description: aboutContent,
      });
    if (insertError) {
      toast({
        title: "Error",
        description: "Failed to Add AboutUs.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Success",
        description: "AboutUs added successfully.",
      });
    }
    setHeading("");
    setAboutContent("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAboutContent();
      }}
    >
      <Card className="bg-white border-2 border-[#B22222]">
        <CardHeader>
          <CardTitle className="text-[#B22222]">
            Customize About Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            
            <Input
              id="heading"
              value={heading}
              required
              placeholder="Enter heading name"
              onChange={(e) => setHeading(e.target.value)}
              className="border-[#B22222]"
            />
            <Textarea
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
              required
              placeholder="Enter the about content"
              className="border-[#B22222]"
              rows={5}
            />
            <Button
              type="submit"
              className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]"
            >
              Update About Content
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
