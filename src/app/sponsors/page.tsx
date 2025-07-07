'use client';

import { useEffect, useState } from 'react';
import SponsorList, { Sponsor } from '../../components/SponsorList';

export default function SponsorPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    fetch('/data/sponsors.json')
      .then((res) => res.json())
      .then(setSponsors);
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sponsors</h1>
      <SponsorList sponsors={sponsors} />
    </main>
  );
}