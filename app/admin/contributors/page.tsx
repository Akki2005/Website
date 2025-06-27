"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface Contributor {
  id: string
  name: string
  role: string
  photoUrl: string
}

function ContributorsManagement() {
  const [contributors, setContributors] = useState<Contributor[]>([
    { id: "1", name: "Akhilesh", role: " Frontend Developer", photoUrl: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Charan Gowda", role: "Backend Developer", photoUrl: "/placeholder.svg?height=100&width=100" },
    { id: "3", name: "Srujan Swamy", role: "Backend Developer", photoUrl: "/placeholder.svg?height=100&width=100" },
  ])
  const [newContributor, setNewContributor] = useState({ name: "", role: "", photoUrl: "" })

  const handleAddContributor = () => {
    if (newContributor.name && newContributor.role) {
      setContributors([...contributors, { ...newContributor, id: Date.now().toString() }])
      setNewContributor({ name: "", role: "", photoUrl: "" })
      toast({ title: "Success", description: "Contributor added successfully." })
    }
  }

  const handleDeleteContributor = (id: string) => {
    setContributors(contributors.filter((c) => c.id !== id))
    toast({ title: "Success", description: "Contributor deleted successfully." })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Contributors</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Contributor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newContributor.name}
                onChange={(e) => setNewContributor({ ...newContributor, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={newContributor.role}
                onChange={(e) => setNewContributor({ ...newContributor, role: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="photoUrl">Photo URL</Label>
              <Input
                id="photoUrl"
                value={newContributor.photoUrl}
                onChange={(e) => setNewContributor({ ...newContributor, photoUrl: e.target.value })}
              />
            </div>
            <Button onClick={handleAddContributor}>Add Contributor</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contributors.map((contributor) => (
          <Card key={contributor.id}>
            <CardContent className="flex flex-col items-center p-4">
              <img
                src={contributor.photoUrl || "/placeholder.svg?height=100&width=100"}
                alt={contributor.name}
                className="w-24 h-24 rounded-full mb-2"
              />
              <h3 className="font-semibold">{contributor.name}</h3>
              <p className="text-sm text-gray-600">{contributor.role}</p>
              <Button
                variant="destructive"
                size="sm"
                className="mt-2"
                onClick={() => handleDeleteContributor(contributor.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default (ContributorsManagement)

