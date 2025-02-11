import { array, boolean, createClient, createdAt, createDatabase, createSchema, date, InferSchemaInput, InferSchemaOutput, literal, number, objectId, string, updatedAt } from "monarch-orm";

 
const client = createClient('mongodb://localhost:27017/albumly')
 
const UserSchema = createSchema("user", {
  name: string(),
  email: string(),
  emailVerified: string(),
  password: string(),
  role: string().default("user"), // user, admin, pro
  stripeCustomerId: string().nullable().default(null),
  currentPlan: string().default("free"), // free, pro, business
  planExpiresAt: date().nullable().default(null),
  storageUsed: number().default(0),
  storageLimit: number().default(1000), // in MB
  isVerified: boolean().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
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
  views: array(string()).default([]),
  userId: objectId(),
  archivedAt: date().nullable().default(null),
  visibility: literal("private", "public", "unlisted").default("private"),
  password: string().nullable().default(null),
  hasPublicUpload: boolean().default(false), // Add this field
  expiresAt: date().nullable().default(null),
  price: number().nullable().default(null),
  collaborators: array(objectId()).default([]),
  tags: array(string()).default([]),
  canDownload: boolean().default(true),
  hasWatermark: boolean().default(false),
  eventCode: string().nullable().default(null),
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

const _NotificationSchema = createSchema("notification", {
  userId: objectId(),
  type: string(), // album_shared, comment_added, storage_limit, etc.
  title: string(),
  message: string(),
  read: boolean().default(false),
  data: string().nullable().default(null), // JSON string for additional data
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

const _CommentSchema = createSchema("comment", {
  userId: objectId(),
  albumId: objectId(),
  photoId: objectId().nullable().default(null),
  content: string(),
  archivedAt: date().nullable().default(null),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

const _AnalyticsSchema = createSchema("analytics", {
  userId: objectId(),
  albumId: objectId().nullable().default(null),
  photoId: objectId().nullable().default(null),
  event: string(), // view, download, share, etc.
  metadata: string().nullable().default(null), // JSON string for additional data
  createdAt: createdAt(),
});

const NotificationSchema = _NotificationSchema.relations(({one}) => ({
  userId: one(UserSchema, "_id")
}));

const CommentSchema = _CommentSchema.relations(({one}) => ({
  userId: one(UserSchema, "_id"),
  albumId: one(_AlbumSchema, "_id"),
  photoId: one(_PhotoSchema, "_id")
}));

const AnalyticsSchema = _AnalyticsSchema.relations(({one}) => ({
  userId: one(UserSchema, "_id"),
  albumId: one(_AlbumSchema, "_id"),
  photoId: one(_PhotoSchema, "_id")
}));

const { db, collections } = createDatabase(client.db(), {
  user: UserSchema,
  account: AccountSchema,
  session: SessionSchema,
  album: AlbumSchema,
  photo: PhotoSchema,
  notification: NotificationSchema,
  comment: CommentSchema,
  analytics: AnalyticsSchema,
});

export type IAlbum = InferSchemaOutput<typeof AlbumSchema>
export type IAlbumVisibility = InferSchemaOutput<typeof AlbumSchema>["visibility"]
export type IPhotoInput = InferSchemaInput<typeof PhotoSchema>
export type IPhoto = InferSchemaOutput<typeof PhotoSchema>
 
export { client, db, collections };

const AlbumModel = db(AlbumSchema)
export {AlbumModel}