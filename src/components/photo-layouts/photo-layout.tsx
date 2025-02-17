'use client';

import { IAlbum, IAlbumLayout, IPhoto } from "@/db";
import { Serialized } from "@/lib/utils";
import { useState } from "react";
import { GridLayout } from "./grid-layout";
import { FocusedLayout } from "./focused-layout";
import { MasonryLayout } from "./masonry-layout";
import { LayoutGrid, Layout, Grid3X3 } from "lucide-react";
import { GetAlbumActionResponse } from "@/actions/album.actions";
import { TimelineLayout } from "./timeline-layout";
import { AlbumHeader } from "./album-header";


interface PhotoLayoutProps {
  album: GetAlbumActionResponse;
  setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
  debug?: boolean;
}

export function PhotoLayout({ album, setSelectedImage, debug }: PhotoLayoutProps) {
  const [layout, setLayout] = useState<IAlbumLayout>(album?.layout ?? "grid");

  const layouts = [
    { type: "grid", icon: LayoutGrid, label: "Grid" },
    { type: "focused", icon: Layout, label: "Focused" },
    { type: "timeline", icon: Layout, label: "Timeline" },
    { type: "masonry", icon: Grid3X3, label: "Masonry" },
  ] as const;

  return (
    <div className="space-y-4">
     {debug && <div className="flex justify-end gap-2">
        {layouts.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setLayout(type)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${layout === type ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>}

      <>
      {layout !== "focused" && <AlbumHeader title={album?.title ?? ""} description={album?.description} />}
            
      {layout === "grid" && (
        <GridLayout photos={album?.photos ?? []} setSelectedImage={setSelectedImage} columns={album?.gridColumns} />
      )}
      {layout === "timeline" && (
        <TimelineLayout photos={album?.photos ?? []} setSelectedImage={setSelectedImage} />
      )}
      {layout === "masonry" && (
        <MasonryLayout photos={album?.photos ?? []} setSelectedImage={setSelectedImage} />
      )}
        </>

      {layout === "focused" && (
        <FocusedLayout title={album?.title} description={album?.description} photos={album?.photos ?? []} setSelectedImage={setSelectedImage} />
      )}
    </div>
  );
}