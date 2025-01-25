"use server";
import { collections, IPhotoInput } from "@/db";
import { putFilesInCloudinaryServer, putFilesServer } from "./upload.actions";

import { serializeValues } from "@/lib/utils";
import { toObjectId } from "monarch-orm";

export const createAlbumAction = async (formData: FormData) => {
    // (name: string, description:string, userId: string, photos: string[]) => {
    const name = formData.get("name");
    const userId = formData.get("userId")

    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new Error("Invalid name provided");
    }
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error("Invalid userId provided");
    }


    const rawFormData = {
        photos: [] as File[],
        name,
        description: (formData.get("description") ?? "").toString(),
        userId,
    };

    // Extract files from the FormData
    formData.forEach((value, key) => {
        if (key === "files[]" && value instanceof File) {
            rawFormData.photos.push(value);
        }
    });
    try {
        const album = {
            title: rawFormData.name,
            description: rawFormData.description,
            userId: rawFormData.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const newAlbum = await collections.album.insertOne(album).exec();


        const result = await putFilesInCloudinaryServer({
            files: rawFormData.photos,
        });

        const images = await collections.photo.insertMany(result.data.map((file, index) => ({
            albumId: newAlbum._id,
            url: file.url,
            public_id: file.public_id,
            order: index + 1,
        })),
        ).exec();

        return newAlbum._id.toString(); // Return the ID of the created album
    } catch (error) {
        console.error("Error creating album:", error);
        throw new Error("Failed to create album");
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

    const images = await collections.photo.insertMany(result.data.map((file, index) => ({
        albumId: album._id,
        url: file.url,
        public_id: file.public_id,
        // order: index + 1,
    }))
    ).exec();

    return serializeValues({ ...album, images });
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
