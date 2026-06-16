import type { Metadata, Viewport } from "next";
import "./globals.css";

const githubRepositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "GPS-bus-tracking-system";
const faviconPath = process.env.GITHUB_ACTIONS === "true" ? `/${githubRepositoryName}/favicon.ico` : "/favicon.ico";

export const metadata: Metadata = {
  title: "मयुर यातायात GPS प्रस्ताव",
  description: "मयुर यातायातका लागि GPS जडान, यात्रु एप, र व्यवस्थापन रिपोर्ट प्रस्ताव।",
  keywords: "Mayur Yatayat, GPS proposal, Nepal bus GPS, passenger app, bus tracking",
  authors: [{ name: "Mayur GPS Proposal Team" }],
  icons: {
    icon: faviconPath,
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
    <html lang="ne" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text font-sans">{children}</body>
    </html>
  );
}
