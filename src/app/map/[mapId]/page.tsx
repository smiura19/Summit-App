import { notFound } from 'next/navigation';
import { use } from 'react'
import Image from 'next/image';
import maps from '../../../../public/data/maps.json';

export default function MapFull({ params }: { params: Promise<{ mapId: string }> }) {
  const map = maps.find((m) => m.id === use(params).mapId);

  if (!map) notFound();

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <div className="relative w-full max-w-4xl h-[70vh] mb-4">
        <Image
          src={`/${map.img}`}
          alt={map.title}
          fill
          className="object-contain rounded-xl"
        />
      </div>
            <h1 className="text-3xl font-bold mb-2">{map.title}</h1>
    </div>
  );
}