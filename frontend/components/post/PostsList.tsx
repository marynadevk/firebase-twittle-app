'use client';
import React, { FC, useEffect, useState } from 'react';
import PostItem from './PostItem';
import { getPosts, getUsersPosts } from '@/api/posts';
import { IPost } from '@/interfaces/IPost';

type Props = {
  authorId?: string;
};

const PostsList: FC<Props> = ({ authorId }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (authorId) {
          const response = await getUsersPosts(authorId);
          setPosts(response.data);
        } else {
        const response = await getPosts();
        setPosts(response.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full flex flex-col gap-5 p-5">
      {posts.map((post: IPost) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
