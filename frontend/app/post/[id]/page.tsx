'use client';
import React, { useEffect, useState } from 'react';
import LeftSide from '@/components/LeftSide';
import Header from '@/components/Header';
import Profile from '@/components/profile/Profile';
import GoBack from '@/components/GoBack';
import PostItem from '@/components/post/PostItem';
import { getPostById } from '@/api/posts';
import { IPost } from '@/interfaces/IPost';
import { auth } from '@/lib/firebase';

const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    getPostById(id)
      .then((response) => setPost(response.data))
      .catch((error) => console.error('Error fetching post:', error));
  }, [id]);
  return (
    <>
      <Header />
      <div className="flex">
        <LeftSide>
          <div className="flex flex-col justify-center gap-5 w-full">
            <div className="flex justify-center text-white text-lg">
              <span>Post page</span>
            </div>
            <GoBack />
          </div>
        </LeftSide>
        {post ? (
          <PostItem post={post as IPost} isAddComment={true} />
        ) : (
          <span className="loading loading-dots loading-lg text-accent"></span>
        )}
      </div>
    </>
  );
};

export default PostPage;
