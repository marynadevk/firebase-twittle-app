import { IPost } from '@/interfaces/IPost';
import React, { FC, useEffect, useState } from 'react';
import PostActionsBar from './PostActionsBar';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/IUser';
import AuthorActions from './AuthorActions';
import { deletePost, updatePost } from '@/api/posts';
import { ICreatePost } from '@/interfaces/ICreatePost';
import UploadImg from '../UploadImg';
import { uploadNewImg } from '@/app/helpers/uploadNewImg';
import { deleteImgFromStorage } from '@/app/helpers/deleteImgFromStorage';
import AuthenticatedActions from './AuthenticatedActions';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import AuthorInformation from './AuthorInformation';

type Props = {
  post: IPost;
};

const PostItem: FC<Props> = ({ post }) => {
  const {
    image,
    imageName,
    title,
    text,
    createdAt,
    authorId,
    likes = [],
    dislikes = [],
    author,
  } = post;
  const [updatePostInfo, setUpdatePosInfo] = useState<ICreatePost>({
    title,
    text,
    image,
    likes,
    dislikes,
  });
  const postedAt = new Date(createdAt).toISOString().split('T')[0];
  const [user] = useLocalStorage<null | IUser>('user', null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [token] = useLocalStorage('token', null);

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
      if (!url) {
        url = image;
      }
      const updatedPost = {
        ...updatePostInfo,
        image: url,
        imageName: selectedFile?.name,
      };
      updatePost(post.id, updatedPost).then(() => {
        setUpdatePosInfo((prevState) => ({
          ...prevState,
          imageName: selectedFile?.name,
        }));
        if (!imageName) return;
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
    if (!imageName) return;
    deleteImgFromStorage(imageName);
  };

  return (
    <div className="card card-compact w-full shadow-xl flex justify-start bg-gray-200">
      <div className="card-actions flex justify-between items-center p-4">
        <AuthorInformation author={author} />
        <div className="flex items-center">
          {isAuthor && (
            <AuthorActions
              isEdit={isEdit}
              savePost={handleSave}
              deletePost={handleDelete}
              updatePost={handleUpdate}
            />
          )}
          <div className="badge badge-ghost">Posted on {postedAt}</div>
        </div>
      </div>
      <div className="divider divider-accent mb-0 mt-0 m-3" />
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
        <PostActionsBar>
          {token ? (
            <AuthenticatedActions
              id={post.id}
              likes={likes}
              dislikes={dislikes}
            />
          ) : (
            <div className="flex items-center gap-2">
              <AiFillLike />
              <span>{likes.length}</span>
              <AiFillDislike />
              <span>{dislikes.length}</span>
            </div>
          )}
        </PostActionsBar>
      </div>
    </div>
  );
};

export default PostItem;
