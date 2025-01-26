import { IPhoto } from "@/db";


interface PhotoGridProps {
  photos: Partial<IPhoto>[];
  setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
}

export function PhotoGrid({ photos, setSelectedImage }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos?.map((photo, idx) => (
        <div key={photo?._id?.toString()} onClick={() => setSelectedImage(idx)} className="relative cursor-pointer border aspect-square rounded-lg overflow-hidden group">
        {/* <div key={photo._id} onClick={() => setSelectedImage(photo._id.toString())} className="relative aspect-square rounded-lg overflow-hidden group"> */}
          <img
            src={photo.url}
            alt={photo?.caption || ''}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          {photo.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm">{photo?.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}