'use client';

import AddBtn from '@/components/AddBtn';
import Header from '@/components/Header';
import LeftSide from '@/components/LeftSide';
import NewPost from '@/components/post/NewPost';
import PostsList from '@/components/post/PostsList';
import Profile from '@/components/profile/Profile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const Home = () => {
  const [token] = useLocalStorage('token', null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <>
      <Header />
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
            <div className="flex flex-col align-top font-primary gap-5 m-2 items-center w-full text-white text-lg">
              Home page
              <Profile />
              {!isOpen && <AddBtn setIsOpen={setIsOpen} />}
            </div>
          )}
          {isOpen && <NewPost setIsOpen={setIsOpen} />}
        </LeftSide>
        <PostsList />
      </div>
    </>
  );
};

export default Home;
