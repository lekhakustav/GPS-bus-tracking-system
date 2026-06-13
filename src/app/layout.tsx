import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mayur Yatayat GPS Proposal",
  description: "A free government-ready GPS setup and passenger app proposal for Mayur Yatayat.",
  keywords: "Mayur Yatayat, GPS proposal, Nepal bus GPS, passenger app, bus tracking",
  authors: [{ name: "Mayur GPS Proposal Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text font-sans">{children}</body>
    </html>
  );
}
