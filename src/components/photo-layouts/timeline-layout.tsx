'use client';

import { IPhoto } from "@/db";
import { Serialized } from "@/lib/utils";
import { useState } from "react";

interface FocusedLayoutProps {
  photos: Partial<Serialized<IPhoto>>[];
  setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
}

export function TimelineLayout({ photos, setSelectedImage }: FocusedLayoutProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-300">
      {photos.length > 0 && (
        <div className="md:aspect-video relative rounded-lg overflow-hidden border">
          <img
            src={photos[focusedIndex].url}
            alt={photos[focusedIndex]?.caption || ''}
            className="w-full h-full object-contain bg-black/5"
          />
          {photos[focusedIndex]?.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <p className="text-sm font-medium">{photos[focusedIndex]?.caption}</p>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {photos.map((photo, idx) => (
          <div
            key={photo?._id?.toString()}
            onClick={() => {
              setFocusedIndex(idx);
              // setSelectedImage(idx);
            }}
            className={`aspect-square rounded-lg overflow-hidden border cursor-pointer transition-all duration-300 ${focusedIndex === idx ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-2'}`}
          >
            <img
              src={photo.url}
              alt={photo?.caption || ''}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}