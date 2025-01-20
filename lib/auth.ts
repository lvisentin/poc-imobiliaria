import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function verifyToken(token: string): { userId: number } | null {
  try {
    return verify(token, JWT_SECRET) as { userId: number };
  } catch (error) {
    return null;
  }
}
