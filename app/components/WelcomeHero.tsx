"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WelcomeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-home-background text-home-text py-16 px-4"
    >
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Welcome to Mangalore Hindu Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl mb-8"
        >
          Celebrating our culture, heritage, and community spirit
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href="/about/community">
            <Button className="bg-home-primary text-white hover:bg-[#E68A00] mr-4">Learn More</Button>
          </Link>
          <Link href="/membership">
            <Button className="bg-home-secondary text-white hover:bg-[#8B0000]">Join Us</Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

