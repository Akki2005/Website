"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { withAdminAuth } from "@/lib/auth"

interface ApprovalRequest {
  id: string
  type: "password" | "profile"
  userId: string
  details: string
}

const dummyRequests: ApprovalRequest[] = [
  { id: "1", type: "password", userId: "123", details: "Password change request" },
  { id: "2", type: "profile", userId: "456", details: "Address update: New address, City" },
]

function AdminDashboard() {
  const router = useRouter()
  const [aboutContent, setAboutContent] = useState("Current about content...")
  const [contactInfo, setContactInfo] = useState("Current contact information...")
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(dummyRequests)

  const handleUpdateAbout = () => {
    // In a real application, you would send this to your backend
    toast({
      title: "Success",
      description: "About content updated successfully.",
    })
  }

  const handleUpdateContact = () => {
    // In a real application, you would send this to your backend
    toast({
      title: "Success",
      description: "Contact information updated successfully.",
    })
  }

  const handleApproveRequest = (id: string) => {
    // In a real application, you would send this to your backend
    setApprovalRequests(approvalRequests.filter((request) => request.id !== id))
    toast({
      title: "Success",
      description: "Request approved successfully.",
    })
  }

  const handleRejectRequest = (id: string) => {
    // In a real application, you would send this to your backend
    setApprovalRequests(approvalRequests.filter((request) => request.id !== id))
    toast({
      title: "Success",
      description: "Request rejected successfully.",
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#B22222]">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="border-[#B22222] text-[#B22222]">
            Logout
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white border-2 border-[#B22222]">
            <CardHeader>
              <CardTitle className="text-[#B22222]">Customize About Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  className="border-[#B22222]"
                  rows={5}
                />
                <Button onClick={handleUpdateAbout} className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                  Update About Content
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-[#B22222]">
            <CardHeader>
              <CardTitle className="text-[#B22222]">Customize Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="border-[#B22222]"
                  rows={5}
                />
                <Button onClick={handleUpdateContact} className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                  Update Contact Information
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-[#B22222] md:col-span-2">
            <CardHeader>
              <CardTitle className="text-[#B22222]">Approval Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {approvalRequests.length === 0 ? (
                <p>No pending approval requests.</p>
              ) : (
                // <ul className="space-y-4">
                //   {approvalRequests.map((request) => (
                //     <li key={request.id} className="flex items-center justify-between border-b pb-2">
                //       <div>
                //         <p className="font-semibold">
                //           {request.type === "password" ? "Password Change" : "Profile Update"}
                //         </p>
                //         <p className="text-sm">User ID: {request.userId}</p>
                //         <p className="text-sm">{request.details}</p>
                //       </div>
                //       <div className="space-x-2">
                //         <Button
                //           onClick={() => handleApproveRequest(request.id)}
                //           className="bg-green-600 text-white hover:bg-green-700"
                //         >
                //           Approve
                //         </Button>
                //         <Button
                //           onClick={() => handleRejectRequest(request.id)}
                //           className="bg-red-600 text-white hover:bg-red-700"
                //         >
                //           Reject
                //         </Button>
                //       </div>
                //     </li>
                //   ))}
                // </ul>
                <>
                  <div className="flex gap-4">
                    <Link href="/admin/new-members" className="w-full">
                      <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                         New Memebers approvals
                      </Button>
                    </Link>
                  
                    <Link href="/admin/new-members" className="w-full">
                      <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                        Password change requests
                      </Button>
                    </Link>

                    <Link href="/admin/new-members" className="w-full">
                      <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                         Profile Update Requests
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-[#B22222]">Website Management</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/admin/announcements">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Manage Announcements</Button>
            </Link>
            <Link href="/admin/events">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Manage Events</Button>
            </Link>
            <Link href="/admin/committee">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Manage Committee Members</Button>
            </Link>
            <Link href="/admin/moving-announcement">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Edit Moving Announcement</Button>
            </Link>
            <Link href="/admin/footer">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Edit Footer</Button>
            </Link>
            <Link href="/admin/contact">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Edit Contact Information</Button>
            </Link>
            <Link href="/admin/carousel">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Edit Carousel</Button>
            </Link>
            <Link href="/admin/navigation">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Edit Navigation</Button>
            </Link>
            <Link href="/admin/welcome-hero">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Edit Welcome Hero</Button>
            </Link>
            <Link href="/admin/contributors">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Manage Contributors</Button>
            </Link>
            <Link href="/admin/about/footprints">
              <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Edit Footprints</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAdminAuth(AdminDashboard)

