import { LandingPageLayout } from "@/components/landing-page-layout";
import { PropertyFilters } from "@/components/property-filters";
import { PropertyList } from "@/components/property-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties | Real Estate App",
  description: "Browse our selection of properties",
};

export default function PropertiesPage() {
  return (
    <LandingPageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">Properties</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PropertyFilters />
          </div>
          <div className="lg:col-span-3">
            <PropertyList />
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
}
