"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signupSchema } from "@/utils/validation"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { registerUser } from "@/lib/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gender } from "@/app/enums"
import { User, Mail, Phone, Lock, Loader2 } from "lucide-react"

export function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: Gender.MALE,
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values:any) => {
    try {
      setIsLoading(true)
      await registerUser(values)
      toast({
        title: "Success",
        description: "Account created successfully!",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Signup failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="John"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Doe"
                      className="pl-10 h-11 bg-gray-50 border-gray-200 focus-visible:ring-purple-500 focus-visible:ring-offset-0 text-gray-900"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="+1234567890"
                    type="tel"
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Gender</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10 h-11 bg-gray-50 border-gray-200 text-gray-900 font-normal focus:ring-purple-500 focus:ring-offset-0">
                      <SelectValue placeholder="Select gender" className="text-gray-900" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-gray-200">
                    {Object.entries(Gender).map(([key, value]) => (
                      <SelectItem key={value} value={value} className="text-gray-900 hover:bg-gray-100">
                        {key.charAt(0) + key.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
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
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
      </div>
    </Form>
  )
}
