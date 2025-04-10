import axios from "axios";
import {
  CreateTaskDto,
  LoginCredentials,
  SignupData,
  Task,
  User,
} from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
