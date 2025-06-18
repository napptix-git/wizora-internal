import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { supabase } from "@/lib/supabaseClient";

  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";

  const Login = () => {
    // const [isSignUp, setIsSignUp] = useState(false);
    const [isSignUp] = useState(false); // Sign up disabled
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

  // ✅ Sync Google user after redirect only if ?from=google
  useEffect(() => {
    const checkGoogleSession = async () => {
      const fromGoogle = new URLSearchParams(window.location.search).get("from") === "google";
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (fromGoogle && user) {
        try {
            await axios.post(`https://wizora-backend.onrender.com/api/users/sync-user`, {
            auth_id: user.id,
            email: user.email,
            });
          console.log("✅ Google user synced to DB");
        } catch (err) {
          console.error("❌ Failed to sync Google user:", err);
        } finally {
          navigate("/dashboard");
        }
      }
    };

    checkGoogleSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({ email, password });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) {
        alert(result.error.message);
        return;
      }

      const user = result.data.user;
      if (!user) {
        alert("Authentication failed.");
        return;
      }

      await axios.post(`https://wizora-backend.onrender.com/api/users/sync-user`, {
        auth_id: user.id,
        email,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard?from=google`,
      queryParams: {
        prompt: "select_account", // ✅ Forces Google to show the account chooser
      },
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
    alert("Google login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-product bg-[#EDEBFF]">
      <Card className="w-full max-w-md shadow-2xl bg-white rounded-lg">
        <CardHeader className="text-center pb-6">
          <img
            src="/lovable-uploads/1.png"
            alt="Logo"
            className="h-12 mx-auto mb-4 object-contain scale-[1.8] mt-4"
            style={{ transformOrigin: "center" }}
          />
          <CardTitle className="text-2xl font-medium text-gray-800">
            {/* {isSignUp ? "Sign Up" : "Sign In"} */}
            Sign In
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

              <Button
                type="submit"
                className="w-full bg-gradient-wizora text-white py-2 rounded-lg"
              >
                {/* {isSignUp ? "Sign Up" : "Sign In"} */}
                Sign In
              </Button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg"
            >
              Continue with Google
            </Button>

            <div className="mt-6 text-center">
              {/* <p className="text-sm text-gray-600"> */}
                {/* {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-wizora-purple font-medium"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button> */}
                {/* Only existing users can sign in.
              </p> */}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  export default Login;
