import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
    { rel: "icon", url: "icons/icon-128x128.png" },
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
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
        <header className="bg-[#00502f] text-white w-full py-4 px-6 text-center shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Hawai‘i Health Workforce Summit 2025
          </h2>
        </header>

        <main className="flex-1 w-full pb-16">{children}</main>

        {/* Persistent bottom nav */}
        <footer className="fixed bottom-0 left-0 right-0 bg-[#00502f] text-white flex justify-around items-center h-16 shadow-inner z-50">
          <Link href="/" className="flex flex-col items-center text-sm hover:text-gray-200">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <Link href="/agenda" className="flex flex-col items-center text-sm hover:text-gray-200">
            <span>📅</span>
            <span>Agenda</span>
          </Link>
          <Link href="/poster" className="flex flex-col items-center text-sm hover:text-gray-200">
            <span>🗳️</span>
            <span>Vote</span>
          </Link>
        </footer>
      </body>
    </html>
  );
}
