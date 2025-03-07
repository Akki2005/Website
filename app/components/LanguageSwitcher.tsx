"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "kn", name: "ಕನ್ನಡ" },
]

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    // Here you would typically update the app's language setting
    // For now, we'll just log the change
    console.log(`Language changed to ${langCode}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#FFF3E0] text-[#B22222] border-2 border-[#B22222] hover:bg-[#FFE0B2] hover:text-[#8B0000]"
        >
          <Globe className="mr-2 h-4 w-4" />
          {languages.find((lang) => lang.code === currentLanguage)?.name || "Language"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#FFF3E0] border-2 border-[#B22222]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="text-[#B22222] hover:bg-[#FFE0B2] hover:text-[#8B0000] cursor-pointer"
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

