import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LeftSide: FC<Props> = ({ children }) => {
  return <div className="flex h-screen p-5 flex-shrink-0 w-3/12 bg-gray-800">{children}</div>;
};

export default LeftSide;
