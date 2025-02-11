'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { putFileServer } from '@/actions/upload.actions';

interface UploadZoneProps {
  onUploadComplete: (urls: string[]) => void;
  maxFiles?: number;
}

interface UploadingFile {
  file: File;
  progress: number;
  error?: string;
  url?: string;
}

export function UploadZone({ onUploadComplete, maxFiles = 10 }: UploadZoneProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, maxFiles - uploadingFiles.length).map(file => ({
      file,
      progress: 0
    }));

    setUploadingFiles(prev => [...prev, ...newFiles]);

    const uploadPromises = newFiles.map(async ({ file }, index) => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await putFileServer(formData);
        
        if (data?.url) {
          setUploadingFiles(prev => {
            const newState = [...prev];
            newState[prev.length - newFiles.length + index] = {
              ...newState[prev.length - newFiles.length + index],
              progress: 100,
              url: data.url
            };
            return newState;
          });
          return data.url;
        }
      } catch (error) {
        setUploadingFiles(prev => {
          const newState = [...prev];
          newState[prev.length - newFiles.length + index] = {
            ...newState[prev.length - newFiles.length + index],
            progress: 0,
            error: 'Upload failed'
          };
          return newState;
        });
      }
    });

    const urls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];
    if (urls.length > 0) {
      onUploadComplete(urls);
    }
  }, [maxFiles, uploadingFiles.length, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  });

  const removeFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select files'}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          {uploadingFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 border rounded-lg"
            >
              <div className="flex-1">
                <p className="text-sm truncate">{file.file.name}</p>
                <div className="h-2 bg-muted rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      file.error ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
                {file.error && (
                  <p className="text-xs text-destructive mt-1">{file.error}</p>
                )}
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}