'use client';

import Link from 'next/link';

export type Exhibitor = {
  id: string;
  title: string;
  description: string;
};

export default function ExhibitorList({ exhibitors }: { exhibitors: Exhibitor[] }) {
  return (
    <ul className="space-y-4">
      {exhibitors.map((exhibitor) => (
        <li key={exhibitor.id}>
          <div className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold">{exhibitor.title}</h2>
            <p className="text-sm text-gray-500">{exhibitor.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
