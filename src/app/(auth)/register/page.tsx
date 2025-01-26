"use client"
import { authClient } from "@/lib/auth-client"; //import the auth client
import { convertImageToBase64 } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from 'react';
 
export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
 
  const signUp = async () => {
    const { data, error } = await authClient.signUp.email({ 
        email, 
        password, 
        name, 
        // image: image ? convertImageToBase64(image) : undefined, 
     }, { 
        onRequest: (ctx) => { 
         //show loading
        }, 
        onSuccess: (ctx) => { 
          //redirect to the dashboard
          console.log({ctx})
          
        }, 
        onError: (ctx) => { 
          alert(ctx.error.message); 
        }, 
      }); 
  };
 
  return (
    <section className="container">
      <div className="flex flex-col gap-2 mx-auto border">
      <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* <input type="file" onChange={(e) => setImage(e.target.files?.[0])} /> */}
      <button onClick={signUp}>Sign Up</button>
    </div>
    </section>
  );
}