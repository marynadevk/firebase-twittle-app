import React from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useLocalStorage } from 'usehooks-ts';
import { toast } from 'react-toastify';
import { auth } from '@/lib/firebase/firebase.config';
import { IUser } from '@/interfaces/index';
import { ERROR_MESSAGE } from '@/constants/constants';

const GoogleSignIn = () => {
  const router = useRouter();
  const [_token, setToken] = useLocalStorage<null | string>('token', null);
  const [_user, setUser] = useLocalStorage<null | IUser>('user', null);

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
      toast.error(ERROR_MESSAGE.googleSignIn);
      throw error;
    }
  };
  return (
    <button
      type="button"
      onClick={googleSignUp}
      className="btn btn-outline btn-accent"
    >
      Continue with Google
    </button>
  );
};

export default GoogleSignIn;
