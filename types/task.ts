import { TaskPriority, TaskStatus } from "@/app/enums";

export interface Task {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    status: TaskStatus;
    priority: TaskPriority;
  }
  
  export interface CreateTaskDto {
    title: string;
    description: string;
    deadline: Date;
    priority: TaskPriority;
  }
  
  export interface UpdateTaskStatusDto {
    status: TaskStatus;
  }