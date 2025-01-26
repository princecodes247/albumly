"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

const LogoutButton = ({ onLogout }: { onLogout?: () => void }) => {
    const router = useRouter()

  const handleLogout = async () => {
      await authClient.signOut();
      if(onLogout) onLogout()
      router.push('/');
  }

  return (
    <Button className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
