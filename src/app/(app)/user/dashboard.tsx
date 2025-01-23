"use client"
import { authClient } from "@/lib/auth-client"
import { Album, BarChart3, Image, Users } from "lucide-react"

export default function User() {
  const {
    data: session,
    isPending,
    error
  } = authClient.useSession()

  // These would come from your database/API
  const stats = {
    totalAlbums: 12,
    totalPhotos: 156,
    albumViews: 2345,
    quotaUsed: 75, // percentage
    quotaLimit: 1000 // total photos allowed
  }

  if (isPending) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8">Error loading dashboard</div>
  }

  return (
<>

<div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {session?.user.name}</h1>
        <p className="text-muted-foreground mt-2">Here's an overview of your account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-4">
            <Album className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Albums</p>
              <h3 className="text-2xl font-bold">{stats.totalAlbums}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-4">
            <Image className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Photos</p>
              <h3 className="text-2xl font-bold">{stats.totalPhotos}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Album Views</p>
              <h3 className="text-2xl font-bold">{stats.albumViews}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Storage Used</p>
              <h3 className="text-2xl font-bold">{stats.quotaUsed}%</h3>
              <p className="text-sm text-muted-foreground">
                {stats.totalPhotos}/{stats.quotaLimit} photos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-xl font-semibold mb-4">Views Over Time</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Graph placeholder - Views per day/week/month
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-xl font-semibold mb-4">Popular Albums</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
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