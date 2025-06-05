import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import MovingAnnouncements from "./components/MovingAnnouncements"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mangalore Hindu Community",
  description: "Official website of the Mangalore Hindu Community",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={inter.className}>
        <Header />
        <Navigation />
        <MovingAnnouncements />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'
