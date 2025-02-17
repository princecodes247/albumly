'use client';

interface AlbumHeaderProps {
  title: string;
  description?: string;
}

export function AlbumHeader({ title, description }: AlbumHeaderProps) {
  return (
   <>
    <div className="flex justify-between items-start mb-8">
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
    </div>
    <div className="flex gap-3">
      {/* {
        allowPublicUpload && (
          <button
        onClick={() => setIsAddingPhotos(!isAddingPhotos)}
        className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Photos
      </button>
        )
      } */}
      {/* <button
        onClick={() => navigator.clipboard.writeText(shareUrl)}
        className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Share2 className="w-5 h-5 mr-2" />
        Share Album
      </button> */}
    </div>
  </div>

  {/* {isAddingPhotos && (
    <div className="mb-8">
      <FileUpload onUpload={handleUpload} />
    </div>
  )} */}

   </>
  );
}