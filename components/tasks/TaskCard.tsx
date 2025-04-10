"use client"

import type { Task } from "@/types/task"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MoreVertical } from "lucide-react"
import { format } from "date-fns"
import { TaskPriority, TaskStatus } from "@/app/enums"

export function TaskCard({
  task,
  onStatusChange,
  onDelete,
}: {
  task: Task
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onDelete: (taskId: string) => void
}) {
  return (
    <div className="border-0 rounded-xl p-6 mb-4 bg-white shadow-lg overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 -mx-6 -mt-6 mb-4"></div>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-xl text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mt-2 mb-4">{task.description}</p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badge
              variant={getPriorityVariant(task.priority)}
              className="px-3 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-900"
            >
              {formatPriority(task.priority)}
            </Badge>

            <Badge
              variant={getStatusVariant(task.status)}
              className="px-3 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-900"
            >
              {formatStatus(task.status)}
            </Badge>

            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(new Date(task.deadline), "MMM dd, yyyy")}</span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onStatusChange(task.id, TaskStatus.PENDING)} className="text-black cursor-pointer">
              Mark as Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusChange(task.id, TaskStatus.UNDER_PROCESS)}
              className="text-black cursor-pointer"
            >
              Mark as Under Process
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(task.id, TaskStatus.COMPLETED)} className=" text-black cursor-pointer">
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => onDelete(task.id)}>
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// Helper functions
function getStatusVariant(status: TaskStatus) {
  switch (status) {
    case TaskStatus.PENDING:
      return "outline"
    case TaskStatus.UNDER_PROCESS:
      return "outline"
    case TaskStatus.COMPLETED:
      return "outline"
    default:
      return "outline"
  }
}

function getPriorityVariant(priority: TaskPriority) {
  switch (priority) {
    case TaskPriority.HIGH:
      return "outline"
    case TaskPriority.MEDIUM:
      return "outline"
    case TaskPriority.LOW:
      return "outline"
    default:
      return "outline"
  }
}

function formatStatus(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.PENDING:
      return "Pending"
    case TaskStatus.UNDER_PROCESS:
      return "Under Process"
    case TaskStatus.COMPLETED:
      return "Completed"
    default:
      return status
  }
}

function formatPriority(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.LOW:
      return "Low"
    case TaskPriority.MEDIUM:
      return "Medium"
    case TaskPriority.HIGH:
      return "High"
    default:
      return priority
  }
}
