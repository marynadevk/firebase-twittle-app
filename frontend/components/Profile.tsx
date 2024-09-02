import { IUser } from '@/interfaces/IUser';
import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

const Profile = () => {
  const [user] = useLocalStorage<null | IUser>('user', null);
  if (!user) {
    return null;
  }
console.log('PROFILE', user);

  const { fullName, email, avatarUrl } = user;
  return (
    <div>
      <div className="badge badge-accent badge-outline">{fullName}</div>
      
      <div className="avatar">
        <div className="mask mask-squircle w-24">
          <img src={avatarUrl} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
