import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col justify-start font-sans bg-white text-[#171717] dark:bg-[#0a0a0a] dark:text-[#ededed]">
        <header className="bg-[#00502f] text-white w-full py-4 px-6 text-center shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Hawai‘i Health Workforce Summit 2025
          </h2>
        </header>

        <main className="flex-1 w-full pb-16">{children}</main>

      </body>
    </html>
  );
}
