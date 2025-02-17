'use client';

import { IPhoto } from "@/db";
import { Serialized } from "@/lib/utils";
import { useState } from "react";

interface FocusedLayoutProps {
  title?: string;
  description?: string;
  photos: Partial<Serialized<IPhoto>>[];
  setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
}

export function FocusedLayout({ title, description, photos, setSelectedImage }: FocusedLayoutProps) {

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-300">
      {photos.length > 0 && (
        <div className="aspect-video relative rounded-lg overflow-hidden border">
          <img
            src={photos[0].url}
            alt={photos[0]?.caption || ''}
            className="w-full h-full object-contain bg-black/5"
          />
          <div className="absolute inset-0 bg-black/70 flex flex-col gap-2 justify-center items-center">
            <h1 className="text-3xl md:text-6xl text-white">{title}</h1>
            <p className="text-xl md:text-2xl text-white">{description}</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in-50 duration-300">
      {photos?.map((photo, idx) => (
        <div 
          key={photo?._id?.toString()} 
          onClick={() => setSelectedImage(idx)} 
          className="relative cursor-pointer border aspect-square rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300"
        >
          <img
            src={photo.url}
            alt={photo?.caption || ''}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          {photo.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-medium">{photo?.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}