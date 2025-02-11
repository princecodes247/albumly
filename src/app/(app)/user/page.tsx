
import { authClient } from "@/lib/auth-client" // import the auth client
import Overview from "./dashboard"
import { collections, db } from "@/db"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { toObjectId } from "monarch-orm";
import { isAuth } from "@/middleware/auth";
import { serializeValues } from "@/lib/utils";
 
export default async function UserPage(){
    
    // const userId = authClient.; // Assuming you have a method to get the current user's ID
    const session = await isAuth()
    // console.log({session})
    const albums = await collections.album.find({ userId: toObjectId(session?.user.id ?? "") }).select({
        _id: true,
    });


const results = await collections.album.aggregate().addStage({
    $match: { userId: toObjectId(session?.user.id ?? ""), archivedAt: null },
}).addStage({
    $lookup: {
      from: "photo", // Join with the photos collection
      localField: "_id",
      foreignField: "albumId",
      as: "photos",
    },
  }).addStage(
    {
        $addFields: {
          views: { $ifNull: ["$views", []] }, // Ensure albums without views default to an empty array
          photos: {
            $map: {
              input: "$photos",
              as: "photo",
              in: {
                // "$photo",
                // views: { $ifNull: ["$$photo.views", []] }, // Ensure photos without views default to an empty array
                $ifNull: ["$$photo.views", []] 
              },
            },
          },
        },
      }
  ).addStage({
    $group: {
      _id: "$userId", // Group by the user ID
      totalAlbums: { $sum: 1 }, // Count total albums
      totalPhotos: { $sum: { $size: "$photos" } }, // Count total photos
      totalAlbumViews: { $sum: { $size: "$views" } }, // Count total album views
      totalPhotoViews: {
        $sum: {
          $reduce: {
            input: "$photos.views",
            initialValue: 0,
            in: { $add: ["$$value", { $size: "$$this" }] }, // Sum photo views
          },
        },
      },
    },
  }).exec();

  console.log({results})

  const popularAlbums = await collections.album.find({ userId: toObjectId(session?.user.id ?? ""), archivedAt: null }).select({
    title: true,
    views: true
  }).sort({
    views: 1
  }).limit(5)


  
console.log({results});


    return (
        <Overview stats={serializeValues(results[0])} popularAlbums={serializeValues(popularAlbums)}/>
    )
}