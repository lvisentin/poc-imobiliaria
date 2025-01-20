import { DashboardLayout } from "@/components/dashboard-layout";
import { PropertyList } from "@/components/property-list";

export default function PropertiesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Registered Properties</h2>
        <PropertyList />
      </div>
    </DashboardLayout>
  );
}
