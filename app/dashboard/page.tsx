import { DashboardLayout } from "@/components/dashboard-layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Your Dashboard</h2>
        <p className="text-muted-foreground">
          You have successfully logged in!
        </p>
        {/* Add more dashboard content here */}
      </div>
    </DashboardLayout>
  );
}
