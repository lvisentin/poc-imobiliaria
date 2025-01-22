"use client";

import { LandingPageLayout } from "@/components/landing-page-layout";
import { PropertyDetail } from "@/components/property-detail";
import { useParams } from "next/navigation";
/* eslint-disable  @typescript-eslint/no-explicit-any */

export default function PublicPropertyDetailPage() {
  const { id } = useParams();
  const propertyId = parseInt(id as any, 10);

  return (
    <LandingPageLayout>
      <div className="py-12">
        <PropertyDetail propertyId={propertyId} />
      </div>
    </LandingPageLayout>
  );
}
