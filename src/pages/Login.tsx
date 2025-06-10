import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { supabase } from "@/lib/supabaseClient"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let result
      if (isSignUp) {
        result = await supabase.auth.signUp({ email, password })
      } else {
        result = await supabase.auth.signInWithPassword({ email, password })
      }

      if (result.error) {
        alert(result.error.message)
        return
      }

      const user = result.data.user
      if (!user) {
        alert("Authentication failed.")
        return
      }

      // Call Express backend to sync user to custom users table
      await axios.post("http://localhost:3000/api/users/sync-user", {
        auth_id: user.id,
        email,
      })

      // Navigate to dashboard
      navigate("/dashboard")
    } catch (err) {
      console.error("Login error:", err)
      alert("Something went wrong.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-product bg-[#EDEBFF]">
      <Card className="w-full max-w-md shadow-2xl bg-white rounded-lg">
        <CardHeader className="text-center pb-6">
          <img
            src="/lovable-uploads/70d07a7b-2745-48c7-a3ac-550181ac6682.png"
            alt="Logo"
            className="h-12 mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-medium text-gray-800">
            {isSignUp ? "Sign Up" : "Sign In"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-wizora text-white py-2 rounded-lg">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-wizora-purple font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
