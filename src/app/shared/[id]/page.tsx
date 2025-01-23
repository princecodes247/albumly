'use client';

import { useParams } from 'next/navigation';
import { useAlbumStore } from '@/lib/store';
import { PhotoGrid } from '@/components/photo-grid';

export default function SharedAlbum() {
  const params = useParams();
  const album = useAlbumStore((state) => state.getAlbum(params.id as string));

  if (!album) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Album not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{album.name}</h1>
          {album.description && (
            <p className="mt-2 text-muted-foreground">{album.description}</p>
          )}
        </div>
        <PhotoGrid photos={album.photos} />
      </div>
    </div>
  );
}