'use client';
import React from 'react';
import LeftSide from '@/components/LeftSide';
import PostsList from '@/components/post/PostsList';
import Header from '@/components/Header';
import Profile from '@/components/profile/Profile';
import GoBack from '@/components/GoBack';

const UserProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log('id:', id);
  return (
    <>
      <Header />
      <div className="flex">
        <LeftSide>
          <div className="flex flex-col justify-center gap-5">
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
