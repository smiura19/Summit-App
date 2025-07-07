'use client';

import { Session } from './SessionList';

export default function SessionDetailsModal({
  session,
  onClose,
}: {
  session: Session;
  onClose: () => void;
}) {
  return (
    <div style={{
      position: 'fixed',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      padding: '2rem',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      zIndex: 1000,
      width: '90%',
      maxWidth: '500px',
      borderRadius: '10px'
    }}>
      <h2>{session.title}</h2>
      <p><strong>Time:</strong> {session.time}</p>
      <p><strong>Speaker:</strong> {session.speaker}</p>
      <p>{session.description}</p>
      <button onClick={onClose} style={{ marginTop: '1rem' }}>Close</button>
    </div>
  );
}
