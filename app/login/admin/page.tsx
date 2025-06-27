"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
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

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        toast({
          title: "Login Failed",
          description: authError.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single();

      if (adminError || !adminData) {
       
        await supabase.auth.signOut();
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Success",
        description: "Admin login successful! Redirecting...",
      });

     
      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 1000);

    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9E6] transition-all">
      <Card className="w-full max-w-md bg-white border-2 border-[#B22222] transition-transform duration-300">
        <CardHeader>
          <CardTitle className="text-[#B22222]">Admin Login</CardTitle>
          <CardDescription className="text-[#4A2C2A]">
            Sign in with your admin credentials.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#4A2C2A]">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#B22222]"
                disabled={loading}
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-[#4A2C2A]">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#B22222]"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#B22222] text-white hover:bg-[#8B0000] transition"
              disabled={loading || !email.trim() || !password.trim()}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-[#4A2C2A]">
          Admin access only.
        </CardFooter>
      </Card>
    </div>
  );
}