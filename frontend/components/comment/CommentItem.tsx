import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/IUser';
import AuthorInformation from '../AuthorInformation';
import AuthorActions from '../AuthorActions';
import { IComment } from '@/interfaces/IComment';
import TimeAgo from '../TimeAgo';
import { deleteComment, updateComment } from '@/api/comments';
import { changeComment, removeComment } from '@/lib/features/comments/commentsSlice';
import { toast } from 'react-toastify';
import { set } from 'date-fns';
import { setConfig } from 'next/config';

type Props = {
  comment: IComment;
};

const CommentItem: FC<Props> = ({ comment }) => {
  const [text, setText] = useState(comment.text);
  const { authorId } = comment;
  const [user] = useLocalStorage<null | IUser>('user', null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsAuthor(() => {
      return user?.uid === authorId;
    });
  }, [user, authorId]);

  const handleDelete = () => {
    deleteComment(comment.postId, comment.id).then(() => {
      dispatch(removeComment(comment.id));
    });
  };
  const handleUpdate = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    try {
      updateComment(comment.postId, comment.id, text).then((updatedComment) => {
        dispatch(changeComment(updatedComment.data));
      });
    } catch (error) {
      toast.error('Error updating is failed');
    } finally {
      setIsEdit(false);
    }
  };

  const handleChangePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="card p-2 bg-base-100 shadow-xl w-2/3">
      <div className="card-actions flex justify-between items-center">
        <AuthorInformation author={comment.author} />
        <div className="flex items-center">
          {isAuthor && (
            <AuthorActions
              isEdit={isEdit}
              saveItem={handleSave}
              deleteItem={handleDelete}
              updateItem={handleUpdate}
            />
          )}
          <TimeAgo date={new Date(comment.createdAt)} />
        </div>
      </div>
      {isEdit ? (
        <textarea
          className="textarea textarea-accent"
          value={text}
          onChange={handleChangePost}
        />
      ) : (
        <p className='p-3'>{comment.text}</p>
      )}
    </div>
  );
};

export default CommentItem;
