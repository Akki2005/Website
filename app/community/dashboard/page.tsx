"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface CommunityMember {
  id: string
  name: string
  location: string
  profession: string
}

const dummyMembers: CommunityMember[] = [
  { id: "1", name: "John Doe", location: "Mangalore", profession: "Teacher" },
  { id: "2", name: "Jane Smith", location: "Udupi", profession: "Doctor" },
  { id: "3", name: "Bob Johnson", location: "Mangalore", profession: "Engineer" },
]

export default function CommunityDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<CommunityMember[]>([])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [address, setAddress] = useState("")
  const [profession, setProfession] = useState("")

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "community") {
      router.push("/login")
    }
  }, [router])

  const handleSearch = () => {
    const results = dummyMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.profession.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setSearchResults(results)
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }
    // In a real application, you would send this to your backend
    toast({
      title: "Success",
      description: "Password change request sent for admin approval.",
    })
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleUpdateProfile = () => {
    // In a real application, you would send this to your backend
    toast({
      title: "Success",
      description: "Profile update request sent for admin approval.",
    })
    setAddress("")
    setProfession("")
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#B22222]">Community Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="border-[#B22222] text-[#B22222]">
            Logout
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white border-2 border-[#B22222]">
            <CardHeader>
              <CardTitle className="text-[#B22222]">Search Community Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Search by name, location, or profession"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-[#B22222]"
                />
                <Button onClick={handleSearch} className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                  Search
                </Button>
                {searchResults.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Search Results:</h3>
                    <ul className="space-y-2">
                      {searchResults.map((member) => (
                        <li key={member.id}>
                          {member.name} - {member.location} - {member.profession}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-[#B22222]">
            <CardHeader>
              <CardTitle className="text-[#B22222]">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <Button onClick={handleChangePassword} className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                  Request Password Change
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-[#B22222]">
            <CardHeader>
              <CardTitle className="text-[#B22222]">Update Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">New Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">New Profession</Label>
                  <Input
                    id="profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <Button onClick={handleUpdateProfile} className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                  Request Profile Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

