"use client"
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await authClient.signIn.email({ 
        email,
        password,
      });
      // Redirect to dashboard
      router.push('/user'); // Update this to your actual dashboard route
    } catch (ctx) {
      setError(ctx.error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-80">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border p-2 mb-2 w-full"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="border p-2 mb-4 w-full"
        />
        <button 
          onClick={handleSignIn} 
          className={`bg-blue-500 text-white p-2 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}