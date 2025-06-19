import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

export function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background backdrop-blur-sm p-4">
            <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-y-5">
            {/* Email field with icon */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground h-5 w-5" />
              </div>
            </div>

            {/* Password field with lock + eye icon */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="pl-10 pr-10"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground h-5 w-5" />
                </div>
                {/* Show Password checkbox using shadcn */}
                <div className="flex items-center space-x-2 mt-1 pl-3">
                  <Checkbox
                    id="show-password"
                    checked={showPassword}
                    onCheckedChange={() => setShowPassword((prev) => !prev)}
                  />
                  <Label htmlFor="show-password" className=" text-xs text-muted-foreground">
                    Show Password
                  </Label>
                </div>
              </div>
            <Button className="w-full mt-4">Login</Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
