import { auth } from '@/lib/firebase';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import React, { FormEvent, useState } from 'react';
import { MdDone } from 'react-icons/md';

enum Fields {
  OLDPASSWORD = 'oldPassword',
  NEWPASSWORD = 'newPassword',
  CONFIRMPASSWORD = 'confirmPassword',
}

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const currentUser = auth.currentUser;

    const comparePasswords =
      passwordData.newPassword === passwordData.confirmPassword;
    if (!comparePasswords) {
      console.log('Passwords don`t match');
      return;
    }
    if (!currentUser) return;

    const authenticated = await reauthenticateWithCredential(
      currentUser,
      EmailAuthProvider.credential(
        currentUser.email as string,
        passwordData.oldPassword
      )
    );
    updatePassword(currentUser, passwordData.newPassword);
  };

  return (
    <div className="flex flex-col gap-2">
      {Object.values(Fields).map((field) => (
        <label
          key={field}
          className="input input-bordered input-accent flex items-center font-semibold text-sm"
        >
          {field}:
          <input
            autoComplete={field}
            type="password"
            className="grow font-light text-end"
            name={field}
            value={passwordData[field]}
            onChange={handleChange}
          />
        </label>
      ))}
      <button
        type="button"
        className="btn btn-outline accent-inherit"
        onClick={handleSaveChanges}
      >
        <MdDone />
      </button>
    </div>
  );
};

export default ChangePassword;
