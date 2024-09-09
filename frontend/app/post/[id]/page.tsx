'use client';

import React, { useEffect, useState } from 'react';
import LeftSide from '@/components/LeftSide';
import Header from '@/components/Header';
import GoBack from '@/components/GoBack';
import PostItem from '@/components/post/PostItem';
import { getPostById } from '@/api/posts';
import { IPost } from '@/interfaces/IPost';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    getPostById(id)
      .then((response) => setPost(response.data))
      .catch(() => toast.error('Error fetching post'));
  }, [id]);

  injectStyle();

  return (
    <>
      <Header />
      <div className="flex">
        <ToastContainer autoClose={500} />
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
