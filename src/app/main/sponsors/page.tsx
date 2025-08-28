'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Sponsor = {
  id: string;
  title: string;
  description: string;
  level: string;
};

export default function SponsorPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    fetch('/data/sponsors.json')
      .then((res) => res.json())
      .then(setSponsors);
  }, []);

  const sponsorsByLevel: Record<string, Sponsor[]> = {};
  for (const sponsor of sponsors) {
    if (!sponsorsByLevel[sponsor.level]) {
      sponsorsByLevel[sponsor.level] = [];
    }
    sponsorsByLevel[sponsor.level].push(sponsor);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mahalo to our sponsors!</h1>

      {Object.entries(sponsorsByLevel).map(([level, sponsors]) => (
        <section key={level} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{level}</h2>
          <ul className="space-y-2">
            {sponsors.map((sponsor) => {
              return (
                <li key={sponsor.id}>
                  <div
                    className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    <h2 className="text-lg font-semibold">{sponsor.title}</h2>
                    <p className="text-sm text-gray-500">{sponsor.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}