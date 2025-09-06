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

  // Group sessions by time interval
  const groupedByTime: { [key: string]: Session[] } = sessions.reduce(
    (acc, session) => {
      const timeKey = `${session.START} - ${session.END}`;
      if (!acc[timeKey]) acc[timeKey] = [];
      acc[timeKey].push(session);
      return acc;
    },
    {} as { [key: string]: Session[] }
  );

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Agenda</h1>
      <div className="min-h-screen flex flex-col items-start space-y-8">
        {Object.entries(groupedByTime).map(([timeKey, sessions]) => (
          <div key={timeKey} className="w-full">
            <h2 className="text-xl font-semibold text-[#00502f] mb-3">{timeKey}</h2>
            <ul className="space-y-4">
              {sessions.map((session, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setSelectedSession(session)}
                    className="w-full block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition text-left"
                  >
                    <h3 className="text-lg font-semibold">{session.TITLE}</h3>
                    {session.SPEAKER && (
                      <p className="text-sm text-gray-600">{session.SPEAKER}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {session.TRACK} • {session.LOCATION}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
