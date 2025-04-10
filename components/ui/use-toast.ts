import { toast } from "sonner"

export function useToast() {
  return {
    toast: (options: any) => {
      if (options.variant === "destructive") {
        return toast.error(options.title, { description: options.description })
      }
      return toast(options.title, { description: options.description })
    }
  }
}