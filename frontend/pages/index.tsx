'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';
import {
  AddBtn,
  Header,
  LeftSide,
  LoaderDots,
  NewPost,
  PostsList,
  Profile,
  AuthButtons,
} from '@/components/index';
import { startLoading, stopLoading } from '@/lib/features/loader/loaderSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setIsAuthenticated } from '@/lib/features/auth/authSlice';

const Home = () => {
  const [token] = useLocalStorage('token', null);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startLoading());
    try {
      dispatch(setIsAuthenticated(!!token));
    } catch (error) {
      toast.error('Error loading posts');
    } finally {
      dispatch(stopLoading());
    }
  }, [token]);

  return (
    <>
      <Header isMain />
      {isLoading ? (
        <LoaderDots />
      ) : (
        <div className="flex">
          <LeftSide pageName={!isAuthenticated ? 'Start' : 'Home'}>
            {!isAuthenticated ? (
              <AuthButtons />
            ) : (
              <div className="flex flex-col align-top font-primary gap-5 m-2 items-center w-full text-white text-2xl">
                <Profile />
                {!isOpen && <AddBtn setIsOpen={setIsOpen} />}
              </div>
            )}
            {isOpen && <NewPost setIsOpen={setIsOpen} />}
          </LeftSide>
          {isLoading ? <LoaderDots /> : <PostsList />}
        </div>
      )}
    </>
  );
};

export default Home;
