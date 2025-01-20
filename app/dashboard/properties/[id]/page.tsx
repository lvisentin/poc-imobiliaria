import { PropertyDetail } from "@/components/property-detail";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function DashboardPropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const propertyId = parseInt(params.id, 10);

  return (
    <DashboardLayout>
      <div className="py-6">
        <h2 className="text-2xl font-bold mb-6">Property Details</h2>
        <PropertyDetail propertyId={propertyId} isAuthenticated={true} />
      </div>
    </DashboardLayout>
  );
}
