'use client';
import React, { FC, useEffect, useState } from 'react';
import PostItem from './PostItem';
import { getPosts, getUsersPosts } from '@/api/posts';
import { IPost } from '@/interfaces/IPost';
import { loadPosts, loadUsersPosts } from '@/lib/features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';

type Props = {
  authorId?: string;
};

const PostsList: FC<Props> = ({ authorId }) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (authorId) {
          const response = await getUsersPosts(authorId);
          dispatch(loadUsersPosts({posts: response.data, authorId}));
        } else {
          const response = await getPosts();
          dispatch(loadPosts(response.data));
        }
      } catch (error) {
        toast.error('Error loading posts');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="join join-vertical w-full flex flex-col gap-5 p-5">
      {posts.map((post: IPost) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
