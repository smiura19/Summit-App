import { notFound } from 'next/navigation';
import { use } from 'react'
import sessions from '../../../../../public/data/sessions.json';

export default function SessionDetail({ params }: { params:  Promise<{ sessionId: string }> }) {
  
  const session = sessions.find((s) => s.id === use(params).sessionId);

  if (!session) notFound();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{session.title}</h1>
      <p className="mb-2 text-sm text-gray-600"><strong>Time:</strong> {session.time}</p>
      <p className="mb-2 text-sm text-gray-600"><strong>Speaker:</strong> {session.speaker}</p>
      <p className="text-base text-gray-800">{session.description}</p>
    </main>
  );
}