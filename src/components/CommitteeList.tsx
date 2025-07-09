'use client';

import Link from 'next/link';

export type Committee = {
  id: string;
  name: string;
  position: string;
  affiliation: string;
};

export default function CommitteeList({ committees }: { committees: Committee[] }) {
  return (
    <ul className="space-y-4">
      {committees.map((committee) => (
        <li key={committee.id}>
          <Link
            href={`/agenda/${committee.id}`}
            className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold">{committee.name}</h2>
            <p className="text-sm text-gray-500">{committee.position}</p>
            <p>{committee.affiliation}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
