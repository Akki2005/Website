"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, User } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

export default function Navigation() {
  const router = useRouter()
  const supabase = createClient()
 const [user, setUser] = useState<any| null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          setUser("")
          setIsAdmin(false)
          setLoading(false)
          return
        }

        setUser(user)

        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admins')
          .select('*')
          .eq('email', user.email)
          .single()

        setIsAdmin(!!adminData)
      } catch (error) {
        console.error('Error checking user:', error)
        setUser(null)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        getUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleDashboardClick = () => {
    if (isAdmin) {
      router.push('/admin/dashboard')
    } else {
      router.push('/community/dashboard')
    }
  }

  return (
    <nav className="bg-[#FF9933] text-white py-2">
      <div className="container mx-auto flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 items-center">
        <Link href="/" passHref>
          <Button variant="default" className="bg-[#B22222] hover:bg-[#8B0000] text-white">
            Home
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-[#B22222] hover:bg-[#8B0000] text-white">
              About <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#FFF3E0] text-[#4A2C2A]">
            <DropdownMenuItem>
              <Link href="/about/community" className="w-full">
                About Community
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about/footprints" className="w-full">
                Footprints
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about/management-committee" className="w-full">
                Management Committee
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about/office-bearers" className="w-full">
                Office Bearers
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Link href="/membership" passHref>
          <Button variant="default" className="bg-[#B22222] hover:bg-[#8B0000] text-white">
            Membership
          </Button>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-[#B22222] hover:bg-[#8B0000] text-white">
              Activities <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#FFF3E0] text-[#4A2C2A]">
            <DropdownMenuItem>
              <Link href="/announcements" className="w-full">
                Announcements
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/events" className="w-full">
                Events
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Link href="/contributors" passHref>
          <Button variant="default" className="bg-[#B22222] hover:bg-[#8B0000] text-white">
            Contributors
          </Button>
        </Link>
        
        <Link href="/contactus" passHref>
          <Button variant="default" className="bg-[#B22222] hover:bg-[#8B0000] text-white">
            Contact Us
          </Button>
        </Link>

        {!loading && user && (
          <Button 
            onClick={handleDashboardClick}
            variant="default" 
            className="bg-[#138808] hover:bg-[#0F6B06] text-white ml-auto"
          >
            <User className="mr-1 h-4 w-4" />
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </Button>
        )}
      </div>
    </nav>
  )
} 