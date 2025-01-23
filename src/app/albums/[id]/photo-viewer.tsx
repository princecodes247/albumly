"use client"
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { IPhoto } from "@/db";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface PhotoViewerProps {
  photos: IPhoto[];
  selectedImage: number | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
}

export function PhotoViewer({ photos, selectedImage, setSelectedImage }: PhotoViewerProps) {

    const handlePrevious = () => {
        setSelectedImage((prev) => 
          prev === null ? null : prev === 0 ? photos.length - 1 : prev - 1
        );
    };
    const handleNext = () => {
        setSelectedImage((prev) => 
          prev === null ? null : prev === photos.length - 1 ? 0 : prev + 1
        );
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setSelectedImage(null);
    };
    
    return (
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-7xl w-full flex flex-col h-[80vh] p-0" onKeyDown={handleKeyDown}>
                <DialogTitle className="hidden">Image viewer</DialogTitle>
                {/* <DialogClose asChild>
                    <button
                        // onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    </DialogClose> */}
                <div className="relative w-full h-full border flex items-center justify-center flex-col">
                    {selectedImage !== null && (
                        <>
                            <div className="flex-1 flex justify-center items-center w-full h-full">
                            <img
                                src={`${photos[selectedImage].url}?w=1200&h=800&fit=crop`}
                                alt={photos[selectedImage].caption}
                                className="max-h-[40vh] object-contain"
                            />
                            </div>
                            <div className="space-x-2 mt-6">
                                {photos.map((image, index) => (
                                    <button
                                    key={image?._id.toString() + index}
                                    onClick={() => setSelectedImage(index)}
                                    className={cn(
                                      "relative aspect-square w-[100px] overflow-hidden rounded-lg",
                                      selectedImage === index && "ring-2 ring-offset-2 ring-primary dark:ring-white"
                                    )}
                                  >
                                    <img
                                          src={`${image.url}?w=100&h=100&fit=crop`}
                                          alt={image.caption}
                                          className="object-cover"
                                    />
                                  </button>
                                ))}
                            </div>
                            <button
                                onClick={handlePrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 size-[40px] flex justify-center items-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                                <ArrowLeft/>
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 flex justify-center items-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                                <ArrowRight/>
                            </button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}