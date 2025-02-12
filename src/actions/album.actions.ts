"use server";
import { collections, IPhotoInput } from "@/db";
import { putFilesInCloudinaryServer, putFilesServer } from "./upload.actions";

import { serializeValues } from "@/lib/utils";
import { generateObjectId, toObjectId } from "monarch-orm";
import { isAuth } from "@/middleware/auth";

export const createAlbumAction = async (formData: FormData) => {
    const {user} = await isAuth();
    if (!user?.id) {
        throw new Error("Unauthorized");
    }

    const name = formData.get("name");
    const privacy = formData.get("privacy");
    const password = formData.get("password");
    const enableWatermark = formData.get("enableWatermark") === "true";
    const allowDownload = formData.get("allowDownload") === "true";
    const publicUpload = formData.get("publicUpload") === "true";

    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new Error("Invalid name provided");
    }

    try {
        const album = {
            title: name,
            description: (formData.get("description") ?? "").toString(),
            userId: user.id,
            visibility: (privacy || "private") as "private" | "public" | "unlisted",
            password: password ? String(password) : null,
            watermarkEnabled: enableWatermark,
            downloadEnabled: allowDownload,
            publicUpload,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const newAlbum = await collections.album.insertOne(album).exec();
        return newAlbum._id.toString();
    } catch (error) {
        console.error("Error creating album:", error);
        throw new Error("Failed to create album");
    }
};

interface EditAlbumInput {
    title?: string;
    description?: string;
    visibility?: "private" | "public" | "unlisted";
    password?: string | null;
    hasWatermark?: boolean;
    canDownload?: boolean;
    allowPublicUpload?: boolean;
}

export const editAlbumAction = async (id: string, input: EditAlbumInput) => {
    const { user } = await isAuth();
    if (!user?.id) {
        throw new Error("Unauthorized");
    }

    const validAlbumId = toObjectId(id);
    if (!validAlbumId) {
        throw new Error("Invalid album ID format");
    }

    // Verify album ownership
    const existingAlbum = await collections.album.findOne({
        _id: validAlbumId,
        userId: toObjectId(user.id)
    }).exec();

    if (!existingAlbum) {
        throw new Error("Album not found or unauthorized");
    }

    try {
        const updates = {
            ...(input.title && { title: input.title }),
            ...(input.description !== undefined && { description: input.description }),
            ...(input.visibility && { visibility: input.visibility }),
            ...(input.password !== undefined && { password: input.password }),
            ...(input.hasWatermark !== undefined && { hasWatermark: input.hasWatermark }),
            ...(input.canDownload !== undefined && { canDownload: input.canDownload }),
            ...(input.allowPublicUpload !== undefined && { allowPublicUpload: input.allowPublicUpload }),
            // updatedAt: new Date()
        };

        const updatedAlbum = await collections.album.findOneAndUpdate(
            { _id: validAlbumId },
            { $set: updates }
        ).exec();

        return serializeValues(updatedAlbum);
    } catch (error) {
        console.error("Error updating album:", error);
        throw new Error("Failed to update album");
    }
};


export const addPhotosToAlbumAction = async (formData: FormData) => {
    const rawFormData = {
        files: [] as File[],
        id: formData.get("id"),
    };

    // Extract files from the FormData
    formData.forEach((value, key) => {
        if (key === "files[]" && value instanceof File) {
            rawFormData.files.push(value);
        }
    });

    if (typeof rawFormData?.id !== "string" || rawFormData.files.length === 0) {
        return;
    }

    const album = await collections.album.findById(rawFormData.id).exec()
    if (!album) return;

    const result = await putFilesInCloudinaryServer({
        files: rawFormData.files,
    });

    const images = result.data.map((file, index) => ({
        albumId: album._id,
        url: file.url,
        publicId: file.public_id,
        _id: generateObjectId()
        // order: index + 1,
    }))
    await collections.photo.insertMany(images).exec();

    return serializeValues({ ...album, images });
}

export const deletePhotoFromAlbumAction = async (photoId: string, albumId: string) => {
    const { user } = await isAuth();
    if (!user?.id) {
        throw new Error("Unauthorized");
    }
    try {

        const validPhotoId = toObjectId(photoId);
        const validAlbumId = toObjectId(albumId);
        
        if (!validPhotoId || !validAlbumId) {
            throw new Error("Invalid photo or album ID");
        }

        // First check if the user owns the album
        const album = await collections.album.findOne({
            _id: validAlbumId,
            userId: toObjectId(user.id)
        }).exec();

        if (!album) {
            throw new Error("Album not found or unauthorized");
        }

        // Find and delete the photo
        const photo = await collections.photo.findOneAndDelete({
            _id: validPhotoId,
            albumId: validAlbumId
        }).exec();

        if (!photo) {
            throw new Error("Photo not found");
        }

        return { success: true, message: "Photo deleted successfully" };
    } catch (error) {
        console.error("Error deleting photo:", error);
        throw new Error("Failed to delete photo");
    }
}


export const archiveAlbumAction = async (albumId: string) => {
    try {
        const validAlbumId = toObjectId(albumId)
        if (!validAlbumId) {
            throw new Error("Invalid album ID");
        }
        // Find the album by ID and archive it
        const album = await collections.album.findOneAndUpdate({
            _id: validAlbumId
        }, {
            $set: {
                archivedAt: new Date()
            }
        }).exec();
        
        if (!album) {
            throw new Error("Album not found");
        }

        // Archive all photos in the album
        await collections.photo.updateMany(
            { albumId: album._id },
            { $set: { archivedAt: new Date() } } // Set the archivedAt field for each photo
        ).exec();

        return { success: true, message: "Album and photos archived successfully" };
    } catch (error) {
        console.error("Error archiving album:", error);
        throw new Error("Failed to archive album");
    }
}

export const getAlbumAction = async (albumId: string) => {
    try {
        const validAlbumId = toObjectId(albumId);
        if (!validAlbumId) {
            return null
        }

        const album = serializeValues(
            await collections.album.findOne({
                _id: validAlbumId,
                archivedAt: null
            }).populate({ photos: true }).exec()
        );

        if (!album) {
            throw new Error("Album not found");
        }

        await collections.album.updateOne({
            _id: validAlbumId
          }, {
            $push: {
              views: ""
            }
          })
        return album;
    } catch (error) {
        console.error("Error fetching album:", error);
        throw new Error("Failed to fetch album");
    }
}

export const getUserAlbumsAction = async (userId: string) => {
    try {
        const validUserId = toObjectId(userId);
        if (!validUserId) {
            return [];
        }

        const albums = await collections.album.find({ userId: validUserId, archivedAt: null }).populate({photos: true}).exec()

        return serializeValues(albums);
    } catch (error) {
        console.error("Error fetching album by ID:", error);
        throw new Error("Failed to fetch album");
    }
}

export const getUserAlbumAction = async (id: string, userId: string) => {
    try {
        const validId = toObjectId(id);
        const validUserId = toObjectId(userId);
        if (!validId || !validUserId) {
            return null;
        }

        const album = await collections.album
            .findOne({_id: validId, userId: validUserId, archivedAt: null})
            .populate({ photos: true })
            .exec();

        if (!album) {
            throw new Error("Album not found");
        }

        return serializeValues(album);
    } catch (error) {
        console.error("Error fetching album by ID:", error);
        throw new Error("Failed to fetch album");
    }
}

export type GetAlbumActionResponse = Awaited<ReturnType<typeof getAlbumAction>>;
export type GetUserAlbumActionResponse = Awaited<ReturnType<typeof getUserAlbumAction>>;