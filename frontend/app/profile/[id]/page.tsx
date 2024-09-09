'use client';
import React from 'react';
import LeftSide from '@/components/LeftSide';
import PostsList from '@/components/post/PostsList';
import Header from '@/components/Header';
import Profile from '@/components/profile/Profile';
import GoBack from '@/components/GoBack';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer } from 'react-toastify';

const UserProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  injectStyle();
  return (
    <>
      <Header />
      <div className="flex">
        <ToastContainer autoClose={500} />
        <LeftSide>
          <div className="flex flex-col justify-center gap-5 w-full">
            <div className="flex justify-center text-white text-lg">
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
