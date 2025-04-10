import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SignupForm } from "@/components/auth/SignupForm"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
          <p className="text-gray-600 mt-2">Create a new account</p>
        </div>

        <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
          <CardHeader className="space-y-1 pb-6 pt-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Create an account</CardTitle>
          </CardHeader>
          <CardContent className="pb-8 px-8">
            <SignupForm />
            <div className="mt-6 text-center text-sm">
              <div className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-xs text-gray-500">
          By signing up, you agree to our
          <a href="/terms" className="text-purple-600 hover:underline ml-1">
            Terms of Service
          </a>{" "}
          and
          <a href="/privacy" className="text-purple-600 hover:underline ml-1">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  )
}
