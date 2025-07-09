'use client';

import Link from 'next/link';

export type Sponsor = {
  id: string;
  title: string;
  description: string;
  level: string;
};

export default function SponsorList({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <ul className="space-y-4">
      {sponsors.map((sponsor) => (
        <li key={sponsor.id}>
          <Link
            href={`/agenda/${sponsor.id}`}
            className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold">{sponsor.title}</h2>
            <p className="text-sm text-gray-500">{sponsor.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
