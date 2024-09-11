'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
} from '@/components/index';
import { startLoading, stopLoading } from '@/lib/features/loader/loaderSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

const Home = () => {
  const [token] = useLocalStorage('token', null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startLoading());
    try {
      setIsAuthenticated(!!token);
    } catch (error) {
      toast.error('Error loading posts');
    } finally {
      dispatch(stopLoading());
    }
  }, [token]);

  return (
    <>
      <Header />
      {isLoading ? (
        <LoaderDots />
      ) : (
        <div className="flex">
          <LeftSide>
            {!isAuthenticated ? (
              <div className="flex flex-col flex-grow gap-2">
                <button className="btn btn-outline btn-accent">
                  <Link className="w-full" href="/register">
                    Sign up
                  </Link>
                </button>
                <button className="btn btn-outline btn-accent">
                  <Link className="w-full" href="/login">
                    Sign in
                  </Link>
                </button>
              </div>
            ) : (
              <div className="flex flex-col align-top font-primary gap-5 m-2 items-center w-full text-white text-2xl">
                Home page
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
