import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl shadow-lg shadow-black/10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
        Albumly
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
        <Link href="/features" className="hover:text-white transition-colors">Features</Link>
        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" className="text-sm text-white/70 hover:bg-black hover:text-white">
            Log in
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-white text-black hover:bg-white/90 text-sm px-6">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  </nav>

  );
}

export default Navbar;

