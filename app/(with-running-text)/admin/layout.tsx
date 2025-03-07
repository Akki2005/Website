import type React from "react"
import { RunningText } from "../../components/RunningText"
import { withAdminAuth } from "../../components/withAdminAuth"

function AdminLayout({
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

export default withAdminAuth(AdminLayout)

