"use client"
import { useState } from "react"
import { Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createAlbumAction } from "@/actions/album.actions"
import { authClient } from "@/lib/auth-client"

export function CreateAlbumDialog() {
  const [open, setOpen] = useState(false)
  const [albumName, setAlbumName] = useState("")
  const [description, setDescription] = useState("")
  const [photos, setPhotos] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { 
    data: session, 
    isPending,
    error
} = authClient.useSession() 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const handleCreateAlbum = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append("name", albumName)
      formData.append("description", description)
      formData.append("userId", session?.user?.id ?? "")
      photos.forEach(photo => formData.append("files[]", photo))
      
      await createAlbumAction(formData)
      setOpen(false)
      setAlbumName("")
      setDescription("")
      setPhotos([])
    } catch (error) {
      console.error("Failed to create album:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Album
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
          <DialogDescription>
            Create a new album to organize your photos.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Album Name</Label>
            <Input
              id="name"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              placeholder="Enter album name"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter album description"
            />
          </div>
          <div>
            <Label htmlFor="photos">Upload Photos</Label>
            <div className="mt-2">
              <Input
                id="photos"
                type="file"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                className="cursor-pointer"
              />
            </div>
            {photos.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {photos.length} photo{photos.length === 1 ? '' : 's'} selected
              </p>
            )}
          </div>
          <Button 
            onClick={handleCreateAlbum} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Album'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}