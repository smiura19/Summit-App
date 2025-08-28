import { notFound } from 'next/navigation';
import { use } from 'react'
import Image from 'next/image';
import posters from '../../../../../public/data/posters.json';

export default function PosterFull({ params }: { params: Promise<{ posterId: string }> }) {
  const poster = posters.find((p) => p.id === use(params).posterId);

  if (!poster) notFound();

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="relative w-full max-w-4xl h-[70vh] mb-4">
        <Image
          src={`/${poster.img}`}
          alt={poster.title}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}