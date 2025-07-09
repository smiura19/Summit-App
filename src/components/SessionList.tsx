'use client';

import Link from 'next/link';

export type Session = {
  id: string;
  title: string;
  time: string;
  speaker: string;
  description: string;
};

export default function SessionList({ sessions }: { sessions: Session[] }) {
  return (
    <ul className="space-y-4">
      {sessions.map((session) => (
        <li key={session.id}>
          <Link
            href={`/agenda/${session.id}`}
            className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold">{session.title}</h2>
            <p className="text-sm text-gray-500">{session.time}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
