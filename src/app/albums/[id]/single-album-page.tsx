'use client';

import { useParams } from 'next/navigation';
import { Share2, Plus } from 'lucide-react';
import { useAlbumStore } from '@/lib/store';
import { PhotoLayout } from '@/components/photo-layouts/photo-layout';
import { FileUpload } from '@/components/ui/file-upload';
import { useState } from 'react';
import { addPhotosToAlbumAction, GetAlbumActionResponse } from '@/actions/album.actions';
import { PhotoViewer } from './photo-viewer';

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

  const shareUrl = `${window.location.origin}/shared/${album._id}`;

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    formData.append("id", album._id);
    files.forEach(photo => formData.append("files[]", photo));
    await addPhotosToAlbumAction(formData)
    setIsAddingPhotos(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
    

        <PhotoLayout album={album} setSelectedImage={setSelectedImage} debug/>
        <PhotoViewer photos={album?.photos ?? []} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    </div>
  );
}