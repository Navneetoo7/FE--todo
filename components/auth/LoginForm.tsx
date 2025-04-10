"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/utils/validation"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { loginUser } from "@/lib/api"
import { Mail, Lock, Loader2 } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true)
      const { token } = await loginUser(values)
      localStorage.setItem("token", token)
      router.push("/dashboard")
      toast({
        title: "Success",
        description: "Logged in successfully!",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-4">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="email@example.com"
                    type="email"
                    autoComplete="email"
                    className="pl-10 h-11 bg-gray-50 border-gray-200 focus-visible:ring-purple-500 focus-visible:ring-offset-0 text-gray-900"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                <a href="/auth/forgot-password" className="text-xs font-medium text-purple-600 hover:text-purple-800">
                  Forgot password?
                </a>
              </div>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    className="pl-10 h-11 bg-gray-50 border-gray-200 focus-visible:ring-purple-500 focus-visible:ring-offset-0 text-gray-900"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>
      </div>
    </Form>
  )
}
