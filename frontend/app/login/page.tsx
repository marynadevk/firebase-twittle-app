'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ILoginFormState } from '@/interfaces/ILoginFormState';
import { auth } from '@/lib/firebase';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/IUser';
import GoogleSignIn from '@/components/GoogleSignIn';

const LoginPage = () => {
  const [formState, setFormState] = useState<ILoginFormState>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useLocalStorage<null | string>('token', null);
  const [user, setUser] = useLocalStorage<null | IUser>('user', null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formState.email.trim() || !emailRegex.test(formState.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formState.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (validateForm()) {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          formState.email,
          formState.password
        );
        console.log('userCredentials:', userCredentials);
        const user = userCredentials.user;
        const token = await user.getIdToken();

        setToken(token);
        setUser({
          fullName: user.displayName || '',
          email: user.email || '',
          uid: user.uid,
          avatarUrl: user.photoURL || '',
        });

        if (user) {
          router.push(`/`);
        }

        setErrors({});
      }
    } catch (error: any) {
      console.error('Error logging in user:', error.message);
      setErrors({});
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen font-primary p-10 m-2 ">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 flex-col space-y-4 w-full max-w-2xl shadow-lg p-10 bg-slate-800 text-white text-2xl text-center"
      >
        Login
        <div>
          <label className="label">
            <span className="text-base label-text text-white">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="w-full input input-bordered text-stone-900"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
          {/* {errors.email && <span className="text-red-500">{errors.email}</span>} */}
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text text-white">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered text-stone-900"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
          {/* {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )} */}
        </div>
        <div className="flex gap-5 justify-center">
          <button type="submit" className="btn btn-outline btn-accent">
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Sign In'
            )}
          </button>
          <GoogleSignIn />
        </div>
        <span className="text-white font-extralight text-sm">
          Do not have an account?{' '}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
