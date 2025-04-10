"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { TaskPriority } from "@/app/enums"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FileText, Flag } from 'lucide-react'
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  deadline: z.date().min(new Date(), "Deadline must be in the future"),
  priority: z.nativeEnum(TaskPriority),
})

export function CreateTaskForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>
  isLoading: boolean
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: new Date(),
      priority: TaskPriority.MEDIUM,
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values)
  }

  return (
    <Form form={form} onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Title</FormLabel>
              <FormControl>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Task title"
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
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Task description"
                  className="min-h-[100px] bg-gray-50 border-gray-200 focus-visible:ring-purple-500 focus-visible:ring-offset-0 text-gray-900"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-medium text-gray-700">Deadline</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Button
                        type="button" // Important: prevent form submission
                        variant="outline"
                        className="pl-10 h-11 w-full justify-start text-left font-normal bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900"
                        onClick={(e) => {
                          e.preventDefault() // Prevent form submission
                          e.stopPropagation() // Stop event propagation
                        }}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </div>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="border rounded-md bg-white"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Priority</FormLabel>
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10 h-11 bg-gray-50 border-gray-200 text-gray-900 font-normal focus:ring-purple-500 focus:ring-offset-0">
                      <SelectValue placeholder="Select priority" className="text-gray-900" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value={TaskPriority.LOW} className="text-gray-900 hover:bg-gray-100">
                      Low
                    </SelectItem>
                    <SelectItem value={TaskPriority.MEDIUM} className="text-gray-900 hover:bg-gray-100">
                      Medium
                    </SelectItem>
                    <SelectItem value={TaskPriority.HIGH} className="text-gray-900 hover:bg-gray-100">
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </Button>
      </div>
    </Form>
  )
}
