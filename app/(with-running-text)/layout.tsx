import type React from "react"
import { RunningText } from "../components/RunningText"

export default function WithRunningTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <RunningText />
      {children}
    </>
  )
}

