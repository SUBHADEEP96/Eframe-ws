import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://eframe.in",
  ),
  title: {
    default: "Eframe | Learning, Immersive & Digital Solutions",
    template: "%s | Eframe",
  },
  description:
    "Enterprise learning, immersive, creative, AI-enabled and digital solutions from Eframe.",
  openGraph: {
    type: "website",
    siteName: "Eframe",
    title: "Eframe | Ideas that move business forward",
    description:
      "Enterprise learning, immersive, creative and digital solutions.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
