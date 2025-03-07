"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function Navigation() {
  const router = useRouter()

  return (
    <nav className="bg-[#FF9933] text-white py-2">
      <div className="container mx-auto flex justify-center space-x-4 items-center">
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
      </div>
    </nav>
  )
}

