'use client';

import { useEffect, useState } from 'react';
import ExhibitorList, { Exhibitor } from '../../components/ExhibitorList';

export default function ExhibitorPage() {
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);

  useEffect(() => {
    fetch('/data/exhibitors.json')
      .then((res) => res.json())
      .then(setExhibitors);
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exhibitors</h1>
      <ExhibitorList exhibitors={exhibitors} />
    </main>
  );
}