'use client';

import { IAlbum, IAlbumVisibility } from "@/db";
import { ChevronLeft, Eye, Heart, Image, Plus, Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PhotoModal } from "@/components/photo-modal";
import { FileUpload } from "@/components/ui/file-upload";
import { addPhotosToAlbumAction, GetUserAlbumActionResponse } from "@/actions/album.actions";
import { AlbumSettingsDialog } from "@/components/album-settings-dialog";


export default function AlbumView({ album }: { album: NonNullable<GetUserAlbumActionResponse>}) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [albumState, setAlbumState] = useState(album)
  const [albumSettings, setAlbumSettings] = useState({
    title: album?.title,
    description: album?.description || "",
    visibility: album?.visibility || "public",
    password: album?.password || "",
    hasWatermark: album?.hasWatermark || false,
    canDownload: album?.canDownload,
    hasPublicUpload: album?.hasPublicUpload || false
  });

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    formData.append("id", album._id.toString());
    files.forEach(photo => formData.append("files[]", photo));
    const result  = await addPhotosToAlbumAction(formData);
    setIsAddingPhotos(false);
    setAlbumState(prev => ({...prev, photos: [...prev.photos, ...result.images]}))
  };

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/user/albums" className="text-sm flex gap-2 items-center font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft/>{" "} <span>Back to Albums</span>
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{album.title}</h1>
            {album.description && (
              <p className="text-lg text-muted-foreground">{album.description}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAddingPhotos(!isAddingPhotos)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Photos
            </button>
            <Link 
              href={`/albums/${album._id}`} 
              target="_blank" 
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              Preview Album
            </Link>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isAddingPhotos && (
          <div className="mb-6">
            <FileUpload onUpload={handleUpload} />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-6 py-3 px-4 bg-card rounded-lg">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{albumState.photos.reduce((acc, photo) => acc + (photo?.views?.length || 0), 0)} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{albumState.photos.reduce((acc, photo) => acc + (photo?.likes?.length || 0), 0)} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{albumState.photos.length} photos</span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Photos</h2>
          {albumState.photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl bg-card">
              <div className="w-16 h-16 mb-4 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No photos yet</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Start adding photos to your album</p>
              
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {album.photos.map((photo, index) => (
              <div 
                key={photo._id} 
                className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{photo.caption}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" /> {photo?.views?.length || 0}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" /> {photo?.likes?.length || 0}
                    </span>
                  </div>
                </div>
                <button 
                  className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background" 
                  // onClick={() => handleDelete(photo._id)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>

      {selectedPhotoIndex !== null && (
        <PhotoModal
          photos={album.photos}
          selectedIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
          onPhotoChange={(index) => setSelectedPhotoIndex(index)}
        />
      )}

      <AlbumSettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        albumSettings={albumSettings}
        onSettingsChange={setAlbumSettings}
      />
    </div>
  );
}
