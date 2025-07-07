import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
      <header className="w-full max-w-2xl text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00502f]">
          Welcome to Hawai‘i Health Workforce Summit 2025!
        </h1>
      </header>
      <div className="max-w-xl mx-auto mt-8">
        <h3 className="text-xl font-semibold mb-4 text-[#00502f]">Featured Speakers</h3>
        <div className="overflow-x-auto whitespace-nowrap space-x-4 flex pb-2">
          <div className="inline-block bg-white rounded-xl shadow p-4 min-w-[280px]">
            <h4 className="text-lg font-bold">Keynote: Health in 2030</h4>
            <p className="text-sm text-gray-600">Dr. Lani Leong, 9:00am – Main Hall</p>
          </div>
          <div className="inline-block bg-white rounded-xl shadow p-4 min-w-[280px]">
            <h4 className="text-lg font-bold">AI in Rural Healthcare</h4>
            <p className="text-sm text-gray-600">Panel – 10:30am, Room 202</p>
          </div>
          {/* More slides... */}
        </div>
      </div>

      <nav className="w-full max-w-md">
        <ul className="space-y-4">
          <li>
            <Link
              href="/agenda"
              className="block w-full bg-[#00502f] text-white text-lg py-3 px-5 rounded-xl shadow hover:bg-[#003f24] transition"
            >
              Agenda
            </Link>
          </li>
          <li>
            <Link
              href="/exhibitors"
              className="block w-full bg-[#00502f] text-white text-lg py-3 px-5 rounded-xl shadow hover:bg-[#003f24] transition"
            >
              Exhibitors
            </Link>
          </li>
          <li>
            <Link
              href="/sponsors"
              className="block w-full bg-[#00502f] text-white text-lg py-3 px-5 rounded-xl shadow hover:bg-[#003f24] transition"
            >
              Sponsors
            </Link>
          </li>
          <li>
            <Link
              href="/committee"
              className="block w-full bg-[#00502f] text-white text-lg py-3 px-5 rounded-xl shadow hover:bg-[#003f24] transition"
            >
              Planning Committee
            </Link>
          </li>
          <li>
            <Link
              href="/poster"
              className="block w-full bg-[#00502f] text-white text-lg py-3 px-5 rounded-xl shadow hover:bg-[#003f24] transition"
            >
              Vote for a Poster!
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
