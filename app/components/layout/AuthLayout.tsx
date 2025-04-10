import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/auth-context";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Todo App</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
