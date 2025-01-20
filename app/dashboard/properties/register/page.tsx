import { DashboardLayout } from "@/components/dashboard-layout";
import { PropertyForm } from "@/components/property-form";

export default function RegisterPropertyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Register New Property</h2>
        <PropertyForm />
      </div>
    </DashboardLayout>
  );
}
