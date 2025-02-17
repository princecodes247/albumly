'use client';

import { IPhoto } from "@/db";
import { cn, Serialized } from "@/lib/utils";
import { Plus, Share2 } from "lucide-react";

interface GridLayoutProps {
  photos: Partial<Serialized<IPhoto>>[];
  setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
  columns?: number
}

export function GridLayout({ columns = 4, photos, setSelectedImage }: GridLayoutProps) {
  return (
    <div className="mx-auto">
       
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in-50 duration-300", columns ? `lg:grid-cols-${columns}`: "xl:grid-cols-4 lg:grid-cols-3")}>
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