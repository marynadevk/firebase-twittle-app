'use client';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { getPosts } from '@/api/posts';
import { IPost } from '@/interfaces/IPost';

const PostsList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
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
