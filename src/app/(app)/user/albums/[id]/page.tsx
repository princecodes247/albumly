import { collections } from "@/db";
import { serializeValues } from "@/lib/utils";
import { Eye, Heart, X } from "lucide-react";
import Link from "next/link";

export default async function AlbumPage({ params }) {
  const { id } = await params;
  const album = serializeValues(await collections.album.findById(id).populate({ photos: true }).exec());

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div className="p-8">
      <Link href="/user/albums" className="text-blue-500 underline">Back to All Albums</Link>
    <div className="flex justify-between items-center">
        <div>
      <h1 className="text-3xl font-bold">{album.title}</h1>
      {album.description && (
        <p className="text-muted-foreground mt-2">{album.description}</p>
      )}
        </div>
        <div>
        <Link href={`/albums/${album._id}`} target="_blank" className="ml-4 p-2 bg-blue-500 text-white rounded">
        Preview
      </Link>
        </div>
    </div>
      <h2 className="text-2xl font-semibold mt-4">Photos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {album.photos.map((photo) => (
          <div key={photo._id} className="relative p-6 pb-4 flex flex-col gap-2 rounded-lg border bg-card">
            <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{photo.caption}</h3>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground mr-2">
                <Eye className="inline mr-1" /> {photo?.views?.length || 0}
              </span>
              <span className="text-sm text-muted-foreground">
                <Heart className="inline mr-1" /> {photo?.likes?.length || 0}
              </span>
            </div>
            <button className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600" 
            // onClick={() => handleDelete(photo._id)}
            >
              <X className="inline" /> {/* Replace with your X icon component */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
