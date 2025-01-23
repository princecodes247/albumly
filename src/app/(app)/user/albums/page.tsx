import { collections } from "@/db";
import { serializeValues } from "@/lib/utils";
import Link from "next/link";


export default async function AlbumsPage() {
  const albums = serializeValues(await collections.album.find().populate({photos: true}).exec());

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Albums</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {albums.map((album) => (
          <Link href={`/user/albums/${album._id}`} key={album._id} className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold">{album.title}</h3>
            {album.description && (
              <p className="text-muted-foreground mt-2">{album.description}</p>
            )}
            <p className="text-sm text-muted-foreground mt-4">
              {album.photos.length} photos
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}