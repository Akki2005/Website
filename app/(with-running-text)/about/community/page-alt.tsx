import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AboutCommunityPage() {
  return (
    <div className="container mx-auto py-8 px-4 bg-[#FAF3E0] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">About Our Community</h1>
      <Card className="bg-[#FFF3E0] border-[#B22222] border-2">
        <CardHeader>
          <CardTitle className="text-[#B22222]">The Mangalore Hindu Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-[#4A2C2A]">
            The Mangalore Hindu community is a vibrant and culturally rich group of people originating from the coastal
            region of Karnataka, India. Our community is known for its strong traditions, literature, art, and cuisine,
            deeply rooted in the Tulu culture.
          </p>
          <p className="mb-4 text-[#4A2C2A]">
            Our organization aims to preserve and promote the unique Hindu traditions of Mangalore, including the
            worship of local deities, celebration of festivals like Navaratri and Deepavali with a local flavor, and the
            preservation of our Tulu language alongside Sanskrit and Kannada.
          </p>
          <p className="text-[#4A2C2A]">
            Whether you're a native of Mangalore or someone interested in learning about our culture, we welcome you to
            join our community and participate in our diverse range of activities and events that showcase the rich
            heritage of Tulu Nadu.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

