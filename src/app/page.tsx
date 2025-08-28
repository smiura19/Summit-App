'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UsersRound } from 'lucide-react';
import SessionList, { Session } from '../components/SessionList';

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    fetch('/data/sessions.json')
      .then((res) => res.json())
      .then(setSessions);
  }, []);

  useEffect(() => {
    const checkStandalone = () => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches;
      console.log("Standalone mode?", standalone);
      setIsStandalone(standalone);
    };

    checkStandalone();

    // listen for display-mode changes (minimize/maximize, etc.)
    const mm = window.matchMedia("(display-mode: standalone)");
    mm.addEventListener("change", checkStandalone);

    return () => mm.removeEventListener("change", checkStandalone);
  }, []);





  return (
    <main>
      <div className="font-sans bg-white text-[#171717] dark:bg-[#0a0a0a] dark:text-[#ededed]">
        <header className="bg-[#00502f] text-white w-full py-4 px-6 text-center shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Hawai‘i Health Workforce Summit 2025
          </h2>
        </header>
      </div>




      <div className="min-h-screen  flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl flex flex-col space-y-10">
        {/* Header */}
        <header className="p-5 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00502f]">
            Welcome to Hawai‘i Health Workforce Summit 2025!
          </h1>
        </header>

        <div className={isStandalone ? "block p-6 bg-green-200" : "hidden"}>
          <p>This shows in PWA mode ✅</p>
        </div>

        <div className={!isStandalone ? "block p-6 bg-blue-200" : "hidden"}>
          <p>This shows in browser 🌐</p>
        </div>
      

      <div className="p-5">

        {/* Download the app */}
        <div className="pb-5">
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Download the Hawaii Summit app!
                </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                This website can be installed on your device to provide a better user experience.
              </p>
              <div className="flex items-center justify-center">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={isStandalone}
                >
                  {isStandalone ? 'Thanks for installing the app!' : 'Install the app'}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Featured Speakers */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-[#00502f]">
            Featured Speakers
          </h3>
          <div>
            <ul className="space-y-4">
              <li key="s1">
                <Link
                  href={`/main/agenda/s1`}
                  className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                >
                  <h2 className="text-lg font-semibold">
                    Dr. Donald Warne-Healed Healers Heal
                  </h2>
                  <p className="text-sm text-gray-500">
                    8:30 AM - 10:00 AM
                  </p>
                </Link>
              </li>
              <li key="s2">
                <Link
                  href={`/main/agenda/s2`}
                  className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                >
                  <h2 className="text-lg font-semibold">
                    Want to Retire? Want to Take Over a Practice? Practice Matchmaking 101
                  </h2>
                  <p className="text-sm text-gray-500">
                    10:30 AM - 11:30 AM
                  </p>
                </Link>
              </li>
              <li key="s3">
                <Link
                  href={`/main/agenda/s3`}
                  className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                >
                  <h2 className="text-lg font-semibold">
                    Hawaii Oral Health Coalition - Impact Report
                  </h2>
                  <p className="text-sm text-gray-500">
                    10:30 AM - 11:30 PM
                  </p>
                </Link>
              </li>
            </ul>
          </div>
          <div className ="p-4 flex items-center justify-center"> 
            <ul className="space-y-4">
              <li>
                <Link
                  href="/main/agenda"
                  className="inline-flex items-center bg-[#00502f] text-white text-lg py-3 px-5 rounded-xl shadow hover:bg-[#003f24] transition"
                >
                  See full agenda
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Poster Contest */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Poster Contest
              </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Participate in live voting!
            </p>
            <a
              href="/main/poster"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#00502f] rounded-lg shadow hover:bg-[#003f24] transition"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Special Thanks */}
        <section>
          <div className = "p-4">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Special thanks to our...
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
            <a
              href="/main/exhibitors"
              className="flex flex-col items-center justify-center w-full p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-blue-50 text-center"
            >
              <UsersRound size={40} className="text-[#88E788] mb-3" />
              <span className="text-lg font-semibold text-gray-800">
                Exhibitors
              </span>
            </a>

            <a
              href="/main/sponsors"
              className="flex flex-col items-center justify-center w-full p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-blue-50 text-center"
            >
              <UsersRound size={40} className="text-[#88E788] mb-3" />
              <span className="text-lg font-semibold text-gray-800">
                Sponsors
              </span>
            </a>

            <a
              href="/main/committee"
              className="flex flex-col items-center justify-center w-full p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-blue-50 text-center"
            >
              <UsersRound size={40} className="text-[#88E788] mb-3" />
              <span className="text-lg font-semibold text-gray-800">
                Planning Committee
              </span>
            </a>
          </div>
          </div>
        </section>
      </div>
      </div>
      </div>
    </main>
  );
}
