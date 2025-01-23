'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  className?: string;
}

export function FileUpload({ onUpload, className }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
        className
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
      <p className="mt-4 text-sm text-muted-foreground">
        Drag & drop photos here, or click to select files
      </p>
    </div>
  );
}