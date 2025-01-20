import { Header } from "./landing-page-header";
import { Footer } from "./landing-page-footer";

export function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
