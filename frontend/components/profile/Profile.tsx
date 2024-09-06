import React, { FC, useEffect, useState } from 'react';
import Modal from './Modal';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { getUser } from '@/api/users';

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
        const {name, photoUrl} = user.data;
        setProfileData({
          displayName: name,
          photoURL: photoUrl,
        });
      });
    }
  }, [currentUser, userId]);

  return (
    <div className="flex justify-start w-full items-center">
      <Link
        href={`/profile/${userId}`}
        className="flex justify-start w-full items-center gap-4"
      >
        <div className="avatar">
          <div className="mask mask-squircle w-24">
            <img src={profileData.photoURL as string} />
          </div>
        </div>
        <div className="badge badge-accent badge-outline">
          {profileData.displayName}
        </div>
      </Link>

      {isAuthor && (
        <button
          className="btn btn-outline btn-accent"
          onClick={() => setIsOpen(true)}
        >
          Edit Profile
        </button>
      )}
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Profile;
