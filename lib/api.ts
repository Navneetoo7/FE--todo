import axios from "axios";

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/v1",
});

// Client-side interceptors
if (typeof window !== "undefined") {
  // Request interceptor
  clientApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor
  clientApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  );
}

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await clientApi.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
}) => {
  const response = await clientApi.post("/auth/signup", userData);
  console.log(response.data)
  return response.data;
};

export const getTasks = async () => {
  const response = await clientApi.get("/tasks", {
    params: { page: 1, limit: 100 } 
  })
  return response.data
}

export const createTask = async (taskData: CreateTaskDto) => {
  const response = await clientApi.post("/tasks", taskData)
  return response.data
}

export const updateTaskStatus = async (taskId: string, statusData: UpdateTaskStatusDto) => {
  const response = await clientApi.patch(`/tasks/${taskId}/status`, statusData)
  return response.data
}

export const deleteTask = async (taskId: string) => {
  const response = await clientApi.delete(`/tasks/${taskId}`)
  return response.data
}


export default clientApi;