'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/components/ui/file-upload';
import { PhotoGrid } from '@/components/photo-grid';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { collections, IPhotoInput } from '@/db';
import { createAlbumAction } from '@/actions/album.actions';

export default function CreateAlbum() {
  const router = useRouter();
  const { 
    data: session, 
    isPending,
    error
} = authClient.useSession() 
  // const createAlbum = (name, description, photos) => {
  //   const album = await createAlbumAction(name, description, photos)
  // }
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPreviewPhotos] = useState<{url: string}[]>([]);

  const handleUpload = async (files: File[]) => {
    const newPhotos = files.map((file) => ({url: URL.createObjectURL(file)}));
    setPhotos((prev) => [...prev, ...files]);
    setPreviewPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("userId", session?.user?.id ?? "");
    photos.forEach(photo => formData.append("files[]", photo));
    const albumId = await createAlbumAction(formData);

    router.push(`/albums/${albumId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Album</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Album Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
            rows={4}
          />
        </div>
        <FileUpload onUpload={handleUpload} className="mt-6" />
        {photoPreviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <PhotoGrid photos={photoPreviews} />
          </div>
        )}
        <Button
          type="submit"
          className="w-full mt-8 px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          disabled={!name}
        >
          Create Album
        </Button>
      </form>
    </div>
  );
}