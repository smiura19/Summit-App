'use client';

import { Session } from './types';

export default function SessionDetailsModal({
    session,
    onClose,
}: {
    session: Session;
    onClose: () => void;
}) {

    return (
    
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-40 z-40 pt-20">
    <div 
      id="session-details-modal"
      className="fixed top-[10%] left-1/2 transform -translate-x-1/2 
        bg-white p-4 md:p-8 
        shadow-lg z-45
        w-[95%] md:w-[90%] max-w-2xl
        rounded-lg
        max-h-[90vh] overflow-y-auto pt-20"
    >

      <h1 className="text-2xl font-bold mb-4">{session.TITLE}</h1>
      <p className="mb-2 text-sm text-gray-600"><strong>Time:</strong> {session.START} - {session.END}</p>
      <p className="mb-2 text-sm text-gray-600"><strong>Speaker:</strong> {session.SPEAKER}</p>
      <p className="text-base text-gray-800"><strong>Description:</strong> {session.DESCRIPTION}</p>



      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        Close
      </button>
    </div>
</div>
  );
}