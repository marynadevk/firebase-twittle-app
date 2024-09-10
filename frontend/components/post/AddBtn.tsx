import React, { FC } from 'react';

type Props = {
  setIsOpen: (value: boolean) => void;
};
const AddBtn: FC<Props> = ({ setIsOpen }) => {
  return (
    <div>
      <button
        className="btn btn-circle btn-outline btn-accent size-14"
        onClick={() => setIsOpen(true)}
      >
        <svg
          fill="#37cdbe"
          height="30px"
          width="30px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 455 455"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 455,242.5 "></polygon>{' '}
          </g>
        </svg>
      </button>
    </div>
  );
};

export default AddBtn;
