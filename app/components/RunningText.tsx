"use client"

import { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion"

export function RunningText() {
  const baseVelocity = -2
  const baseX = useMotionValue(0)
  const x = useTransform(baseX, (v) => `${v}%`)
  const containerRef = useRef<HTMLDivElement>(null)

  useAnimationFrame((t, delta) => {
    const moveBy = baseVelocity * (delta / 1000)

    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const contentWidth = containerRef.current.scrollWidth
      const maxX = (contentWidth / containerWidth) * 100

      if (baseX.get() <= -maxX) {
        baseX.set(0)
      }
    }

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="overflow-hidden bg-black py-2" ref={containerRef}>
      <motion.div className="flex whitespace-nowrap text-white" style={{ x }}>
        <span className="mx-4 text-lg font-semibold">Mangalore Hindu Community</span>
        <span className="mx-4 text-lg font-semibold">मंगलौर हिंदू समुदाय</span>
        <span className="mx-4 text-lg font-semibold">ಮಂಗಳೂರು ಹಿಂದೂ ಸಮುದಾಯ</span>
        <span className="mx-4 text-lg font-semibold">Mangalore Hindu Community</span>
        <span className="mx-4 text-lg font-semibold">मंगलौर हिंदू समुदाय</span>
        <span className="mx-4 text-lg font-semibold">ಮಂಗಳೂರು ಹಿಂದೂ ಸಮುದಾಯ</span>
      </motion.div>
    </div>
  )
}

