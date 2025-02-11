import { CreateAlbumDialog } from "@/components/create-album-dialog";
import { collections } from "@/db";
import { serializeValues } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { archiveAlbumAction, getUserAlbumsAction } from "@/actions/album.actions";
import { isAuth } from "@/middleware/auth";
import { toObjectId } from "monarch-orm";
import { revalidatePath } from "next/cache";

export default async function AlbumsPage() {
  const session = await isAuth()

  const albums = await getUserAlbumsAction(session?.user?.id ?? "");

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Albums</h1>
        <CreateAlbumDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div key={album._id} className="group relative">
            <Link 
              href={`/user/albums/${album._id}`} 
              className="flex flex-col rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {album.photos.length > 0 ? (
                  <img 
                    src={album.photos[0].url} 
                    alt={album.title} 
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <span>No photos</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold leading-none tracking-tight">{album.title}</h3>
                {album.description && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{album.description}</p>
                )}
                <div className="mt-auto pt-4">
                  <p className="text-sm text-muted-foreground">
                    {album.photos.length} {album.photos.length === 1 ? 'photo' : 'photos'}
                  </p>
                </div>
              </div>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Album</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this album? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-4 mt-4">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <form action={async () => {
                    "use server";
                    await archiveAlbumAction(album._id)
                    revalidatePath("/user/albums")
                    }}>
                    <input type="hidden" name="id" value={album._id} />
                    <Button type="submit" variant="destructive">Delete Album</Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
        {albums.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No albums yet</p>
            <CreateAlbumDialog />
          </div>
        )}
      </div>
    </div>
  )
}