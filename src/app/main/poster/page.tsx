'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/client';
import Image from 'next/image';
import { Poster } from '../../../components/types';
import PosterModal from '../../../components/PosterModal';



type Ratings = {
  scientific_merit?: number;
  appearance?: number;
  presentation?: number;
  comments?: string;
};

export default function PosterList() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, Ratings>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});


  useEffect(() => {
    fetch('/data/posters.json')
      .then((res) => res.json())
      .then(setPosters);
  }, []);

  const toggleExpand = (posterId: string) => {
    setExpandedRow((prev) => (prev === posterId ? null : posterId));
  };

  const handleRatingChange = (posterId: string, category: keyof Ratings, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [posterId]: {
        ...prev[posterId],
        [category]: value,
      },
    }));
  };

  const handleCommentChange = (posterId: string, value: string) => {
  setRatings((prev) => ({
    ...prev,
    [posterId]: {
      ...prev[posterId],
      comments: value,
    },
  }));
  };

  const handleSubmit = async (e: React.FormEvent, posterId: string) => {
    e.preventDefault();

    const votePayload = {
      user_email: 'anonymous@example.com',
      user_name: 'Anonymous',
      poster_id: posterId,
      ...ratings[posterId],
    };

    const { data, error } = await supabase.from('votes').insert([votePayload]);

    if (error) {
      console.error('Error submitting vote:', error);
      alert('There was a problem submitting your vote.');
    } else {
      setSubmitted((prev) => ({ ...prev, [posterId]: true }));
      alert('Vote submitted successfully!');
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center px-2">
      <div className="items-center w-full mx-auto bg-white rounded-lg shadow-md sm:max-w-4xl">
        <div className="overflow-x-auto">
        <div className="mx-auto mt-8 max-w-screen-lg px-2">
            <div className="flex text-gray-700 justify-between rounded-lg p-4 bg-white w-full items-center space-x-16">
              <div className="flex items-center">
                <div className="flex font-bold text-3xl rounded-full py-4 px-4">
                  <p>Posters</p>
                </div>
              </div>
            </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-sm font-normal text-gray-600 border-t border-b text-left bg-gray-50">
                <th className="px-4 py-3">Preview</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {posters.map((poster) => (
                <React.Fragment key={poster.ID}>
                  <tr className="cursor-pointer border-b border-gray-200 hover:bg-gray-100">
                    <td className="px-4 py-4">
                      <button onClick={() => setSelectedPoster(poster)}>
                        <figure>
                          <img
                            src={`/${poster.THUMB_IMG}`}
                            alt={poster.ID}
                            className="w-16 h-16 object-cover rounded-md"  
                            loading="lazy"
                          />
                          <figcaption className="text-xs text-center text-gray-500">
                            (Click to enlarge)
                          </figcaption>
                        </figure>
                      </button>
                    </td>
                    <td className="px-4 py-4">{poster.TITLE}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleExpand(poster.ID)}
                        className={submitted[poster.ID] ? "text-white bg-gray-300 border rounded-lg px-4 py-2 text-center inline-flex items-center" : "text-white bg-gray-100 border rounded-lg px-4 py-2 text-center inline-flex items-center"}
                        disabled={submitted[poster.ID]}
                      >
                        <span className="text-sm font-semibold text-gray-800">
                          {submitted[poster.ID] ? 'Voted' : 'Vote'}
                        </span>
                        <div className={submitted[poster.ID] ? "hidden" : "w-4 h-4 text-black"}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z" />
                          </svg>
                        </div>
                      </button>
                    </td>
                  </tr>

                  {expandedRow === poster.ID && (
                    <tr>
                      <td colSpan={4} className="px-4 py-4 bg-gray-50">
                        <form onSubmit={(e) => handleSubmit(e, poster.ID)} className="space-y-4">

                          {poster.LINK && (
                              <a 
                              href={poster.LINK}  
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all pb-8"
                              >
                              Click to view presentation
                              </a>
                          )}
                          <p className="text-sm text-gray-800 mb-4">{poster.PARTICIPANT}</p>

                          <div className="mb-4">
                            <p className="text-sm text-gray-800">
                              {expandedDescriptions[poster.ID] 
                                ? poster.DESCRIPTION
                                : poster.DESCRIPTION.slice(0, 150) + (poster.DESCRIPTION.length > 150 ? '...' : '')}
                            </p>
                            {poster.DESCRIPTION.length > 150 && (
                              <button
                                onClick={() => setExpandedDescriptions(prev => ({
                                  ...prev,
                                  [poster.ID]: !prev[poster.ID]
                                }))}
                                className="text-gray-700 hover:text-gray-800 text-sm mt-1 focus:outline-none"
                              >
                                {expandedDescriptions[poster.ID] ? 'Read Less' : 'Read More'}
                              </button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block font-medium">Scientific Merit:</label>
                            <div className='flex justify-around'>
                              {[1, 2, 3, 4, 5].map((val) => (
                                <label key={`merit-${val}`} className="flex flex-col items-center text-sm">
                                  <input
                                    type="radio"
                                    name={`merit-${poster.ID}`}
                                    value={val}
                                    onChange={() => handleRatingChange(poster.ID, 'scientific_merit', val)}
                                    required
                                  />
                                  {val}
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-medium">Appearance:</label>
                            <div className='flex justify-around'>
                              {[1, 2, 3, 4, 5].map((val) => (
                                <label key={`appearance-${val}`} className="flex flex-col items-center text-sm">
                                    <input
                                      type="radio"
                                      name={`appearance-${poster.ID}`}
                                      value={val}
                                      onChange={() => handleRatingChange(poster.ID, 'appearance', val)}
                                      required
                                    />
                                  {val}
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-medium">Presentation Explanation:</label>
                            <div className="flex justify-around">
                              {[1, 2, 3, 4, 5].map((val) => (
                                <label key={`presentation-${val}`} className="flex flex-col items-center text-sm">
                                  <input
                                    type="radio"
                                    name={`presentation-${poster.ID}`}
                                    value={val}
                                    onChange={() => handleRatingChange(poster.ID, 'presentation', val)}
                                    required
                                  />
                                  {val}
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-medium">Additional Comments (max 250 characters):</label>
                            <textarea
                              name={`comments-${poster.ID}`}
                              maxLength={250}
                              className="w-full border rounded p-2 text-sm"
                              onChange={(e) => handleCommentChange(poster.ID, e.target.value)}
                              placeholder="Enter your comments here..."
                            />
                          </div>


                          <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            disabled={submitted[poster.ID]}
                          >
                            {submitted[poster.ID] ? 'Submitted' : 'Submit Vote'}
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      {selectedPoster && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-40 z-80">
          <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />
        </div>
      )}
    </main>
  );
}
