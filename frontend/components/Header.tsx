'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/index';
import { auth } from '@/lib/firebase/firebase.config';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setIsAuthenticated } from '@/lib/features/auth/authSlice';
import SearchOnPage from './search/SearchOnPage';
import { FC } from 'react';

type Props = {
  isMain?: boolean;
};

const Header: FC<Props> = ({ isMain }) => {
  const [_token, _setToken, removeToken] = useLocalStorage('token', null);
  const [_user, _setUser, removeUser] = useLocalStorage<null | IUser>(
    'user',
    null
  );
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const logout = () => {
    auth.signOut();
    dispatch(setIsAuthenticated(false));
    removeToken();
    removeUser();
    router.push('/');
  };

  return (
    <>
      <header className="flex justify-between items-center h-16 w-full p-4 bg-gray-800">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold text-white">Twittle</h1>
        </Link>
        {isAuthenticated && (
          <div className="flex items-center justify-center gap-5">
            {isMain && <SearchOnPage />}
            <button className="btn btn-outline btn-accent" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
