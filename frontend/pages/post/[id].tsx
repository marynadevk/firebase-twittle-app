'use client';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { LeftSide, Header, GoBack, PostItem } from '@/components/index';
import { getPostById } from '@/api/posts';
import { IPost } from '@/interfaces/index';
import { useRouter } from 'next/router';

const PostPage = () => {
  const [post, setPost] = useState<IPost | null>(null);

  const router = useRouter();
  const id = router.query.id?.toString();

  useEffect(() => {
    if (!id) {
      return;
    }

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
        <LeftSide pageName="Post">
          <div className="flex flex-col justify-center gap-5 w-full">
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
