'use client';

import { IPhoto } from "@/db";
import { Serialized } from "@/lib/utils";

interface MasonryLayoutProps {
  photos: Partial<Serialized<IPhoto>>[];
  setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
}

export function MasonryLayout({ photos, setSelectedImage }: MasonryLayoutProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 animate-in fade-in-50 duration-300">
      {photos?.map((photo, idx) => (
        <div 
          key={photo?._id?.toString()}
          onClick={() => setSelectedImage(idx)}
          className="relative mb-4 break-inside-avoid cursor-pointer rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300"
        >
          <img
            src={photo.url}
            alt={photo?.caption || ''}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          />
          {photo.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-medium">{photo?.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}