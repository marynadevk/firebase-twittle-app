import React, { FC, useEffect, useState } from 'react';
import Modal from './Modal';
import { auth } from '@/lib/firebase/firebase.config';
import { User } from 'firebase/auth';
import { getUser } from '@/api/users';
import DeleteProfile from './DeleteProfile';

type Props = {
  userId?: string;
};

const Profile: FC<Props> = ({ userId = auth.currentUser?.uid }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    }
  });

  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName,
    photoURL: currentUser?.photoURL,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    setIsAuthor(userId === currentUser?.uid);
    if (userId) {
      getUser(userId).then((user) => {
        const { name, photoUrl } = user.data;
        setProfileData({
          displayName: name,
          photoURL: photoUrl,
        });
      });
    }
  }, [currentUser, userId]);

  return (
    <div className="flex flex-col w-full items-end">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-5 items-center">
          <div className="avatar">
            <div className="mask mask-squircle w-24">
              <img src={profileData.photoURL as string} />
            </div>
          </div>
          <div className="badge badge-lg badge-accent badge-outline">
            {profileData.displayName}
          </div>
        </div>
        {isAuthor && (
          <div className="flex">
            <button
              className="btn btn-outline btn-accent w-32"
              onClick={() => setIsOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
        {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
      {isAuthor && <DeleteProfile />}
    </div>
  );
};

export default Profile;
