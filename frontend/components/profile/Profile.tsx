import { IUser } from '@/interfaces/IUser';
import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Modal from './Modal';


const Profile = () => {
  const [user] = useLocalStorage<null | IUser>('user', null);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  const { fullName, avatarUrl } = user;
  return (
    <div className="flex justify-start w-full items-center">
      <div className="flex justify-start w-full items-center gap-4">
        <div className="avatar">
          <div className="mask mask-squircle w-24">
            <img src={avatarUrl} />
          </div>
        </div>
        <div className="badge badge-accent badge-outline">{fullName}</div>
      </div>

      <button
        className="btn btn-outline btn-accent"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </button>
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Profile;
