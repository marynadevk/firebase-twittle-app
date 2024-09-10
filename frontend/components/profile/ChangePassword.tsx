import React, { FormEvent, useState } from 'react';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { auth } from '@/lib/firebase/firebase.config';

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
      toast.error('Passwords don`t match');
      return;
    }
    if (!currentUser) return;

    await reauthenticateWithCredential(
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
          className="input input-bordered input-accent flex items-center font-semibold text-stone-800 text-sm"
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
