'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Download, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
  userName: string;
}

interface PhotoInteractionsProps {
  photoId: string;
  initialLikes: number;
  initialComments: Comment[];
  onLike: () => Promise<void>;
  onComment: (text: string) => Promise<void>;
  onDownload: () => Promise<void>;
  isLiked: boolean;
}

export function PhotoInteractions({
  photoId,
  initialLikes,
  initialComments,
  onLike,
  onComment,
  onDownload,
  isLiked
}: PhotoInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      setIsLiking(true);
      await onLike();
      setLikes(prev => prev + (isLiked ? -1 : 1));
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setIsCommenting(true);
      await onComment(commentText);
      setCommentText('');
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'hover:text-red-500 transition-colors',
            isLiked && 'text-red-500'
          )}
          onClick={handleLike}
          disabled={isLiking}
        >
          {isLiking ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Heart className="h-5 w-5" />
          )}
          <span className="ml-2">{likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="ml-2">{comments.length}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Download className="h-5 w-5" />
          )}
        </Button>
      </div>

      {showComments && (
        <div className="space-y-4">
          <form onSubmit={handleComment} className="flex gap-2">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              disabled={isCommenting}
            />
            <Button type="submit" disabled={isCommenting || !commentText.trim()}>
              {isCommenting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Post'
              )}
            </Button>
          </form>

          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id} className="p-2 rounded-lg bg-secondary">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}