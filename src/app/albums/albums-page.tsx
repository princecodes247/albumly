'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAlbumStore } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { archiveAlbumAction } from '@/actions/album.actions';

export default function Albums({albums}) {
  const handleDelete = async (id: string) => {
    const res = await archiveAlbumAction(id);
    console.log({res})
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Albums</h1>
        <Link
          href="/create"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Create New Album
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album, index) => (
          <div
            key={album._id}
            className="group block bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative">
            <Link
            key={album._id}
            href={`/albums/${album._id}`}
          >
              {album.photos[0] ? (
               <div className='h-full relative'>
              <img
                  src={album.photos[0].url}
                  alt={album.name}
                  className="object-cover inset-0 w-full h-full"
                />
               </div>
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No photos</p>
                </div>
              )}
              </Link>
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg">{album.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {album.photos.length} photos • Created{' '}
                {formatDistanceToNow(album.createdAt, { addSuffix: true })}
              </p>
              <button 
            onClick={() => handleDelete(album._id.toString())} 
            className=" top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
          >
            Archive
          </button>
          <Link
            key={album._id}
            href={`/albums/${album._id}`}
          >View</Link>
            </div>
          </div>
        ))}

        {albums.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No albums yet. Create your first album!</p>
          </div>
        )}
      </div>
    </div>
  );
}