"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"


interface CommitteeMember {
  id: number
  name: string
  position: string
  description: string
}

function ManageCommitteePage() {
  const [members, setMembers] = useState<CommitteeMember[]>([
    {
      id: 1,
      name: "Rajesh Patil",
      position: "President",
      description: "Rajesh has been leading our community organization for the past 5 years.",
    },
    {
      id: 2,
      name: "Sunita Deshmukh",
      position: "Vice President",
      description: "Sunita oversees our cultural programs and events.",
    },
  ])
  const [newName, setNewName] = useState("")
  const [newPosition, setNewPosition] = useState("")
  const [newDescription, setNewDescription] = useState("")

  const handleAddMember = () => {
    if (newName && newPosition && newDescription) {
      setMembers([...members, { id: Date.now(), name: newName, position: newPosition, description: newDescription }])
      setNewName("")
      setNewPosition("")
      setNewDescription("")
      toast({
        title: "Success",
        description: "Committee member added successfully.",
      })
    }
  }

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
    toast({
      title: "Success",
      description: "Committee member removed successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Manage Committee Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newName" className="text-[#4A2C2A]">
                  New Member Name
                </Label>
                <Input
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPosition" className="text-[#4A2C2A]">
                  New Member Position
                </Label>
                <Input
                  id="newPosition"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDescription" className="text-[#4A2C2A]">
                  New Member Description
                </Label>
                <Textarea
                  id="newDescription"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="border-[#B22222]"
                />
              </div>
              <Button onClick={handleAddMember} className="bg-[#B22222] text-white hover:bg-[#8B0000]">
                Add Committee Member
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {members.map((member) => (
            <Card key={member.id} className="bg-white border-2 border-[#B22222]">
              <CardHeader>
                <CardTitle className="text-[#B22222]">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A2C2A] font-semibold">{member.position}</p>
                <p className="text-[#4A2C2A]">{member.description}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleDeleteMember(member.id)} variant="destructive" className="ml-auto">
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ManageCommitteePage

