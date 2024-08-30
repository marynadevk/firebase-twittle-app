import { IPost } from '@/interfaces/IPost';
import React, { FC, useEffect, useState } from 'react';
import PostActionsBar from './PostActionsBar';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/IUser';
import AuthorActions from './AuthorActions';
import { deletePost, updatePost } from '@/api/posts';
import { ICreatePost } from '@/interfaces/ICreatePost';
import UploadImg from './UploadImg';
import { uploadNewImg } from '@/app/helpers/uploadNewImg';

type Props = {
  post: IPost;
};

const PostItem: FC<Props> = ({ post }) => {
  const { image, title, text, createdAt, authorId, likes, dislikes } = post;
  const [updatePostInfo, setUpdatePosInfo] = useState<ICreatePost>({
    title,
    text,
    image,
  });
  const postedAt = new Date(createdAt).toISOString().split('T')[0];
  const [user] = useLocalStorage<null | IUser>(
    'user',
    null
  );
  const [isEdit, setIsEdit] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setIsAuthor(() => {
      return user?.uid === authorId;
    });
  }, [user, authorId]);

  const handleUpdate = () => {
    setIsEdit(true);
  };
  const handleSave = () => {
    if (!updatePostInfo) return;
    uploadNewImg(selectedFile).then((url) => {
      const updatedPost = {
        ...updatePostInfo,
        image: url,
      };
      updatePost(post.id, updatedPost).then(() => {
        setUpdatePosInfo((prevState) => ({
          ...prevState,
          image: url,
        }));
      });
      setIsEdit(false);
    });
  };

  const handleChangePost = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUpdatePosInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  console.log('updatePostInfo', updatePostInfo);

  return (
    <div className="card card-compact w-full shadow-xl flex justify-start">
      <div className="card-actions justify-end">
        <span className="badge badge-ghost">Posted on {postedAt}</span>
      </div>
      <figure className="flex justify-start content-start w-36">
        {image && <img src={updatePostInfo.image} alt="post-image" />}
      </figure>
      <div className="card-body">
        {isEdit ? (
          <>
            <input
              name="title"
              onChange={handleChangePost}
              value={updatePostInfo.title}
            />
            <textarea
              name="text"
              onChange={handleChangePost}
              value={updatePostInfo.text}
            />
            <UploadImg file={selectedFile} setFile={setSelectedFile} isEdit />
          </>
        ) : (
          <>
            <h2 className="card-title">{updatePostInfo.title}</h2>
            <p>{updatePostInfo.text}</p>
          </>
        )}
        <hr />
        <PostActionsBar
          id={post.id}
          likes={likes}
          dislikes={dislikes}
          postedAt={postedAt}
          authorId={authorId}
        />
      </div>
      {isAuthor && (
        <AuthorActions
          isEdit={isEdit}
          savePost={handleSave}
          deletePost={handleDelete}
          updatePost={handleUpdate}
        />
      )}
    </div>
  );
};

export default PostItem;
