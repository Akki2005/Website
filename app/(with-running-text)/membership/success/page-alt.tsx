import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#B22222]">Membership Successful!</h1>
        <p className="text-[#4A2C2A] mb-8">Thank you for becoming a member of our community.</p>
        <Link href="/">
          <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}

