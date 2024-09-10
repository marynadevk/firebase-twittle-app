'use client';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import {LeftSide, Header, GoBack, PostItem} from '@/components/index';
import { getPostById } from '@/api/posts';
import { IPost } from '@/interfaces/index';


const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    getPostById(id)
      .then((response) => setPost(response.data))
      .catch(() => toast.error('Error fetching post'));
  }, [id]);

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
