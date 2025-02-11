"use client"
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { IPhoto } from "@/db";
import { cn, Serialized } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Download, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoViewerProps {
  photos: Serialized<IPhoto>[];
  selectedImage: number | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
  allowDownload?: boolean;
}

export function PhotoViewer({ photos, selectedImage, setSelectedImage, allowDownload = true }: PhotoViewerProps) {
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");

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

    const handleDownload = async () => {
        if (!selectedImage) return;
        const photo = photos[selectedImage];
        const response = await fetch(photo.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = photo.caption || 'photo';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };
    
    return (
        <Dialog open={selectedImage !== null} onOpenChange={() => {
            setSelectedImage(null);
            setShowComments(false);
            }}>
            <DialogContent className="max-w-7xl w-full overflow-hidden flex h-[90vh] p-0 gap-4 bg-black/90" onKeyDown={handleKeyDown}>
                <DialogTitle className="hidden">Image viewer</DialogTitle>
                <div className="relative flex-1 flex items-center justify-center">
                    {selectedImage !== null && (
                        <>
                            <img
                                src={`${photos[selectedImage].url}`}
                                alt={photos[selectedImage].caption}
                                className="max-h-full max-w-full object-contain"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                                <button
                                    className="p-2 rounded-full hover:bg-white/20 transition-all transform active:scale-75 duration-150"
                                    onClick={() => {
                                        const photo = photos[selectedImage];
                                        const isLiked = photo?.likes?.includes('user-id') || false;
                                        const newLikes = isLiked
                                            ? photo.likes?.filter(id => id !== 'user-id')
                                            : [...(photo.likes || []), 'user-id'];
                                        photos[selectedImage] = {
                                            ...photo,
                                            likes: newLikes
                                        };
                                        setSelectedImage(selectedImage);
                                    }}
                                >
                                    {photos[selectedImage]?.likes?.includes('user-id') ? (
                                        <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-bounce" />
                                    ) : (
                                        <Heart className="w-6 h-6 text-white" />
                                    )}
                                </button>
                                <button
                                    className="p-2 rounded-full hover:bg-white/20 transition-all"
                                    onClick={() => setShowComments(!showComments)}
                                >
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </button>
                                {allowDownload && (
                                    <button
                                        className="p-2 rounded-full hover:bg-white/20 transition-all"
                                        onClick={handleDownload}
                                    >
                                        <Download className="w-6 h-6 text-white" />
                                    </button>
                                )}
                                <div className="h-8 w-px bg-white/20" />
                                <div className="text-white space-x-4 text-sm">
                                    <span>{photos[selectedImage]?.likes?.length || 0} likes</span>
                                    <span>{photos[selectedImage]?.comments?.length || 0} comments</span>
                                </div>
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
                <AnimatePresence>
                    {showComments && (
                    <motion.div 
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-[400px] bg-background border-l flex flex-col h-full">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold">Comments</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {photos[selectedImage!]?.comments?.map((comment, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-xs font-medium">U</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">User</p>
                                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                                    </div>
                                </div>
                            )) || (
                                <p className="text-sm text-muted-foreground text-center">No comments yet</p>
                            )}
                        </div>
                        <div className="p-4 border-t">
                            <form className="flex gap-2" onSubmit={(e) => {
                                e.preventDefault();
                                if (!comment.trim()) return;
                                const photo = photos[selectedImage!];
                                photos[selectedImage!] = {
                                    ...photo,
                                    comments: [...(photo.comments || []), { text: comment, userId: 'user-id' }]
                                };
                                setComment("");
                                setSelectedImage(selectedImage);
                            }}>
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 px-3 py-2 rounded-md bg-secondary text-sm"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"
                                    disabled={!comment.trim()}
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}