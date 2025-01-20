import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import "./carousel.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Real Estate App",
  description: "Manage your real estate properties and leads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
