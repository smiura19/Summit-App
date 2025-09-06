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
        <div className="fixed inset-0 flex items-center justify-center bg-white/40 z-[60]">
            <div 
                id="session-details-modal"
                className="fixed top-[5%] left-1/2 transform -translate-x-1/2 
                    bg-white
                    w-[95%] md:w-[90%] max-w-2xl
                    rounded-lg
                    max-h-[90vh]
                    flex flex-col
                    z-[70]"
            >
                {/* Fixed header */}
                <div className="sticky top-0 flex items-center justify-between p-4 md:p-5 bg-white px-4 pt-4 md:px-8 md:pt-8 rounded-t-lg border-b">
                    <h1 className="text-lg font-bold mb-4">{session.TITLE}</h1>
                                <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8">
                    <p className="mb-2 text-sm text-gray-600">
                        <strong>Time:</strong> {session.START} - {session.END}
                    </p>
                    <p className="mb-2 text-sm text-gray-600">
                        <strong>Speaker:</strong> {session.SPEAKER}
                    </p>
                    <p className="text-base text-gray-800">
                        <strong>Description:</strong> {session.DESCRIPTION}
                    </p>
                </div>

                {/* Fixed footer */}
                <div className="sticky bottom-0 bg-white px-4 pb-4 md:px-8 md:pb-8 pt-2 rounded-b-lg border-t">

                </div>
            </div>
        </div>
    );
}