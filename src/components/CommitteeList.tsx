'use client';

export type Committee = {
  ID: string;
  TITLE: string;
};

export default function CommitteeList({ committees }: { committees: Committee[] }) {
  return (
    <ul className="space-y-4">
      {committees.map((committee) => (
        <li key={committee.ID}>
          <div
            className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold">{committee.TITLE}</h2>

          </div>
        </li>
      ))}
    </ul>
  );
}
