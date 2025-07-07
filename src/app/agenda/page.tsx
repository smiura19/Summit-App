'use client';

import { useEffect, useState } from 'react';
import SessionList, { Session } from '../../components/SessionList';

export default function AgendaPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetch('/data/sessions.json')
      .then((res) => res.json())
      .then(setSessions);
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Agenda</h1>
      <SessionList sessions={sessions} />
    </main>
  );
}
