import React, { FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FaSave } from "react-icons/fa";

type Props = {
  updateItem: () => void;
  deleteItem: () => void;
  saveItem: () => void;
  isEdit: boolean;
};

const AuthorActions: FC<Props> = ({ updateItem, deleteItem, isEdit, saveItem }) => {
  return (
    <div>
      {isEdit ? (
        <button className="btn btn-ghost btn-sm" onClick={saveItem}>
          <FaSave />
        </button>
      ) : (
        <button className="btn btn-ghost btn-sm" onClick={updateItem}>
          <AiFillEdit />
        </button>
      )}
      <button className="btn btn-ghost btn-sm" onClick={deleteItem}>
        <AiFillDelete />
      </button>
    </div>
  );
};

export default AuthorActions;
