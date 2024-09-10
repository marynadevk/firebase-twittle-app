'use client';

import React, { useEffect } from 'react';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer } from 'react-toastify';
import {
  LeftSide,
  PostsList,
  Header,
  Profile,
  GoBack,
} from '@/components/index';


const UserProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  useEffect(() => {
    injectStyle();
  }, []);
  return (
    <>
      <Header />
      <div className="flex">
        <ToastContainer autoClose={500} />
        <LeftSide>
          <div className="flex flex-col justify-center gap-5 w-full">
            <div className="flex justify-center text-white text-2xl">
              <span>Profile page</span>
            </div>
            <GoBack />
            <Profile userId={id} />
          </div>
        </LeftSide>
        <PostsList authorId={id} />
      </div>
    </>
  );
};

export default UserProfilePage;
