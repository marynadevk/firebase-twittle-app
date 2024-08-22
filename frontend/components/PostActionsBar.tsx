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
};

const PostActionsBar: FC<Props> = ({ postedAt }) => {
  return (
    <div>
      <div className="card-actions justify-between items-center">
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
      <hr />
      <div className="card-actions justify-end">
        <span className="badge badge-ghost">Posted on {postedAt}</span>
      </div>
    </div>
  );
};

export default PostActionsBar;
