
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { email, password, isSignUp })
    // Handle authentication logic here
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-product bg-[#EDEBFF]">
      <Card className="w-full max-w-md shadow-2xl bg-white rounded-lg">
        <CardHeader className="text-center pb-6">
          <img 
            src="/lovable-uploads/70d07a7b-2745-48c7-a3ac-550181ac6682.png" 
            alt="WIZORA Logo" 
            className="h-12 mx-auto mb-4" 
          />
          <CardTitle className="text-2xl font-medium text-gray-800">
            {isSignUp ? "Sign Up" : "Sign In"}
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wizora-purple focus:border-transparent"
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wizora-purple focus:border-transparent"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-wizora hover:opacity-90 text-white py-2 rounded-lg font-medium transition-colors"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-wizora-purple hover:text-wizora-purple-light font-medium"
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
