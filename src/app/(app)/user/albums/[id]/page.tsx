import { collections } from "@/db";
import { serializeValues } from "@/lib/utils";
import AlbumView from "./album-view";

export default async function AlbumPage({ params }) {
  const { id } = await params;
  const album = serializeValues(await collections.album.findById(id).populate({ photos: true }).exec());

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <AlbumView album={album}/>
  );
}
