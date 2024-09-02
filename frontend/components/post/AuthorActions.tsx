import React, { FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FaSave } from "react-icons/fa";

type Props = {
  updatePost: () => void;
  deletePost: () => void;
  savePost: () => void;
  isEdit: boolean;
};

const AuthorActions: FC<Props> = ({ updatePost, deletePost, isEdit, savePost }) => {
  return (
    <div>
      {isEdit ? (
        <button className="btn btn-ghost btn-sm" onClick={savePost}>
          <FaSave />
        </button>
      ) : (
        <button className="btn btn-ghost btn-sm" onClick={updatePost}>
          <AiFillEdit />
        </button>
      )}
      <button className="btn btn-ghost btn-sm" onClick={deletePost}>
        <AiFillDelete />
      </button>
    </div>
  );
};

export default AuthorActions;
