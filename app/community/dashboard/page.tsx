"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@/utils/supabase/client"

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
  const supabase = createClient()
  const [user, setUser] = useState<any| null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<CommunityMember[]>([])
  const [address, setAddress] = useState("")
  const [profession, setProfession] = useState("")

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          
          router.push("/login/user")
          return
        }

        
        const { data: adminData } = await supabase
          .from('admins')
          .select('*')
          .eq('email', user.email)
          .single()

        if (adminData) {
          // User is admin, redirect to admin dashboard
          router.push("/admin/dashboard")
          return
        }

        setUser(user)
      } catch (error) {
        console.error('Error getting user:', error)
        router.push("/login/user")
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push("/login/user")
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleSearch = () => {
    
    const results = dummyMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.profession.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setSearchResults(results)
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login/user")
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9E6] flex items-center justify-center">
        <div className="text-[#B22222] text-lg">Loading...</div>
      </div>
    )
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#B22222]">Community Dashboard</h1>
            <p className="text-[#4A2C2A] mt-1">Welcome, {user.email || user.phone}</p>
          </div>
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
                        <li key={member.id} className="p-2 bg-gray-50 rounded">
                          <strong>{member.name}</strong> - {member.location} - {member.profession}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {searchTerm && searchResults.length === 0 && (
                  <p className="text-gray-500 text-sm">No members found matching your search.</p>
                )}
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
                <Button 
                  onClick={handleUpdateProfile} 
                  className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]"
                  disabled={!address && !profession}
                >
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