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
import { withAdminAuth } from "@/app/components/withAdminAuth";
import { createClient } from "@/utils/supabase/client";

interface Footprint {
  id: number;
  event_name: string;
  event_desc: string;
  event_year:number;
}

function ManageFootprintsPage() {
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const supabase = createClient();
  const [newTitle, setNewTitle] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newContent, setNewContent] = useState("");

    const fetchFootprints=async()=>{
        const {data:footprintData,error:footprintError}=await supabase
        .from("Footprints")
        .select("*")
        
        
        if(footprintError){
            toast({
                title:"Error",
                description:"Failed to fetch footprints",
                variant:"destructive",
            });
            return;
        }
        else{
            setFootprints(footprintData);
        }
    }
  const handleAddFootprint = async () => {
        const {data:insertData,error:insertError}=await supabase
        .from("Footprints")
        .insert({
            event_year:newYear,
            event_name:newTitle,
            event_desc:newContent,
        })
        if(insertError){
            toast({
                    title: "Error",
                    description: "Failed to Add Footprint.",
                    variant: "destructive",
                  });
                  return ;
        }
        else{
            toast({
                title: "Success",
                description: "Footprint added successfully.",
              });
        }
      setNewTitle("");
      setNewContent("");
      setNewYear("")
      
    fetchFootprints()
  };

  const handleDeletefootprints = async (id: number) => {
    const {error:deleteError}=await supabase
    .from("Footprints")
    .delete()
    .eq("id",id)
    if(deleteError){
        toast({
                title: "Error",
                description: "Failed to Delete Footprint.",
                variant: "destructive",
              });
              return ;
    }
    else{
        toast({
            title: "Success",
            description: "Footprint deleted successfully.",
          });
    }
    fetchFootprints()
  };
   useEffect(() => {
      fetchFootprints();
    }, []);
 
  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Manage Footprints</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddFootprint();
              }}
            >
              <div className="space-y-4">
                <div className="flex gap-5">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="newTitle" className="text-[#4A2C2A]">
                      Footprint name
                    </Label>
                    <Input
                      id="newTitle"
                      value={newTitle}
                      required
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="border-[#B22222]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-[#4A2C2A]">
                      Footprint Year
                    </Label>
                    <Input
                      id="year"
                      value={newYear}
                      type="number"
                      required
                      min="1900"
                      max="2099"
                      onChange={(e) => setNewYear(e.target.value)}
                      placeholder="YYYY"
                      className="border-[#B22222]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newContent" className="text-[#4A2C2A]">
                    Description
                  </Label>
                  <Textarea
                    id="newContent"
                    value={newContent}
                    required
                    onChange={(e) => setNewContent(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#B22222] text-white hover:bg-[#8B0000]"
                >
                  Add Footprint
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {footprints.map((footprints) => (
            <Card
              key={footprints.id}
              className="bg-white border-2 border-[#B22222]"
            >
              <CardHeader>
                <CardTitle className="text-[#B22222]">
                  {footprints.id}. {footprints.event_name} ({footprints.event_year})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A2C2A]">{footprints.event_desc}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleDeletefootprints(footprints.id)}
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

export default withAdminAuth(ManageFootprintsPage);
