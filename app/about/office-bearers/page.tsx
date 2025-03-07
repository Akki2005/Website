import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface OfficeBearers {
  name: string
  position: string
  responsibilities: string[]
}

const officeBearers: OfficeBearers[] = [
  {
    name: "Vikram Mane",
    position: "Cultural Secretary",
    responsibilities: [
      "Organizing cultural events and festivals",
      "Coordinating with artists and performers",
      "Promoting Marathi arts and culture",
    ],
  },
  {
    name: "Anjali Gokhale",
    position: "Education Coordinator",
    responsibilities: [
      "Managing Marathi language classes",
      "Organizing educational workshops",
      "Coordinating with schools and educational institutions",
    ],
  },
  {
    name: "Nikhil Wagh",
    position: "Youth Coordinator",
    responsibilities: [
      "Organizing youth-centric events and activities",
      "Mentoring young community members",
      "Bridging the gap between generations",
    ],
  },
  {
    name: "Meera Sawant",
    position: "Public Relations Officer",
    responsibilities: [
      "Managing community outreach programs",
      "Liaising with other community organizations",
      "Handling media relations and communications",
    ],
  },
]

export default function OfficeBearersPage() {
  return (
    <div className="container mx-auto py-8 px-4 bg-[#FFF9E6] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#B22222]">Office Bearers</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {officeBearers.map((bearer, index) => (
          <Card key={index} className="bg-white border-2 border-[#B22222]">
            <CardHeader>
              <CardTitle className="text-[#B22222]">{bearer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2 text-[#4A2C2A]">{bearer.position}</p>
              <ul className="list-disc pl-5 text-[#4A2C2A]">
                {bearer.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

