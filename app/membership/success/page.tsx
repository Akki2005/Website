import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#B22222]">Application Submitted!</CardTitle>
          <CardDescription>Thank you for applying to become a member of our community.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[#4A2C2A] mb-4">
            Your membership application has been received and is pending admin approval. This process may take a few
            days.
          </p>
          <p className="text-[#4A2C2A] mb-4">
            You will be notified via email once your application has been reviewed and approved.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

