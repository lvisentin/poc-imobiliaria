import { LandingPageLayout } from "@/components/landing-page-layout";
import { PropertyShowcase } from "@/components/property-showcase";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

export default function LandingPage() {
  return (
    <LandingPageLayout>
      <HeroSection />
      <PropertyShowcase />
      <AboutSection />
      <ContactSection />
    </LandingPageLayout>
  );
}
