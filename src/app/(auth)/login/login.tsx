"use client"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter()

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await authClient.signIn.email({ 
        email,
        password,
      });
      console.log({res})
      if(res?.error?.status) {
      const errorMessage = res.error.message || 'An unknown error occurred. Please try again.';
      setError(errorMessage);
      // toast({
      //   description: errorMessage
      // });
      return
      }
      router.push('/user');
    } catch (ctx) {
      console.log({ctx})

      setError(ctx.error.message);
    } finally {
      setLoading(false);
    }
    console.log("hi")
  }

  return (
    <div className="min-h-screen bg-[#151718] text-white flex relative overflow-hidden">
      <div className="flex-1 flex flex-col justify-center px-4 lg:px-16 relative z-10">
      <div className="w-full mb-8">
        <h1 className="text-4xl font-semibold mb-2">Sign in to Albumly</h1>
        <p className="text-[#9BA1A6]">Manage your photos and albums</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl p-6 px-0 relative z-10"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 mb-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#9BA1A6] mb-1.5">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#0A0B0C] border border-[#2A2F33] text-white placeholder:text-[#4A5056] focus:outline-none focus:border-[#4A5056] focus:ring-1 focus:ring-[#4A5056] transition-colors text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#9BA1A6] mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#0A0B0C] border border-[#2A2F33] text-white placeholder:text-[#4A5056] focus:outline-none focus:border-[#4A5056] focus:ring-1 focus:ring-[#4A5056] transition-colors text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#2A2F33] bg-[#0A0B0C] text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-[#9BA1A6]">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              Forgot password?
            </Link>
          </div>
          <button
            onClick={handleSignIn}
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center justify-center gap-2 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''} text-sm`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
      <p className="mt-6 text-sm text-[#9BA1A6]">
        Don't have an account?{' '}
        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign up
        </Link>
      </p>
      </div>
      <div className="hidden lg:block lg:flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />

      </div>
    </div>
  );
}
