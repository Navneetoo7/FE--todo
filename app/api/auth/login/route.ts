import { NextResponse } from "next/server";
import api from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await api.post("/auth/login", body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Login failed" },
      { status: error.response?.status || 500 }
    );
  }
}