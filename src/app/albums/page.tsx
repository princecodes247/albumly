
import Albums from './albums-page';
import { AlbumModel, collections } from '@/db';
import { serializeValues } from '@/lib/utils';

export default async function AlbumsPage() {
  const albums = serializeValues(await AlbumModel.find({
    archivedAt: null
  }).populate({photos: true}).exec())

  return (
   <Albums albums={albums}/>
  );
}