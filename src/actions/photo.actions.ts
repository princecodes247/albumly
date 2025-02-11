'use server';

import { collections } from '@/db';
import { toObjectId } from 'monarch-orm';
import { revalidatePath } from 'next/cache';

export async function likePhotoAction(photoId: string, userId: string) {
  const photo = await collections.photo.findById(photoId);
  if (!photo) throw new Error('Photo not found');

  const likes = photo.likes || [];
  const hasLiked = likes.includes(userId);

  await collections.photo.updateOne(
    { _id: toObjectId(photoId) },
    hasLiked
      ? { $pull: { likes: userId } }
      : { $push: { likes: userId } }
  );

  revalidatePath(`/albums/[id]`);
  return !hasLiked;
}

export async function addCommentAction(photoId: string, userId: string, userName: string, text: string) {
  const photo = await collections.photo.findById(photoId);
  if (!photo) throw new Error('Photo not found');

  const comment = {
    id: Math.random().toString(36).substring(7),
    text,
    userId,
    userName,
    createdAt: new Date()
  };

  await collections.photo.updateOne(
    { _id: toObjectId(photoId) },
    { $push: { comments: comment } }
  );

  revalidatePath(`/albums/[id]`);
  return comment;
}

export async function downloadPhotoAction(photoId: string) {
  const photo = await collections.photo.findById(photoId);
  if (!photo) throw new Error('Photo not found');

  await collections.photo.updateOne(
    { _id: toObjectId(photoId) },
    { $inc: { downloads: 1 } }
  );

  return photo.url;
}