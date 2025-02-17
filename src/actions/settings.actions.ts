'use server';

import { collections } from "@/db";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { isAuth } from "@/middleware/auth";
import { toObjectId } from "monarch-orm";

interface UpdateProfileData {
  username: string;
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  language: string;
  twitter: string;
  instagram: string;
  facebook: string;
  linkedin: string;
}

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface UpdatePrivacyData {
  accountVisibility: 'public' | 'private' | 'unlisted';
}

interface UpdateNotificationData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  commentModeration: 'auto' | 'manual';
}

export async function updateProfile(data: UpdateProfileData) {
  const {session, user} = await isAuth();
  if (!user?.id) throw new Error('Unauthorized');
  try {

    await collections.user.updateOne({
     _id: toObjectId(user.id)
    }, {
      $set: {
        username: data.username,
        displayName: data.displayName,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        avatar: data.avatar,
        language: data.language,
        twitter: data.twitter,
        instagram: data.instagram,
        facebook: data.facebook,
        linkedin: data.linkedin,
      }
      })

    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

export async function verifyPassword(currentPassword: string) {
  const {session, user} = await isAuth();
  if (!user?.id) throw new Error('Unauthorized');
  try {

    const userData = await collections.user.findById(user.id)

    if (!userData?.password) throw new Error('User not found');

    const ctx = await auth.$context;
    return await ctx.password.verify({password: currentPassword, hash: userData?.password});
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
}


export async function hashPassword(password: string) {
  
  try {
    const ctx = await auth.$context;
    const hash = await ctx.password.hash(password);
    return hash;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
}

export async function updatePassword(data: UpdatePasswordData) {
  const {session, user} = await isAuth();
if (!user?.id) throw new Error('Unauthorized');
  try {

    // Verify current password
    const isValid = await verifyPassword(data.currentPassword);
    if (!isValid) throw new Error('Invalid password');

    // Hash new password
    const hashedPassword = await hashPassword(data.newPassword);

    // Update password in database
    await collections.user.updateOne({
      _id: toObjectId(user.id)
     }, {
      $set: {
        password: hashedPassword,
      }
      })

    return { success: true };
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}

export async function updatePrivacy(data: UpdatePrivacyData) {
  const {session, user} = await isAuth();
  if (!user?.id) throw new Error('Unauthorized');
  try {

    await collections.user.updateOne({
      _id: toObjectId(user.id)
     }, {
       $set: {
        defaultAlbumVisibility: data.accountVisibility,
       }
      })

    return { success: true };
  } catch (error) {
    console.error('Error updating privacy settings:', error);
    throw error;
  }
}

export async function updateNotifications(data: UpdateNotificationData) {
  const {session, user} = await isAuth();
if (!user?.id) throw new Error('Unauthorized');
  try {

    await collections.user.updateOne({
      _id: toObjectId(user.id)
     }, {
      $set: {

        emailNotifications: data.emailNotifications,
        pushNotifications: data.pushNotifications,
        commentModeration: data.commentModeration,
      }
      })

    return { success: true };
  } catch (error) {
    console.error('Error updating notification settings:', error);
    throw error;
  }
}