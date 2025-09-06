'use client';

import { useEffect, useState } from 'react';
import { Session } from '../../../components/types';
import SessionDetailsModal from '../../../components/SessionDetailsModal';

export default function AgendaPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    fetch('/data/sessions.json')
      .then((res) => res.json())
      .then(setSessions);
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Agenda</h1>
      <div className="min-h-screen flex flex-col items-start">
        <ul className="w-full space-y-4">
          {sessions.map((session) => (
        <li key={session.id}>
          <button
            onClick={() => setSelectedSession(session)}
            className="w-full block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition text-left"
          >
            <h2 className="text-lg font-semibold">{session.title}</h2>
            <p className="text-sm text-gray-500">{session.time}</p>
          </button>
        </li>
          ))}
        </ul>
      </div>

      {/* Render modal only when one is selected */}
      {selectedSession && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <SessionDetailsModal
            session={selectedSession}
            onClose={() => setSelectedSession(null)}
          />
        </div>
      )}
    </main>
  );
}
