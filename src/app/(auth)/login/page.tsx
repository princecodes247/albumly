
import { isAuth } from "@/middleware/auth";
import Login from "./login";

export default async function LoginPage() {
  await isAuth({
  invert: true
  })
  return (
    <Login/>
  )
}
