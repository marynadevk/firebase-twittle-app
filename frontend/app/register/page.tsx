'use client';

import { auth } from '@/lib/firebase';
import { IRegistrationForm } from '@/interfaces/IRegistrationForm';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import GoogleSignIn from '@/components/GoogleSignIn';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/IUser';

const RegisterPage = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<IRegistrationForm>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarUrl: '',
  });
  const [user, setUser] = useLocalStorage<null | IUser>('user', null);
  const [token, setToken] = useLocalStorage<null | string>('token', null);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.fullName.trim()) {
      newErrors.name = 'Name is required';
    } else if (formState.fullName.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formState.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      const user = userCredentials.user;
      updateProfile(user, {
        displayName: formState.fullName,
        photoURL: formState.avatarUrl
      })
      console.log('User created:', user);
      const token = await user.getIdToken();
      setToken(token);
      setUser({
        fullName: user.displayName || '',
        email: user.email || '',
        uid: user.uid,
        avatarUrl: user.photoURL || '',
      });
      router.push('/');
      setErrors({});
    } catch (error) {
      console.error('Error signing up:', error);
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-primary p-10 m-2">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 flex-col space-y-4 w-full max-w-2xl shadow-lg p-10 bg-slate-800 text-white text-2xl text-center"
      >
        Registration
        <div className="flex items-center space-y-2 justify-between border border-gray-200 p-2">
          <img
            src="/user-avatar.png"
            alt="Avatar"
            className=" rounded-full h-20 w-20"
          />
          <button
            type="button"
            className="btn btn-outline btn-accent"
            // onClick={handleRefreshAvatar}
          >
            New Avatar
          </button>
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text text-white">Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full input input-bordered text-stone-900"
            value={formState.fullName}
            onChange={handleChange}
          />
          {/* {errors.name && (
            <span className="text-red-500">{errors.fullName}</span>
          )} */}
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text text-white">Email</span>
          </label>
          <input
            autoComplete="username"
            type="text"
            name="email"
            placeholder="Email"
            className="w-full input input-bordered text-stone-900"
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
            autoComplete="new-password"
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full input input-bordered text-stone-900"
            value={formState.password}
            onChange={handleChange}
          />
          {/* {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )} */}
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text text-white">
              Confirm Password
            </span>
          </label>
          <input
            autoComplete="new-password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full input input-bordered text-stone-900"
            value={formState.confirmPassword}
            onChange={handleChange}
          />
          {/* {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword}</span>
          )} */}
        </div>
        <div className="flex gap-5 justify-center">
          <button type="submit" className="btn btn-outline btn-accent">
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Sign Up'
            )}
          </button>
          <GoogleSignIn />
        </div>
        <span className="font-extralight text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterPage;
