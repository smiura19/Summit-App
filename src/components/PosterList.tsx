'use client';

import { useState } from 'react';
import Link from 'next/link';


type Poster = {
  id: string;
  title: string;
  category: string;
};


export default function PosterList({ posters }: { posters: Poster[] }) {

    const postersByCategory: Record<string, Poster[]> = {};

  for (const poster of posters) {
    if (!postersByCategory[poster.category]) {
      postersByCategory[poster.category] = [];
    }
    postersByCategory[poster.category].push(poster);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Posters</h1>
      {Object.entries(postersByCategory).map(([category, posters]) => (
        <section key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <ul className="space-y-2">
            {posters.map((poster) => (
              <li key={poster.id} className="p-3 border rounded bg-gray-50">
                {poster.title}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}