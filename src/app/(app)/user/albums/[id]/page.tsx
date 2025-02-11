import { collections } from "@/db";
import { serializeValues } from "@/lib/utils";
import AlbumView from "./album-view";
import { getUserAlbumAction } from "@/actions/album.actions";
import { isAuth } from "@/middleware/auth";

export default async function AlbumPage({ params }) {
  const { id } = await params;
  const session = await isAuth()

  const album = await getUserAlbumAction(id, session.user.id);

  return (
    <AlbumView album={album}/>
  );
}
