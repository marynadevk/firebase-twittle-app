'use client';
import React, { FC, useEffect, useState } from 'react';
import PostItem from './PostItem';
import { getPosts, getUsersPosts } from '@/api/posts';
import { IPost } from '@/interfaces/IPost';
import { getMorePosts, loadPosts } from '@/lib/features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';
import LoaderDots from '../LoaderDots';
import { startLoading, stopLoading } from '@/lib/features/loader/loaderSlice';

type Props = {
  authorId?: string;
};

const PAGE_SIZE = 6;

const PostsList: FC<Props> = ({ authorId }) => {
  const [lastPost, setLastPost] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { posts } = useAppSelector((state) => state.posts);
  const { isLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();

  const loadMorePosts = async () => {
    try {
      if (!lastPost) {
        return;
      }
      const { posts, lastDoc } = (await getPosts(lastPost, authorId, PAGE_SIZE))
        .data;
      setHasMore(posts.length === PAGE_SIZE);
      if (posts.length === PAGE_SIZE) {
        posts.length = posts.length - 1;
      }
      setLastPost(lastDoc);
      dispatch(getMorePosts(posts));
    } catch (error) {
      toast.error('Error loading posts');
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch(startLoading());
        const { posts, lastDoc } = (
          await getPosts(lastPost, authorId, PAGE_SIZE)
        ).data;
        setHasMore(posts.length === PAGE_SIZE);
        if (posts.length === PAGE_SIZE) {
          posts.length = posts.length - 1;
        }
        setLastPost(lastDoc);
        dispatch(loadPosts(posts));
      } catch (error) {
        toast.error('Error loading posts');
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="join join-vertical w-full flex flex-col gap-5 p-5">
      {isLoading && <LoaderDots />}

      {posts.map((post: IPost) => (
        <PostItem key={post.id} post={post} />
      ))}
      <div className="flex justify-center">
        {hasMore && (
          <button
            type="button"
            className="btn btn-outline btn-accent w-44"
            onClick={loadMorePosts}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default PostsList;
