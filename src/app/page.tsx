'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UsersRound } from 'lucide-react';
import InstallModal from '../components/InstallModal';
import { Session } from '../components/types';


export default function Home() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

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

  useEffect(() => {
    fetch('/data/sessions.json')
      .then((res) => res.json())
      .then(setSessions);
  }, []);







  return (
    <main className="flex-1 w-full">
      <div className="fixed font-sans bg-white text-[#171717] z-50 h-14 w-full shadow-md">
        <header className="bg-[#00502f] text-white w-full py-4 px-6 text-center shadow-md z-50">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Hawai‘i Health Workforce Summit 2025
          </h2>
        </header>
      </div>




      <div id="container" className="min-h-screen  flex flex-col items-center px-4 py-8 pt-20">
        <div className="w-full max-w-2xl flex flex-col space-y-10">
        {/* Header */}
        <header className="p-5 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00502f]">
            Aloha and welcome to Hawai‘i Health Workforce Summit 2025!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            We are honored to have you join us for this special gathering,

where we come together to explore, learn, and grow as a

collective workforce. This summit represents more than just a

meeting of minds; it is a celebration of our shared dedication to

progress, collaboration, and the pursuit of excellence.

          </p>

        </header>
      

      <div className="p-5">

        {/* Download the app */}
        <div className="pb-5">
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Download the Hawaii Summit app!
                </h5>
              <p className="mb-3 font-normal text-gray-700">
                This website can be installed on your device to provide a better user experience.
              </p>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={isStandalone}
                >
                  {isStandalone ? 'Thanks for installing the app!' : 'Install the app'}
                </button>
                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-40 z-50">
                    <InstallModal onClose={() => setIsOpen(false)} />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
 

        {/* Livestream by Tracks */}
        
                {/* Agenda Section */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Summit Agenda
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              The 2025 Hawai‘i Health Workforce Summit features keynote speakers, 
              concurrent sessions, and networking opportunities across multiple tracks. 
              Explore the full schedule to plan your day and make the most of the Summit.
            </p>
            <div className="flex items-center justify-center">
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
            </div>
          </div>
        </section>

        {/* Livestream by Tracks */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm space-y-4 mb-6">
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Summit Sessions by Track
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              Can’t join in person? Each track is streamed live so you can follow 
              along with the discussions most relevant to you:
            </p>

            <div className="space-y-3">
              <Link
                href="https://www.youtube.com/@ahechawaii8590/streams"
                target="_blank"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View All Streams
              </Link>

              <Link
                href="https://www.youtube.com/watch?v=icxz7jwyCOQ"
                target="_blank"
                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Keynote & Substance Use – MEB 102
              </Link>

              <Link
                href="https://www.youtube.com/watch?v=dpyl1LVD4W0"
                target="_blank"
                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Mental Health – MEB 301
              </Link>

              <Link
                href="https://www.youtube.com/watch?v=7yjzVQ2tTwA"
                target="_blank"
                className="block w-full text-center px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Healthcare Practice – MEB 304
              </Link>

              <Link
                href="https://www.youtube.com/watch?v=JbZLu6wcxCI"
                target="_blank"
                className="block w-full text-center px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              >
                Public Health / Geriatrics – MEB 315
              </Link>

              <Link
                href="https://www.youtube.com/watch?v=b80HPJPlbYs"
                target="_blank"
                className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                MEB 314
              </Link>
            </div>
          </div>
        </section>





        


        {/* Featured Speakers */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-[#00502f]">
            Featured Speakers
          </h3>
          <div>
          <ul className="space-y-4">
            <li>
              <div
                  className="w-full block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition text-left"
                >
                  <h2 className="text-lg font-semibold">
                    Keynote Speaker: Dr. Donald Warne (Oglala Lakota), MD, MPH
                  </h2>
                  <p className="text-sm text-gray-500">
                    8:30 AM - 10:00 AM
                  </p>
                  <p className="mt-2 text-gray-700">
                    Donald Warne, MD, MPH, is the Co-Director of the Johns Hopkins Center for Indigenous
                    Health. He is an acclaimed physician, one of the world’s preeminent scholars in Indigenous
                    health, health education, policy and equity as well as a member of the Oglala Lakota tribe
                    from Pine Ridge, South Dakota. Dr. Warne also serves as Johns Hopkins University’s new
                    Provost Fellow for Indigenous Health Policy.
                  </p>
                  <p className="mt-2 text-gray-700">
                  Warne comes from a long line of traditional healers and medicine men, and is a celebrated
                  researcher of chronic health inequities. He is also an educational leader who created the
                  first Indigenous health-focused Master of Public Health and PhD programs in the U.S. or
                  Canada at the North Dakota State University and the University of North Dakota,
                  respectively. Warne previously served at the University of North Dakota as professor of
                  Family and Community Medicine and associate dean of diversity, equity, and inclusion, as
                  well as director of the Indians Into Medicine and Public Health programs at the University
                  of North Dakota School of Medicine and Health Sciences.
                  </p>                  

                  <p className="mt-2 text-gray-700">
                  Warne received a Bachelor of Science degree from Arizona State University, Doctor of
                  Medicine degree from Stanford University’s School of Medicine, and a Master of Public
                  Health degree from the Harvard T.H. Chan School of Public Health.
                  </p>
                </div>
            </li>
            <li>

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
        {/* Poster Contest */}
<section className="bg-gradient-to-r from-green-700 to-green-900 text-white rounded-lg shadow-lg mb-8">
  <div className="p-6 text-center space-y-4">
    <h5 className="text-3xl font-bold">
      2025 Poster Competition
    </h5>
    <p className="text-lg font-medium">
      Join us in celebrating research and innovation at the Hawai‘i Health Workforce Summit!
    </p>
    <p className="text-sm text-green-100 max-w-xl mx-auto">
      Poster viewings and ratings are being held in the <span className="font-semibold">Library, 1st floor</span>.
    </p>

    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <div className="bg-white text-green-900 rounded-lg px-4 py-2 shadow-md">
        <span className="block font-bold text-lg">1:30 – 2:00 PM</span>
      </div>
      <div className="bg-white text-green-900 rounded-lg px-4 py-2 shadow-md">
        <span className="block font-bold text-lg">3:15 – 3:45 PM</span>
      </div>
    </div>

    <p className="text-sm text-green-100 max-w-xl mx-auto">
      Cast your vote for Scientific Merit, Appearance, and Presentation Explanation. 
      Your feedback helps recognize excellence!
    </p>

    <div className="pt-4">
      <a
        href="/main/poster"
        className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold bg-yellow-400 text-green-900 rounded-xl shadow hover:bg-yellow-300 transition"
      >
        Vote in the Poster Competition
        <svg
          className="rtl:rotate-180 w-4 h-4 ml-2"
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
