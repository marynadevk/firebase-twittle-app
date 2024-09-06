'use client';
import { IUser } from '@/interfaces/IUser';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const Header = () => {
  const [token, setToken, removeToken] = useLocalStorage('token', null);
  const [user, setUser, removeUser] = useLocalStorage<null | IUser>(
    'user',
    null
  );
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const logout = () => {
    auth.signOut();
    router.push('/');
    removeToken();
    removeUser();
  };

  return (
    <header className="flex justify-between items-center h-16 w-full p-4 bg-gray-800">
      <Link href="/" className="flex items-center">
        <img src="./logo.png" className="w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold text-white">Twittle</h1>
      </Link>
      {isAuthenticated && (
        <button className="btn btn-outline btn-accent" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
