"use client"

import * as React from "react"
import {
  FormProvider,
  useForm as useRhfForm,
  useFormContext,
  Controller,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
  type FieldPath,
  type ControllerRenderProps,
} from "react-hook-form"
import { cn } from "@/lib/utils"

// Form Component with proper type checking
export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  children: React.ReactNode
  className?: string
}) {
  if (!form) {
    throw new Error("Form component requires a form instance")
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        {children}
      </form>
    </FormProvider>
  )
}

// FormField Component
type FormFieldProps<T extends FieldValues> = {
  name: FieldPath<T>
  render: (props: {
    field: ControllerRenderProps<T>
    fieldState: any
    formState: any
  }) => React.ReactNode
}

export function FormField<T extends FieldValues>({
  name,
  render,
}: FormFieldProps<T>) {
  const form = useFormContext<T>()

  if (!form) {
    throw new Error("FormField must be used within a Form component")
  }

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <div className="space-y-2">
          {render({ field, fieldState, formState })}
        </div>
      )}
    />
  )
}

// Other form components remain the same...
export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
FormItem.displayName = "FormItem"

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("block text-sm font-medium leading-none", className)}
    {...props}
  />
))
FormLabel.displayName = "FormLabel"

export const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
))
FormControl.displayName = "FormControl"

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium text-destructive", className)}
    {...props}
  >
    {children}
  </p>
))
FormMessage.displayName = "FormMessage"

export const useForm = useRhfForm