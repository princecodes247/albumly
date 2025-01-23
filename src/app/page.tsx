'use client';

import { Camera, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Share Your Memories with{' '}
            <span className="text-primary">Albumly</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Create beautiful photo albums and share them with friends and family using unique links.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-5 h-5 mr-2" />
              Create Album
            </Link>
            <Link
              href="/albums"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              View Shared Album
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature cards */}
          <div className="p-6 rounded-lg bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Easy Upload</h3>
            <p className="mt-2 text-muted-foreground">
              Drag and drop your photos to create beautiful albums in seconds.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Instant Sharing</h3>
            <p className="mt-2 text-muted-foreground">
              Generate unique links to share your albums with anyone, anywhere.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Beautiful Display</h3>
            <p className="mt-2 text-muted-foreground">
              Your photos are displayed in a responsive, modern grid layout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}