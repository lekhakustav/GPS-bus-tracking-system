import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { TranslationProvider } from "@/components/TranslationContext";
import "leaflet/dist/leaflet.css";
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

export const metadata: Metadata = {
  title: "Mayur GPS Platform | Free GPS & Visibility For Mayur Buses",
  description: "Get the GPS hardware and bus tracking system worth Rs. 5,000 for free. Help passengers see your bus live in our app and increase passenger traffic with zero upfront costs.",
  keywords: "Mayur Yatayat, GPS Tracking, Nepal Bus GPS, Kathmandu Banepa Bus GPS, Bus Owners GPS System",
  authors: [{ name: "Mayur GPS Platform Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1A2E",
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
      className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text font-sans">
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
