"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { withAdminAuth } from "@/app/components/withAdminAuth"
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react"

interface NavItem {
  id: number
  label: string
  url: string
  children?: NavItem[]
}

function EditNavigationPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      id: 1,
      label: "About",
      url: "#",
      children: [
        { id: 11, label: "About Community", url: "/about/community" },
        { id: 12, label: "Footprints", url: "/about/footprints" },
        { id: 13, label: "Management Committee", url: "/about/management-committee" },
        { id: 14, label: "Office Bearers", url: "/about/office-bearers" },
      ],
    },
    { id: 2, label: "Membership", url: "/membership" },
    {
      id: 3,
      label: "Activities",
      url: "#",
      children: [
        { id: 31, label: "Announcements", url: "/announcements" },
        { id: 32, label: "Events", url: "/events" },
      ],
    },
    { id: 4, label: "Contact Us", url: "/contactus" },
  ])
  const [newItemLabel, setNewItemLabel] = useState("")
  const [newItemUrl, setNewItemUrl] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("#FF9933")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [buttonColor, setButtonColor] = useState("#B22222")
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF")

  const handleAddItem = () => {
    if (newItemLabel && newItemUrl) {
      const newId = Math.max(0, ...navItems.map((item) => item.id)) + 1
      setNavItems([...navItems, { id: newId, label: newItemLabel, url: newItemUrl }])
      setNewItemLabel("")
      setNewItemUrl("")
      toast({
        title: "Success",
        description: "Navigation item added successfully.",
      })
    }
  }

  const handleDeleteItem = (id: number) => {
    setNavItems(navItems.filter((item) => item.id !== id))
    toast({
      title: "Success",
      description: "Navigation item deleted successfully.",
    })
  }

  const handleMoveItem = (id: number, direction: "up" | "down") => {
    const index = navItems.findIndex((item) => item.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === navItems.length - 1)) {
      return
    }

    const newItems = [...navItems]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    // Swap the items
    ;[newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]]

    setNavItems(newItems)
  }

  const handleSaveChanges = () => {
    // In a real application, you would send this data to your backend
    toast({
      title: "Success",
      description: "Navigation settings saved successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Edit Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="backgroundColor" className="text-[#4A2C2A]">
                  Background Color
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 p-1 border-[#B22222]"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor" className="text-[#4A2C2A]">
                  Text Color
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-10 p-1 border-[#B22222]"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonColor" className="text-[#4A2C2A]">
                  Button Color
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="buttonColor"
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="w-16 h-10 p-1 border-[#B22222]"
                  />
                  <Input
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonTextColor" className="text-[#4A2C2A]">
                  Button Text Color
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="buttonTextColor"
                    type="color"
                    value={buttonTextColor}
                    onChange={(e) => setButtonTextColor(e.target.value)}
                    className="w-16 h-10 p-1 border-[#B22222]"
                  />
                  <Input
                    value={buttonTextColor}
                    onChange={(e) => setButtonTextColor(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preview" className="text-[#4A2C2A]">
                  Preview
                </Label>
                <div id="preview" className="p-2 flex justify-center space-x-4" style={{ backgroundColor }}>
                  {navItems.map((item) => (
                    <div key={item.id} className="relative">
                      <button
                        className="px-4 py-2 rounded"
                        style={{ backgroundColor: buttonColor, color: buttonTextColor }}
                      >
                        {item.label} {item.children && <ChevronDown className="inline h-4 w-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newItemLabel" className="text-[#4A2C2A]">
                  Add New Navigation Item
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="newItemLabel"
                    placeholder="Label"
                    value={newItemLabel}
                    onChange={(e) => setNewItemLabel(e.target.value)}
                    className="border-[#B22222]"
                  />
                  <Input
                    id="newItemUrl"
                    placeholder="URL"
                    value={newItemUrl}
                    onChange={(e) => setNewItemUrl(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <Button onClick={handleAddItem} className="w-full mt-2 bg-[#B22222] text-white hover:bg-[#8B0000]">
                  <Plus className="mr-2 h-4 w-4" /> Add Navigation Item
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-[#4A2C2A]">Current Navigation Items</Label>
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <div key={item.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium text-[#4A2C2A]">{item.label}</h3>
                          <p className="text-sm text-muted-foreground">{item.url}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoveItem(item.id, "up")}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoveItem(item.id, "down")}
                            disabled={index === navItems.length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {item.children && (
                        <div className="ml-4 mt-2 border-l-2 pl-4 border-[#B22222]">
                          <h4 className="text-sm font-medium text-[#4A2C2A] mb-2">Submenu Items:</h4>
                          <ul className="space-y-1">
                            {item.children.map((child) => (
                              <li key={child.id} className="text-sm">
                                {child.label} - <span className="text-muted-foreground">{child.url}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleSaveChanges} className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                Save Changes
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/dashboard">
              <Button variant="outline" className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]">
                Back to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default withAdminAuth(EditNavigationPage)

