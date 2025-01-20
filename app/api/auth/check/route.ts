import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  return NextResponse.json({ isAuthenticated: true });
}
