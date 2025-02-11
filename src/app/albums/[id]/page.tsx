
import { serializeValues } from '@/lib/utils';
import AlbumView from './single-album-page';
import { collections } from '@/db';
import { toObjectId } from 'monarch-orm';
import { notFound } from 'next/navigation';
import { after } from 'next/server';
import { getAlbumAction } from '@/actions/album.actions';

export default async function AlbumViewPage({params}) {

  const { id } = await params

  const album = await getAlbumAction(id)
  if(!album) return notFound()
 

  return (
   <AlbumView album={album}/>
  );
}
