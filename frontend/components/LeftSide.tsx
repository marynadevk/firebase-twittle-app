import { useAppSelector } from '@/lib/hooks';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  pageName: string;
};

const LeftSide: FC<Props> = ({ children, pageName }) => {
  const {isAuthenticated} = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-5 min-h-screen h-auto p-5 flex-shrink-0 w-3/12 bg-gray-800">
      <div className="flex justify-center text-white text-2xl">
        <span>{pageName} page</span>
      </div>
      {children}
    </div>
  );
};

export default LeftSide;
