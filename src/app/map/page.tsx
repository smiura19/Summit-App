'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type Map = {
  id: string;
  title: string;
  img: string;
};

export default function MapPage() {
  const [maps, setMaps] = useState<Map[]>([]);

  useEffect(() => {
    fetch('/data/maps.json')
      .then((res) => res.json())
      .then(setMaps);
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Maps</h1>
    <ul className="space-y-4">
      {maps.map((map) => (
        <li key={map.id}>
          <Link
            href={`/map/${map.id}`}
            className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold">{map.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
    </main>
  );
}