import { array, boolean, createClient, createdAt, createDatabase, createSchema, date, InferSchemaInput, InferSchemaOutput, number, objectId, string, updatedAt } from "monarch-orm";

 
const client = createClient('mongodb://localhost:27017/albumly')
 
const UserSchema = createSchema("user", {
  name: string(),
  email: string(),
  emailVerified: string(),
  password: string(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
//   isVerified: boolean(),
});


const _AccountSchema = createSchema("account", {
  accountId: string(),
  providerId: string(),
  userId: objectId(),
  password: string(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

const _SessionSchema = createSchema("session", {
  expiresAt: string(),
  token: string(),
  ipAddress: string(),
  userAgent: string(),
  userId: objectId(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

const _AlbumSchema = createSchema("album", {
  title: string(),
  description: string().default(""),
  userId: objectId(),
  archivedAt: date().nullable().default(null),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

const _PhotoSchema = createSchema("photo", {
  url: string(),
  public_id: string(),
  caption: string().optional(),
  order: number().default(0),
  albumId: objectId(),
  archivedAt: date().nullable().default(null),
  likes: array(string()).default([]),
  views: array(string()).default([]),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});



const AccountSchema = _AccountSchema.relations(({one}) => (
  {
    userId: one(UserSchema, "_id")
  }
))

const SessionSchema = _SessionSchema.relations(({one}) => (
  {
    userId: one(UserSchema, "_id")
  }
))

const AlbumSchema = _AlbumSchema.relations(({ref, one}) => ({
    userId: one(UserSchema, "_id"),
    photos: ref(_PhotoSchema, "albumId", "_id")
}))

const PhotoSchema = _PhotoSchema.relations(({one}) => ({
  albumId: one(_AlbumSchema, "_id")
}))

const { db, collections } = createDatabase(client.db(), {
    user: UserSchema,
    account: AccountSchema,
    session: SessionSchema,
album: AlbumSchema,
photo: PhotoSchema,
});

export type IAlbum = InferSchemaOutput<typeof AlbumSchema>
export type IPhotoInput = InferSchemaInput<typeof PhotoSchema>
export type IPhoto = InferSchemaOutput<typeof PhotoSchema>
 
export { client, db, collections };

const AlbumModel = db(AlbumSchema)
export {AlbumModel}