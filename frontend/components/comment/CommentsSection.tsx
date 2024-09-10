'use strict';

import React, { FC, useEffect } from 'react';
import { getComments } from '@/api/comments';
import { loadComments } from '@/lib/features/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { startLoading, stopLoading } from '@/lib/features/loader/loaderSlice';
import {LoaderDots, CommentForm, CommentItem} from '../index';

type Props = {
  postId: string;
};

const CommentsSection: FC<Props> = ({ postId }) => {
  const { comments } = useAppSelector((state) => state.comments);
  const { isLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startLoading());
    getComments(postId)
      .then((comments) => {
        dispatch(loadComments(comments.data));
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  }, []);

  return (
    <div className="p-10 flex flex-col">
      Comments
      {isLoading && <LoaderDots />}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment p-4">
            <CommentItem comment={comment} />
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentsSection;
