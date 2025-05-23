
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { email, password, isSignUp })
    // Handle authentication logic here
  }

  return (
    <div className="min-h-screen bg-wizora-background flex items-center justify-center p-4 font-product">
      <Card className="w-full max-w-md shadow-2xl bg-white">
        <CardHeader className="text-center pb-6">
          <h1 className="text-3xl font-bold bg-gradient-wizora bg-clip-text text-transparent font-gulfs mb-4">
            WIZORA
          </h1>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isSignUp ? "Sign Up" : "Log In"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-wizora hover:opacity-90 text-white py-2 rounded-lg font-medium transition-colors"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
