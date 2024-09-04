import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const GoBack = () => {
  const router = useRouter();
  return (
    <button className="btn btn-outline btn-accent btn-xs w-20" onClick={router.back}>
      <MdArrowBack />
      Back
    </button>
  );
};

export default GoBack;
