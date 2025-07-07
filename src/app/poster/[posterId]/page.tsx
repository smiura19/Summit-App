import { notFound } from 'next/navigation';
import Image from 'next/image';
import posters from '../../../../public/data/posters.json';

export default function PosterFull({ params }: { params: { posterId: string } }) {
  const poster = posters.find((p) => p.id === params.posterId);

  if (!poster) notFound();

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <div className="relative w-full max-w-4xl h-[70vh] mb-4">
        <Image
          src={`/${poster.img}`}
          alt={poster.title}
          fill
          className="object-contain rounded-xl"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{poster.title}</h1>
      <p className="text-lg text-gray-300">{poster.category}</p>
    </div>
  );
}