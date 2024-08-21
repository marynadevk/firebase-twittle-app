'use client';
import React, { FC, ReactNode, useState } from 'react';
// import ModalPortal from './ModalPortal';

type Props = {
  setIsOpen: (value: boolean) => void;
};

const NewPost: FC<Props> = ({ setIsOpen }) => {
  const [post, setPost] = useState('');
  const createPost = async () => {
    if (post === '') {
      return;
    }
    await createPost();
    setPost('');
  };
  return (
    <div className=" p-6 rounded flex flex-col h-max">
      <label>
        <textarea
          className="textarea textarea-accent w-full"
          placeholder="Tell us what's on your mind..."
        ></textarea>
      </label>
      <div className="flex gap-5">
        <button
          className="btn btn-outline btn-accent w-44"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        <button className="btn btn-outline btn-accent w-44">Create Post</button>
      </div>
    </div>
  );
};

export default NewPost;
