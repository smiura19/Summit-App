'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UsersRound } from 'lucide-react';
import SessionList, { Session } from '../components/SessionList';

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetch('/data/sessions.json')
      .then((res) => res.json())
      .then(setSessions);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-2xl flex flex-col space-y-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00502f]">
            Welcome to Hawai‘i Health Workforce Summit 2025!
          </h1>
        </header>

        {/* Featured Speakers */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-[#00502f]">
            Featured Speakers
          </h3>
          <div>
            <SessionList sessions={sessions} />
          </div>
          <div className ="p-4 flex items-center justify-center"> 
            <ul className="space-y-4">
              <li>
                <Link
                  href="/agenda"
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

        {/* Agenda Button */}


        {/* Poster Contest */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Poster Contest
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Participate in live voting!
            </p>
            <a
              href="/poster"
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
          <h1 className="text-3xl font-bold mb-6 text-center">
            Special thanks to our...
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
            <a
              href="/exhibitors"
              className="flex flex-col items-center justify-center w-full p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-blue-50 text-center"
            >
              <UsersRound size={40} className="text-[#88E788] mb-3" />
              <span className="text-lg font-semibold text-gray-800">
                Exhibitors
              </span>
            </a>

            <a
              href="/sponsors"
              className="flex flex-col items-center justify-center w-full p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-blue-50 text-center"
            >
              <UsersRound size={40} className="text-[#88E788] mb-3" />
              <span className="text-lg font-semibold text-gray-800">
                Sponsors
              </span>
            </a>

            <a
              href="/committee"
              className="flex flex-col items-center justify-center w-full p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-blue-50 text-center"
            >
              <UsersRound size={40} className="text-[#88E788] mb-3" />
              <span className="text-lg font-semibold text-gray-800">
                Planning Committee
              </span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
