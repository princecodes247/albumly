'use client';

import { useParams } from 'next/navigation';
import { Share2, Plus } from 'lucide-react';
import { useAlbumStore } from '@/lib/store';
import { PhotoGrid } from '@/components/photo-grid';
import { FileUpload } from '@/components/ui/file-upload';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addPhotosToAlbumAction, GetAlbumActionResponse } from '@/actions/album.actions';
import { IPhotoInput } from '@/db';
import { PhotoViewer } from './photo-viewer';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function AlbumView({album}: {album: GetAlbumActionResponse}) {
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);


  if (!album) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Album not found</h1>
      </div>
    );
  }

  const shareUrl = ``;

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    formData.append("id", album._id);
    files.forEach(photo => formData.append("files[]", photo));
    await addPhotosToAlbumAction(formData)
    setIsAddingPhotos(false);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const albumId = await createAlbumAction(name, description, session?.user.id, photos)
  //   // const albumId = createAlbum(name, description, photos);
  //   router.push(`/albums/${albumId}`);
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">{album.title}</h1>
            {album.description && (
              <p className="mt-2 text-muted-foreground">{album.description}</p>
            )}
          </div>
          <div className="flex gap-3">
            {
              album.publicUpload && (
                <button
              onClick={() => setIsAddingPhotos(!isAddingPhotos)}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Photos
            </button>
              )
            }
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Album
            </button>
          </div>
        </div>

        {isAddingPhotos && (
          <div className="mb-8">
            <FileUpload onUpload={handleUpload} />
          </div>
        )}

        <PhotoGrid photos={album?.photos ?? []} setSelectedImage={setSelectedImage}/>
        <PhotoViewer photos={album?.photos ?? []} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      </div>
    </div>
  );
}