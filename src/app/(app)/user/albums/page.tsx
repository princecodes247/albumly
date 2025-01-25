import { CreateAlbumDialog } from "@/components/create-album-dialog";
import { collections } from "@/db";
import { serializeValues } from "@/lib/utils";
import Link from "next/link";


export default async function AlbumsPage() {
  const albums = serializeValues(await collections.album.find().populate({photos: true}).exec());

  return (
    <div className="p-8">
<div className="flex justify-between items-center">
<h1 className="text-3xl font-bold">Albums</h1>
      <CreateAlbumDialog />

</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {albums.map((album) => (
          <Link href={`/user/albums/${album._id}`} key={album._id} className="p-6 flex flex-col rounded-lg border bg-card">
            <div className="flex-1">
            {album.photos.length > 0 && (
              <img src={album.photos[0].url} alt={album.title} className="mt-4 rounded-md w-full h-32 object-cover" />
            )}
            </div>
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