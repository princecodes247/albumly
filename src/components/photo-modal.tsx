'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  _id: string;
  url: string;
  caption?: string;
}

interface PhotoModalProps {
  photos: Photo[];
  selectedIndex: number;
  onClose: () => void;
  onPhotoChange: (index: number) => void;
}

export function PhotoModal({ photos, selectedIndex, onClose, onPhotoChange }: PhotoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      onPhotoChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      onPhotoChange(currentIndex + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
    

      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="relative w-full mx-12 max-w-5xl max-h-[calc(100vh-200px)] overflow-hidden">
          <img
            src={photos[currentIndex].url}
            alt={photos[currentIndex].caption || ''}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <button
                  key={photo._id}
                  onClick={() => {
                    setCurrentIndex(index);
                    onPhotoChange(index);
                  }}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${index === currentIndex ? 'ring-2 ring-primary' : ''}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || ''}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="absolute left-4 p-2 z-20 rounded-full bg-background/20 hover:bg-background/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-invert"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex === photos.length - 1}
        className="absolute right-4 p-2 z-20 rounded-full bg-background/20 hover:bg-background/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-invert"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}