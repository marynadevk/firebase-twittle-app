'use client';

import AddPostBtn from '@/components/AddPostBtn';
import Header from '@/components/Header';
import LeftSide from '@/components/LeftSide';
import NewPost from '@/components/NewPost';
import Link from 'next/link';
import { useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authenticated = useReadLocalStorage('token');
  return (
    <>
      <Header />
      <div className="flex">
        <LeftSide>
          {!authenticated ? (
            <div className="flex flex-col flex-grow gap-2">
              <button className="btn btn-outline btn-accent">
                <Link className="w-full" href="/register">
                  Sign up
                </Link>
              </button>
              <button className="btn btn-outline btn-accent">
                <Link className="w-full" href="/login">Sign in</Link>
              </button>
            </div>
          ) : (
            <div className="flex align-top h-screen font-primary m-2">
              {!isOpen && <AddPostBtn setIsOpen={setIsOpen} />}
            </div>
          )}
          {isOpen && <NewPost setIsOpen={setIsOpen} />}
        </LeftSide>
      </div>
    </>
  );
};

export default Home;
