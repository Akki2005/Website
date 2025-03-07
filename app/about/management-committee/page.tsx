"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

interface CommitteeMember {
  name: string
  position: string
  description: string
  image: string
  achievements: string[]
}

const committeeMembers: CommitteeMember[] = [
  {
    name: "Rajesh Patil",
    position: "President",
    description:
      "Rajesh has been leading our community organization for the past 5 years, bringing innovative ideas and fostering growth.",
    image: "/placeholder.svg?height=400&width=300&text=Rajesh+Patil",
    achievements: [
      "Increased community engagement by 50%",
      "Launched annual Marathi literature festival",
      "Established partnerships with 5 international Marathi organizations",
    ],
  },
  {
    name: "Sunita Deshmukh",
    position: "Vice President",
    description:
      "Sunita oversees our cultural programs and ensures that our events truly represent the essence of Marathi culture.",
    image: "/placeholder.svg?height=400&width=300&text=Sunita+Deshmukh",
    achievements: [
      "Curated 20+ cultural events annually",
      "Introduced youth mentorship program",
      "Received state recognition for cultural preservation efforts",
    ],
  },
  {
    name: "Amit Joshi",
    position: "Secretary",
    description: "Amit manages the day-to-day operations of our organization and coordinates with various committees.",
    image: "/placeholder.svg?height=400&width=300&text=Amit+Joshi",
    achievements: [
      "Streamlined administrative processes",
      "Implemented digital record-keeping system",
      "Organized successful fundraising campaigns",
    ],
  },
  {
    name: "Priya Kulkarni",
    position: "Treasurer",
    description:
      "Priya handles our finances and ensures that our resources are utilized effectively for community development.",
    image: "/placeholder.svg?height=400&width=300&text=Priya+Kulkarni",
    achievements: [
      "Increased annual budget by 30%",
      "Secured grants for community projects",
      "Implemented transparent financial reporting system",
    ],
  },
]

export default function ManagementCommitteePage() {
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null)

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <div className="bg-black py-6 mb-12">
          <h1 className="text-3xl font-bold text-center text-white">Management Committee</h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {committeeMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="bg-white border-2 border-[#B22222] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative h-48">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold text-[#B22222] mb-1">{member.name}</h2>
                  <h3 className="text-lg font-semibold text-[#4A2C2A] mb-2">{member.position}</h3>
                  <p className="text-[#4A2C2A] text-sm line-clamp-3">{member.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedMember && (
          <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
            <DialogContent className="bg-white border-2 border-[#B22222] max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#B22222] flex items-center mb-4">
                  <Image
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    width={100}
                    height={100}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h2>{selectedMember.name}</h2>
                    <h3 className="text-lg text-[#4A2C2A]">{selectedMember.position}</h3>
                  </div>
                </DialogTitle>
                <DialogDescription className="text-[#4A2C2A]">
                  <p className="mb-4">{selectedMember.description}</p>
                  <h4 className="text-lg font-semibold text-[#B22222] mb-2">Key Achievements:</h4>
                  <ul className="list-disc pl-5">
                    {selectedMember.achievements.map((achievement, index) => (
                      <li key={index} className="mb-1">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

