'use client';

import { useEffect, useState } from 'react';
import CommitteeList, { Committee } from '../../components/CommitteeList';

export default function CommitteePage() {
  const [committees, setCommittees] = useState<Committee[]>([]);

  useEffect(() => {
    fetch('/data/committees.json')
      .then((res) => res.json())
      .then(setCommittees);
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exhibitors</h1>
      <CommitteeList committees={committees} />
    </main>
  );
}