// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import type React from "react"

// export function withAdminAuth(WrappedComponent: React.ComponentType) {
//   return function WithAdminAuth(props: any) {
//     const router = useRouter()
//     const [isAuthenticated, setIsAuthenticated] = useState(false)

//     // useEffect(() => {
//     //   const checkAuth = () => {
//     //     const userType = localStorage.getItem("userType")
//     //     if (userType !== "admin") {
//     //       router.push("/login")
//     //     } else {
//     //       setIsAuthenticated(true)
//     //     }
//     //   }

//       checkAuth()
//     }, [router])

//     if (!isAuthenticated) {
//       return null // or a loading spinner
//     }

//     return <WrappedComponent {...props} />
//   }
// }

