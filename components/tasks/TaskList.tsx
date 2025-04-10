"use client"

import { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { deleteTask, updateTaskStatus } from "@/lib/api"
import { useRouter } from "next/navigation"
import { TaskStatus, TaskPriority } from "@/enums"

export function TaskList({ tasks }: { tasks: Task[] }) {
  const { toast } = useToast()
  const router = useRouter()

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, { status: newStatus })
      toast({
        title: "Success",
        description: "Task status updated successfully",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId)
      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getPriorityVariant(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant={getStatusVariant(task.status)}>
                  {task.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  Due: {format(new Date(task.deadline), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(task.id, TaskStatus.IN_PROGRESS)}
                >
                  Mark In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(task.id, TaskStatus.COMPLETED)}
                >
                  Mark Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusVariant(status: TaskStatus) {
  switch (status) {
    case TaskStatus.PENDING:
      return "secondary"
    case TaskStatus.IN_PROGRESS:
      return "default"
    case TaskStatus.COMPLETED:
      return "success"
    default:
      return "outline"
  }
}

function getPriorityVariant(priority: TaskPriority) {
  switch (priority) {
    case TaskPriority.HIGH:
      return "destructive"
    case TaskPriority.MEDIUM:
      return "warning"
    case TaskPriority.LOW:
      return "default"
    default:
      return "outline"
  }
}