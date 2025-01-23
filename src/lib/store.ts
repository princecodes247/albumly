import { create } from 'zustand';
import { Album, Photo } from './types';
import { v4 as uuidv4 } from 'uuid';

interface AlbumStore {
  albums: Album[];
  createAlbum: (name: string, description: string, photos: Photo[]) => string;
  getAlbum: (id: string) => Album | undefined;
  addPhotosToAlbum: (albumId: string, photos: Photo[]) => void;
}

export const useAlbumStore = create<AlbumStore>((set, get) => ({
  albums: [],
  createAlbum: (name, description, photos) => {
    const id = uuidv4();
    const newAlbum: Album = {
      id,
      name,
      description,
      photos,
      createdAt: new Date(),
    };
    set((state) => ({ albums: [...state.albums, newAlbum] }));
    return id;
  },
  getAlbum: (id) => {
    return get().albums.find((album) => album.id === id);
  },
  addPhotosToAlbum: (albumId, newPhotos) => {
    set((state) => ({
      albums: state.albums.map((album) =>
        album.id === albumId
          ? { ...album, photos: [...album.photos, ...newPhotos] }
          : album
      ),
    }));
  },
}));