import React, { FC, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { deletePost, updatePost } from '@/api/posts';
import { deleteCommentsByPostId } from '@/api/comments';
import { uploadNewImg } from '@/lib/firebase/uploadNewImg';
import { deleteImgFromStorage } from '@/lib/firebase/deleteImgFromStorage';
import { useAppDispatch } from '@/lib/hooks';
import { removePost } from '@/lib/features/posts/postsSlice';
import { IPost, IUser, ICreatePost } from '@/interfaces/index';
import {
  PostActionsBar,
  AuthorActions,
  UploadImg,
  TimeAgo,
  AuthenticatedActions,
  CommentsSection,
  AuthorInformation,
} from './../index';

type Props = {
  post: IPost;
  isAddComment?: boolean;
};

const PostItem: FC<Props> = ({ post, isAddComment }) => {
  const {
    id,
    image,
    imageName,
    title,
    text,
    createdAt,
    authorId,
    likes = [],
    dislikes = [],
    author,
    comments,
  } = post;
  const [updatePostInfo, setUpdatePostInfo] = useState<ICreatePost>({
    title,
    text,
    image,
    likes,
    dislikes,
  });
  const [user] = useLocalStorage<null | IUser>('user', null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [token] = useLocalStorage('token', null);
  const dispatch = useAppDispatch();

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
    uploadNewImg(selectedFile).then((uploadedImage) => {
      if (!uploadedImage) {
        uploadedImage = { url: image, fileName: imageName };
      }
      const updatedPost = {
        ...updatePostInfo,
        image: uploadedImage.url,
        imageName: uploadedImage.fileName,
        authorId: post.authorId,
      };
      updatePost(id, updatedPost).then(() => {
        setUpdatePostInfo((prevState) => ({
          ...prevState,
          imageName: uploadedImage.fileName,
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
    setUpdatePostInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    dispatch(removePost(id));
    deletePost(id).then(() => {
      if (!comments) return;
      deleteCommentsByPostId(id);
    });
    if (!imageName) return;
    deleteImgFromStorage(imageName);
  };

  return (
    <div className="card p-1 w-full shadow-xl flex justify-start bg-gray-200">
      <div className="card-actions flex justify-between items-center p-2">
        <AuthorInformation author={author} />
        <div className="flex items-center">
          {isAuthor && (
            <AuthorActions
              isEdit={isEdit}
              saveItem={handleSave}
              deleteItem={handleDelete}
              updateItem={handleUpdate}
            />
          )}
          <TimeAgo date={new Date(createdAt)} />
        </div>
      </div>
      <div className="divider divider-accent mb-0 mt-0 m-2" />
      <figure className="flex justify-start content-start w-36">
        {image && <img src={updatePostInfo.image} alt="post-image" />}
      </figure>
      <div className="card-body p-1">
        {isEdit ? (
          <>
            <input
              type="text"
              name="title"
              onChange={handleChangePost}
              value={updatePostInfo.title}
            />
            <textarea
              typeof="text"
              name="text"
              onChange={handleChangePost}
              value={updatePostInfo.text}
            />
            <UploadImg file={selectedFile} setFile={setSelectedFile} isEdit />
          </>
        ) : (
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <h2 className="collapse-title text-xl font-medium flex justify-between items-center">
              {updatePostInfo.title}
              <span className="font-extralight text-sm">show text</span>
            </h2>
            <div className="collapse-content">
              <p>{updatePostInfo.text}</p>
            </div>
          </div>
        )}
        <hr />
        <PostActionsBar>
          {token ? (
            <AuthenticatedActions
              id={id}
              likes={likes}
              dislikes={dislikes}
              comments={comments}
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
        {isAddComment && <CommentsSection postId={id} />}
      </div>
    </div>
  );
};

export default PostItem;
