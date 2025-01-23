
import { authClient } from "@/lib/auth-client" // import the auth client
import User from "./dashboard"
import { collections, db } from "@/db"
 
export default async function UserPage(){
    
    const albums = await collections.album.find().exec()
    console.log({albums})
    return (
        <User/>
    )
}