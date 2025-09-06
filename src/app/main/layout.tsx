'use client';

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="min-h-screen flex flex-col justify-start items-start font-sans bg-white text-[#171717]">
        <header className="fixed flex justify-start text-start bg-[#00502f] text-white w-full py-4 px-6 shadow-md z-40">
            <button
              onClick={() => history.back()}
            >
              <svg
              className="rtl:rotate-180 w-5.5 h-5.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              >
              <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0l4-4M1 5l4 4"
              />
              </svg>
            </button>
        </header>

        <main className="flex-1 w-full pt-16 pb-16">{children}</main>

      </div>
  );
}
