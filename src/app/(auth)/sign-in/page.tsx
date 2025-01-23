"use client"
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    await authClient.signIn.email({ 
      email,
      password,
    }, { 
      onRequest: () => { 
        //show loading
      }, 
      onSuccess: () => { 
        //redirect to dashboard
      }, 
      onError: (ctx) => { 
        alert(ctx.error.message) 
      } 
    }) 
  }

  return (
    <div>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}