"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { withAdminAuth } from "@/app/components/withAdminAuth"

function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="Change Password" link="/admin/change-password" />
          <DashboardCard title="Manage Announcements" link="/admin/announcements" />
          <DashboardCard title="Manage Events" link="/admin/events" />
          <DashboardCard title="Update Contact Information" link="/admin/contact" />
          <DashboardCard title="Manage Committee Members" link="/admin/committee" />
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, link }: { title: string; link: string }) {
  return (
    <Card className="bg-white border-2 border-[#B22222]">
      <CardHeader>
        <CardTitle className="text-[#B22222]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={link}>
          <Button className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">Manage</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default withAdminAuth(AdminDashboard)

