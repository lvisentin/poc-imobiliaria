"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import { DashboardSidebar } from "./sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        if (!res.ok) {
          router.push("/login");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-gray-900" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <SidebarInset className="flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
