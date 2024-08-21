import { IUser } from '@/interfaces/IUser';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

const GoogleSignIn = () => {
  const router = useRouter();
  const [token, setToken] = useLocalStorage<null | string>('token', null);
  const [user, setUser] = useLocalStorage<null | IUser>('user', null);
  
  const googleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      setToken(token);
      setUser({
        fullName: user.displayName || '',
        email: user.email || '',
        uid: user.uid,
        avatarUrl: user.photoURL || '',
      });
      router.push('/');
    } catch (error) {
      console.error('Error during Google sign-up:', error);
      throw error;
    }
  };
  return (
    <button type='button' onClick={googleSignUp} className="btn btn-outline btn-accent">
      Continue with Google
    </button>
  );
};

export default GoogleSignIn;
