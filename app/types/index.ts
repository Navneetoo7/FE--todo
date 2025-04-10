export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: Gender;
}
