import { DashboardLayout } from "@/components/dashboard-layout";
import { LeadsTable } from "@/components/leads-table";

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Leads</h2>
        <LeadsTable />
      </div>
    </DashboardLayout>
  );
}
