
import { serializeValues } from '@/lib/utils';
import AlbumView from './single-album-page';
import { collections } from '@/db';
import { toObjectId } from 'monarch-orm';
import { notFound } from 'next/navigation';

export default async function AlbumViewPage({params}) {

  const { id } = await params
  const validAlbumId = toObjectId(id)
  if(!validAlbumId) return notFound()
  const album = serializeValues(await collections.album.findOne({
    _id: validAlbumId,
    archivedAt: null 
  }).populate({photos: true}).exec())
  if(!album) return notFound()
 
  return (
   <AlbumView album={album}/>
  );
}
