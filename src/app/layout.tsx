import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${notoSansDevanagari.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text font-sans">{children}</body>
    </html>
  );
}
