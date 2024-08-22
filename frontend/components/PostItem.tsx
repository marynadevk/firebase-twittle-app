import { IPost } from '@/interfaces/IPost';
import React, { FC } from 'react';
import PostActionsBar from './PostActionsBar';

type Props = {
  post: IPost;
};

const PostItem: FC<Props> = ({ post }) => {
  const { image, title, text, createdAt } = post;
  const postedAt = new Date(createdAt).toISOString().split('T')[0];
  return (
    <div className="card card-compact w-full shadow-xl flex justify-start">
      <figure className="flex justify-start content-start w-36">
        {image && <img src={image} alt="post-image" />}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
        <PostActionsBar postedAt={postedAt} />
      </div>
    </div>
  );
};

export default PostItem;
