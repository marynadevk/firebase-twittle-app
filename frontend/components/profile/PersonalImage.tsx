import React, { FC, useState } from 'react';
import { updateProfile, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase.config';
import { uploadNewImg } from '@/lib/firebase/uploadNewImg';

type Props = {
  avatarUrl: string;
};

const PersonalImage: FC<Props> = ({ avatarUrl }) => {
  const [selectedImage, setSelectedImage] = useState(avatarUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && auth.currentUser) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      if (!auth.currentUser) return;

      uploadNewImg(file).then((image) => {
        updateProfile(auth.currentUser as User, {
          photoURL: image?.url,
        }).then(() => {});
      });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="personal-image">
      <label>
        <input type="file" onChange={handleImageChange} />
        <figure className="personal-figure">
          <img src={selectedImage} className="personal-avatar" alt="avatar" />
          <figcaption className="personal-figcaption">
            <img
              src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
              alt="camera icon"
            />
          </figcaption>
        </figure>
      </label>
    </div>
  );
};

export default PersonalImage;
