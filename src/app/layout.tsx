import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { House, ClipboardClock, Map, Vote } from 'lucide-react';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hawai‘i Health Workforce Summit 2025",
  description: "Progressive Web App for the Hawai‘i Health Workforce Summit 2025",
  manifest: "/manifest.json",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  icons: [
    { rel: "icon", url: "icons/jabsom-favicon.png" },
    { rel: "apple-touch-icon", url: "icons/jabsom-favicon.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#171717] dark:bg-[#0a0a0a] dark:text-[#ededed]">


        <main className="flex-1 w-full pb-16">{children}</main>

        {/* Persistent bottom nav */}
        <footer className="fixed bottom-0 left-0 right-0 bg-[#00502f] text-white flex justify-around items-center h-16 shadow-inner z-50 p-10">
          <Link href="/" className="flex flex-col items-center text-sm hover:text-gray-200">
            <House color="white" size={20} className="mb-1" />
            <span>Home</span>
          </Link>
          <Link href="/main/agenda" className="flex flex-col items-center text-sm hover:text-gray-200">
            <ClipboardClock color="white" size={20} className="mb-1" />
            <span>Agenda</span>
          </Link>
          <Link href="/main/map" className="flex flex-col items-center text-sm hover:text-gray-200">
            <Map color="white" size={20} className="mb-1" />
            <span>Maps</span>
          </Link>
          <Link href="/main/poster" className="flex flex-col items-center text-sm hover:text-gray-200">
            <Vote color="white" size={20} className="mb-1" />
            <span>Vote</span>
          </Link>
        </footer>
      </body>
    </html>
  );
}
