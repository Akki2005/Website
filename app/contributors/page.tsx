import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface Contributor {
  id: number
  name: string
  role: string
  photoUrl: string
}

const contributors: Contributor[] = [
  { id: 1, name: "Akhilesh", role: " Frontend Developer", photoUrl: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Charan Gowda", role: "Backend Developer", photoUrl: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Srujan Swamy", role: "Backend Developer", photoUrl: "/placeholder.svg?height=100&width=100" },
  
]

export default function ContributorsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#B22222]">Our Contributors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor) => (
          <Card key={contributor.id} className="bg-white border-2 border-[#B22222]">
            <CardHeader className="flex items-center justify-center">
              <Image
                src={contributor.photoUrl || "/placeholder.svg"}
                alt={contributor.name}
                width={100}
                height={100}
                className="rounded-full"
              />
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-xl font-semibold text-[#4A2C2A]">{contributor.name}</CardTitle>
              <p className="text-[#B22222]">{contributor.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

