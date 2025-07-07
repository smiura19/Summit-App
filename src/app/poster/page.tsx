'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Poster = {
  id: string;
  title: string;
  category: string;
  img: string;
};

export default function PosterList() {
  const [selectedVotes, setSelectedVotes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [posters, setPosters] = useState<Poster[]>([]);

  useEffect(() => {
    fetch('/data/posters.json')
      .then((res) => res.json())
      .then(setPosters);
  }, []);

  const toggleVote = (posterId: string) => {
    if (selectedVotes.includes(posterId)) {
      setSelectedVotes(selectedVotes.filter((id) => id !== posterId));
    } else {
      if (selectedVotes.length < 3) {
        setSelectedVotes([...selectedVotes, posterId]);
      } else {
        alert('You can only vote for up to 3 posters.');
      }
    }
  };

const handleSubmit = async () => {
  if (selectedVotes.length === 0) {
    alert('Please select at least one poster to vote.');
    return;
  }

  // Replace with actual user data if available
  const votePayload = {
    title: `Vote by anonymous`, // you can change to user's email if logged in
    status: 'publish',
    meta: {
      vote_user_email: 'anonymous@example.com', // Replace if real user is known
      vote_username: 'Anonymous',
      vote_poster_ids: JSON.stringify(selectedVotes), // store poster IDs as JSON
    },
  };

  try {
const response = await fetch('/api/proxy-vote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(votePayload),
});




    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to submit vote: ${err}`);
    }

    const result = await response.json();
    console.log('Vote submitted successfully:', result);
    setSubmitted(true);
  } catch (error) {
    console.error('Error submitting vote:', error);
    alert('There was a problem submitting your vote. Please try again.');
  }
};


  const postersByCategory: Record<string, Poster[]> = {};
  for (const poster of posters) {
    if (!postersByCategory[poster.category]) {
      postersByCategory[poster.category] = [];
    }
    postersByCategory[poster.category].push(poster);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Posters</h1>

      {Object.entries(postersByCategory).map(([category, posters]) => (
        <section key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <ul className="space-y-2">
            {posters.map((poster) => {
              const isSelected = selectedVotes.includes(poster.id);
              return (
                <li
                  key={poster.id}
                  className={`p-3 border rounded bg-gray-50 flex justify-between items-center ${
                    isSelected ? 'bg-green-100 border-green-400' : ''
                  }`}
                >
                  <Link
                    href={`/poster/${poster.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {poster.title}
                  </Link>
                  <button
                    onClick={() => toggleVote(poster.id)}
                    disabled={submitted}
                    className={`ml-4 px-3 py-1 rounded ${
                      isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {isSelected ? 'Unvote' : 'Vote'}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          disabled={submitted}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {submitted ? 'Votes Submitted' : 'Submit Votes'}
        </button>
      </div>
    </main>
  );
}
