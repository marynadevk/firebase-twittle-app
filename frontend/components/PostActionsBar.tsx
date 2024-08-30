import React, { FC } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';

type Props = {
  postedAt: string;
  updatedAt?: string;
  authorId: string;
  likes: string[];
  dislikes: string[];
  id: string;
};

const PostActionsBar: FC<Props> = ({
  postedAt,
  likes,
  dislikes,
  authorId,
  id,
}) => {
  
  return (
    <div className="card-actions justify-between items-center">
      <div className="flex items-center">
        <button className="btn btn-ghost btn-sm">
          <AiFillLike />
          <AiOutlineLike />
        </button>
        <button className="btn btn-ghost btn-sm">
          <AiFillDislike />
          <AiOutlineDislike />
        </button>
        <button className="btn btn-ghost btn-sm">
          <BiComment />
        </button>
      </div>
    </div>
  );
};

export default PostActionsBar;
