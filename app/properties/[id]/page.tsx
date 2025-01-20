"use client";

import { PropertyDetail } from "@/components/property-detail";
import { LandingPageLayout } from "@/components/landing-page-layout";

export default function PublicPropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const propertyId = parseInt(params.id, 10);

  return (
    <LandingPageLayout>
      <div className="py-12">
        <PropertyDetail propertyId={propertyId} />
      </div>
    </LandingPageLayout>
  );
}
