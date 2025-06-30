"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Contribution {
  id: number
  name: string
  amount: number
  date: string
}

function ManageContributionsPage() {
  const [contributions, setContributions] = useState<Contribution[]>([
    { id: 1, name: "John Doe", amount: 1000, date: "2023-05-15" },
    { id: 2, name: "Jane Smith", amount: 500, date: "2023-05-16" },
    { id: 3, name: "Bob Johnson", amount: 750, date: "2023-05-17" },
  ])
  const [newName, setNewName] = useState("")
  const [newAmount, setNewAmount] = useState("")

  const handleAddContribution = () => {
    if (newName && newAmount) {
      const newId = Math.max(0, ...contributions.map((c) => c.id)) + 1
      const newContribution: Contribution = {
        id: newId,
        name: newName,
        amount: Number.parseFloat(newAmount),
        date: new Date().toISOString().split("T")[0],
      }
      setContributions([...contributions, newContribution])
      setNewName("")
      setNewAmount("")
      toast({
        title: "Success",
        description: "Contribution added successfully.",
      })
    }
  }

  const handleDeleteContribution = (id: number) => {
    setContributions(contributions.filter((c) => c.id !== id))
    toast({
      title: "Success",
      description: "Contribution deleted successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white border-2 border-[#B22222] mb-8">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Manage Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newName" className="text-[#4A2C2A]">
                    Contributor Name
                  </Label>
                  <Input
                    id="newName"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newAmount" className="text-[#4A2C2A]">
                    Amount
                  </Label>
                  <Input
                    id="newAmount"
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="border-[#B22222]"
                  />
                </div>
              </div>
              <Button onClick={handleAddContribution} className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]">
                Add Contribution
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-2 border-[#B22222]">
          <CardHeader>
            <CardTitle className="text-[#B22222]">Contribution List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contributions.map((contribution) => (
                  <TableRow key={contribution.id}>
                    <TableCell>{contribution.name}</TableCell>
                    <TableCell>₹{contribution.amount}</TableCell>
                    <TableCell>{contribution.date}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteContribution(contribution.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="mt-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="border-[#B22222] text-[#B22222] hover:bg-[#FFF3E0]">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ManageContributionsPage

