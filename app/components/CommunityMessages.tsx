"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, Calendar, MapPin } from "lucide-react"
import { ShivajiArtisticBg } from "./ShivajiArtisticBg"

export default function CommunityMessages() {
  const [activeTab, setActiveTab] = useState("community")

  return (
    <section className="container mx-auto my-16">
      <div className="bg-[#FFF3E0] rounded-lg p-8 border-4 border-[#B22222] relative overflow-hidden">
        <ShivajiArtisticBg />
        <Tabs defaultValue="community" className="relative z-10" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="community" className="text-[#B22222]">
              Community
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-[#B22222]">
              Messages
            </TabsTrigger>
          </TabsList>
          <TabsContent value="community">
            <Card className="bg-white border-2 border-[#B22222]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#B22222] flex items-center">
                  <Users className="mr-2" />
                  Our Vibrant Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-800 mb-4">
                    Our community is a diverse group of individuals united by our shared Marathi heritage. We celebrate
                    our culture, traditions, and language while embracing the spirit of unity in diversity.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Calendar className="mr-2 text-[#B22222]" />
                      <span>Regular cultural events and festivals</span>
                    </li>
                    <li className="flex items-center">
                      <MessageCircle className="mr-2 text-[#B22222]" />
                      <span>Language classes for all age groups</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="mr-2 text-[#B22222]" />
                      <span>Youth mentorship programs</span>
                    </li>
                    <li className="flex items-center">
                      <MapPin className="mr-2 text-[#B22222]" />
                      <span>Community outreach initiatives</span>
                    </li>
                  </ul>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="messages">
            <Card className="bg-white border-2 border-[#B22222]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#B22222] flex items-center">
                  <MessageCircle className="mr-2" />
                  Latest Community Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ul className="space-y-4">
                    <li>
                      <p className="font-semibold text-[#B22222]">Upcoming Marathi Literature Festival</p>
                      <p className="text-gray-800">
                        Join us for a celebration of Marathi literature on July 15th. Renowned authors will be present
                        for book readings and discussions.
                      </p>
                    </li>
                    <li>
                      <p className="font-semibold text-[#B22222]">Volunteers Needed for Community Clean-up</p>
                      <p className="text-gray-800">
                        We're organizing a community clean-up drive on August 5th. Your participation can make a
                        significant difference!
                      </p>
                    </li>
                    <li>
                      <p className="font-semibold text-[#B22222]">New Batch of Marathi Cooking Classes</p>
                      <p className="text-gray-800">
                        Learn to cook authentic Marathi cuisine. New classes starting from September 1st. Limited spots
                        available!
                      </p>
                    </li>
                  </ul>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

