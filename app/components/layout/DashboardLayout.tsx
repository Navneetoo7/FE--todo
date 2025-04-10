import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/app/context/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Todo App</h1>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <img
                src={user.profileImage}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-sm font-medium">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
