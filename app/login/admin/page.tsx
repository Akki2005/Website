"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { login } from "./actions";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault()
  //     if (username === "admin" && password === "password") {
  //       localStorage.setItem("userType", "admin")
  //       localStorage.setItem("isAdminLoggedIn", "true")
  //       toast({
  //         title: "Login Successful",
  //         description: "Welcome to the admin dashboard.",
  //       })
  //       router.push("/admin/dashboard")
  //     } else if (username === "123" && password === "password") {
  //       localStorage.setItem("userType", "community")
  //       toast({
  //         title: "Login Successful",
  //         description: "Welcome to your community dashboard.",
  //       })
  //       router.push("/community/dashboard")
  //     } else {
  //       toast({
  //         title: "Login Failed",
  //         description: "Invalid username or password.",
  //         variant: "destructive",
  //       })
  //     }
  //   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9E6]">
      <Card className="w-full max-w-md bg-white border-2 border-[#B22222]">
        <CardHeader>
          <CardTitle className="text-[#B22222]">Login</CardTitle>
          <CardDescription className="text-[#4A2C2A]">
            Please enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <form >
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#4A2C2A]">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="border-[#B22222]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#4A2C2A]">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-[#B22222]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#B22222] text-white hover:bg-[#8B0000]"
              formAction={login}
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
