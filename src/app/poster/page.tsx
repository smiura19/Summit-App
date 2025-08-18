'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/client';
import Image from 'next/image';

type Poster = {
  id: string;
  title: string;
  category: string;
  img: string;
};

type Ratings = {
  scientific_merit?: number;
  appearance?: number;
  presentation?: number;
};

export default function PosterList() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, Ratings>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

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
    <main className="bg-gray-100 min-h-screen flex items-center justify-center px-8">
      <div className="items-center w-full mx-auto bg-white rounded-lg shadow-md sm:max-w-4xl">
        <div className="mx-auto">
          <div className="overflow-x-auto">
            <div className="flex text-gray-700 justify-between rounded-lg p-4 bg-white w-full items-center space-x-16"></div>
              <div className="flex items-center">
                <div className="flex font-bold text-3xl rounded-full py-4 px-4">
                  <p>Posters</p>
                </div>
              </div>
            </div>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-sm font-normal text-gray-600 border-t border-b text-left bg-gray-50">
                <th className="px-4 py-3">Preview</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {posters.map((poster) => (
                <>
                  <tr key={poster.id} className="cursor-pointer border-b border-gray-200 hover:bg-gray-100">
                    <td className="px-4 py-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={`/${poster.img}`}
                          alt={poster.title}
                          width={64}
                          height={64}
                          className="object-cover rounded-md"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">{poster.title}</td>
                    <td className="px-4 py-4">{poster.category}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleExpand(poster.id)}
                        className="text-white bg-gray-100 border rounded-lg px-4 py-2 text-center inline-flex items-center"
                      >
                        <svg className="w-4 h-4 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>

                  {expandedRow === poster.id && (
                    <tr>
                      <td colSpan={4} className="px-4 py-4 bg-gray-50">
                        <form onSubmit={(e) => handleSubmit(e, poster.id)} className="space-y-4">
                          <h3 className="text-lg font-semibold">{poster.title}</h3>

                          <div className="space-y-2">
                            <label className="block font-medium">Scientific Merit:</label>
                            <div className='flex justify-around'>
                              {[1, 2, 3, 4, 5].map((val) => (
                                <label key={`merit-${val}`} className="flex flex-col items-center text-sm">
                                  <input
                                    type="radio"
                                    name={`merit-${poster.id}`}
                                    value={val}
                                    onChange={() => handleRatingChange(poster.id, 'scientific_merit', val)}
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
                                      name={`appearance-${poster.id}`}
                                      value={val}
                                      onChange={() => handleRatingChange(poster.id, 'appearance', val)}
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
                                    name={`presentation-${poster.id}`}
                                    value={val}
                                    onChange={() => handleRatingChange(poster.id, 'presentation', val)}
                                    required
                                  />
                                  {val}
                                </label>
                              ))}
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            disabled={submitted[poster.id]}
                          >
                            {submitted[poster.id] ? 'Submitted' : 'Submit Vote'}
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
      </div>
    </main>
  );
}
