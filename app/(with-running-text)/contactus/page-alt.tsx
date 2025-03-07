import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactUsPage() {
  return (
    <div className="container mx-auto py-8 bg-[#F5EFE6] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">Contact Us</h1>
      <Card className="max-w-md mx-auto bg-white border-[#B22222] border-2">
        <CardHeader>
          <CardTitle className="text-[#B22222]">Mangalore Hindu Community</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[#4A2C2A]">
          <p>
            <strong className="text-[#B22222]">Phone:</strong> +91 824 123 4567
          </p>
          <p>
            <strong className="text-[#B22222]">Email:</strong> info@mangalorehinducommunity.org
          </p>
          <p>
            <strong className="text-[#B22222]">Address:</strong> 123 Kadri Temple Road, Mangalore, Karnataka 575003,
            India
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

