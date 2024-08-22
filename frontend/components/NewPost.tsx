'use client';
import React, { ChangeEvent, FC, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import UploadImg from './UploadImg';
import { ICreatePost } from '@/interfaces/ICreatePost';
import { createPost } from '@/api/posts';

type Props = {
  setIsOpen: (value: boolean) => void;
};

const NewPost: FC<Props> = ({ setIsOpen }) => {
  const [file, setFile] = useState<File | null>(null);
  const [post, setPost] = useState<ICreatePost>({
    title: '',
    text: '',
  });

  const handleUpload = async () => {
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log('File Uploaded Successfully');
      return url;
    } catch (error) {
      console.error('Error uploading the file', error);
    }
  };

  const createNewPost = async () => {
    if (!post.text || !post.title) {
      return;
    }
    const url = await handleUpload();
    const newPost = {
      ...post,
      image: url,
    };
    createPost(newPost);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className=" p-6 rounded flex flex-col h-max gap-5">
      <label>
        <span className="text-base label-text text-white">Post Title</span>
        <input
          type="text"
          className="input input-accent w-full"
          placeholder="Title"
          value={post.title}
          name="title"
          onChange={handleChange}
        />
      </label>
      <label>
        <textarea
          className="textarea textarea-accent w-full"
          placeholder="Tell us what's on your mind..."
          value={post.text}
          name="text"
          onChange={handleChange}
        ></textarea>
      </label>
      <UploadImg file={file} setFile={setFile} />
      <div className="flex gap-5">
        <button
          className="btn btn-outline btn-accent w-44"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        <button
          className="btn btn-outline btn-accent w-44"
          onClick={createNewPost}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default NewPost;
