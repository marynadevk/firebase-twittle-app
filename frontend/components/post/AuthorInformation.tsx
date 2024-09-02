import { IAuthor } from '@/interfaces/IAuthor';
import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  author: IAuthor;
};

const AuthorInformation: FC<Props> = ({ author }) => {
  return (
    <Link className="flex gap-4 items-center" href={`/user-profile/${author.id}`}>
      <div className="avatar">
        <div className="w-8 rounded">
          <img src={author.photoUrl} alt="author image" />
        </div>
      </div>
      <div className="badge badge-accent badge-outline">{author.name}</div>
    </Link>
  );
};

export default AuthorInformation;
