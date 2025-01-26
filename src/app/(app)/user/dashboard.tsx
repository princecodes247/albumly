"use client"
import { authClient } from "@/lib/auth-client"
import { Album, BarChart3, Image, Users } from "lucide-react"
import { CreateAlbumDialog } from "@/components/create-album-dialog"

export default function Overview({stats}) {
  const {
    data: session,
    isPending,
    error
  } = authClient.useSession()

  // These would come from your database/API
  const defaultStats = {
    totalAlbums: 12,
    totalPhotos: 156,
    totalAlbumViews: 2345,
    quotaUsed: 75, // percentage
    quotaLimit: 1000, // total photos allowed
    ...stats,
  }

  if (isPending) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8">Error loading dashboard</div>
  }

  return (
    <>
      <div className="mb-12 mt-4 flex justify-between items-center bg-gradient-to-r from-primary/10 via-transparent to-transparent p-8 rounded-lg">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Welcome, {session?.user.name}</h1>
          <p className="text-muted-foreground mt-2 text-lg">Here's an overview of your account</p>
        </div>
        <CreateAlbumDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-6 rounded-lg border bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <Album className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Albums</p>
              <h3 className="text-2xl font-bold">{defaultStats.totalAlbums}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <Image className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Photos</p>
              <h3 className="text-2xl font-bold">{defaultStats.totalPhotos}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Album Views</p>
              <h3 className="text-2xl font-bold">{defaultStats.totalAlbumViews}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Storage Used</p>
              <h3 className="text-2xl font-bold">{defaultStats.quotaUsed}%</h3>
              <p className="text-sm text-muted-foreground">
                {defaultStats.totalPhotos}/{defaultStats.quotaLimit} photos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="p-8 rounded-lg border bg-card hover:bg-accent/5 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Views Over Time</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-gradient-to-b from-primary/5 to-transparent rounded-lg">
            Graph placeholder - Views per day/week/month
          </div>
        </div>

        <div className="p-8 rounded-lg border bg-card hover:bg-accent/5 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Popular Albums</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-accent/5 transition-colors rounded-lg px-3 -mx-3">
                <div className="flex items-center gap-3">
                  <Album className="w-5 h-5 text-muted-foreground" />
                  <span>Album {i + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{Math.floor(Math.random() * 1000)} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

</>
  )
}