'use client';

// Update the path below to the actual file where Poster is exported, e.g. './Poster' or './types'
import { Poster } from './types';
import Image from 'next/image';
// Update the import path below to where Poster is actually exported
// For example, if Poster is exported from 'src/app/main/poster/page.tsx':
// import type { Poster } from '@/app/main/poster/page';

export default function PosterModal({
    poster,
    onClose,
}: {
    poster: Poster;
    onClose: () => void;
}) {

    return (
    <div 
    id="poster-modal"
    style={{
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
      height: '75vh',
      borderRadius: '10px'
    }}>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
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
        <div className="relative w-full max-w-4xl h-[70vh] mb-4">
            <img
            src={`/${poster.IMG}`}
            alt={poster.ID}
            className="max-w-full max-h-[80vh] object-contain"
            loading="lazy"
            />
        </div>
    </div>
  );
}