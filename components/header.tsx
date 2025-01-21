"use client";

import { useRouter } from "next/navigation";
import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
    console.log("error", error)
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-secondary text-secondary-foreground border-b shrink-0">
      <h1 className="text-2xl font-bold font-heading">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-secondary-foreground/10"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-secondary-foreground/10"
        >
          <User className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="hover:bg-secondary-foreground/10"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
