"use client";

import { PropertyDetail } from "@/components/property-detail";
import { LandingPageLayout } from "@/components/landing-page-layout";
/* eslint-disable  @typescript-eslint/no-explicit-any */

export default function PublicPropertyDetailPage({
  params,
}: {
  params: any;
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
