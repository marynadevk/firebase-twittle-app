import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const PostActionsBar: FC<Props> = ({ children }) => {
  return (
    <div className="card-actions justify-between items-center">{children}</div>
  );
};

export default PostActionsBar;
