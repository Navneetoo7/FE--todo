import api from "./api";
import { CreateTaskDto, Task } from "../types";

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await api.get("/tasks");
    return response.data;
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    const response = await api.post("/tasks", task);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
