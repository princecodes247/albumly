"use client"
import { useState } from "react"
import { Plus, Upload, Lock, Eye, Image, Router } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

export function CreateAlbumDialog() {
  const [open, setOpen] = useState(false)
  const [albumName, setAlbumName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [privacy, setPrivacy] = useState("public")
  const [password, setPassword] = useState("")
  const [enableWatermark, setEnableWatermark] = useState(false)
  const [allowDownload, setAllowDownload] = useState(true)
  const [allowPublicUpload, setAllowPublicUpload] = useState(false)

  const router = useRouter()

  const { 
    data: session, 
    isPending,
    error: authError
  } = authClient.useSession() 
  
  const handleCreateAlbum = async () => {
    try {
      if (!albumName.trim()) {
        setError("Album name is required")
        return
      }
      if (privacy === "password" && !password.trim()) {
        setError("Password is required for password-protected albums")
        return
      }
      setIsLoading(true)
      const formData = new FormData()
      formData.append("name", albumName)
      formData.append("description", description)
      formData.append("privacy", privacy)
      formData.append("password", password)
      formData.append("enableWatermark", String(enableWatermark))
      formData.append("allowDownload", String(allowDownload))
      formData.append("publicUpload", String(allowPublicUpload)) // Add this line
      
      const albumId = await createAlbumAction(formData)
      setOpen(false)
      setAlbumName("")
      setDescription("")
      setPrivacy("public")
      setPassword("")
      setEnableWatermark(false)
      setAllowDownload(true)
      router.push(`/user/albums/${albumId}`)
    } catch (error) {
      console.error("Failed to create album:", error)
      setError("Failed to create album. Please try again.")
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
      <DialogContent className="max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
          <DialogDescription>
            Create a new album to organize your photos.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
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
          </div>

          <div className="space-y-4">
            <Label>Privacy Settings</Label>
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger>
                <SelectValue placeholder="Select privacy setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Public</span>
                  </div>
                </SelectItem>
                <SelectItem value="unlisted">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    <span>Unlisted</span>
                  </div>
                </SelectItem>
                <SelectItem value="password">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Password Protected</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {privacy === "password" && (
              <div>
                <Label htmlFor="password">Album Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter album password"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="watermark">Enable Watermark</Label>
              <Switch
                id="watermark"
                checked={enableWatermark}
                onCheckedChange={setEnableWatermark}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="download">Allow Downloads</Label>
              <Switch
                id="download"
                checked={allowDownload}
                onCheckedChange={setAllowDownload}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="publicUpload">Allow Public Uploads</Label>
                <p className="text-sm text-muted-foreground">
                  Let anyone upload photos to this album
                </p>
              </div>
              <Switch
                id="publicUpload"
                checked={allowPublicUpload}
                onCheckedChange={setAllowPublicUpload}
              />
            </div>
          </div>

      
          <Button 
            onClick={handleCreateAlbum} 
            className="w-full"
            disabled={isLoading || !albumName.trim() || (privacy === "password" && !password.trim())}
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