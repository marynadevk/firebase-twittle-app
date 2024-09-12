import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { reAuthWithCredential } from '@/lib/firebase/reAuthWithCredential';
import { ERROR_MESSAGE, AUTH_ERROR } from '@/constants/constants';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/index';
import { deleteUserProfile } from '@/api/users';

const DeleteProfile = () => {
  const [password, setPassword] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [_token, _setToken, removeToken] = useLocalStorage('token', null);
  const [_user, _setUser, removeUser] = useLocalStorage<null | IUser>(
    'user',
    null
  );
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDeleteProfile = async (password: string) => {
    reAuthWithCredential(password)
      .then(() => {
        return deleteUserProfile();
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Profile deleted successfully');
          removeToken();
          removeUser();
          toast.success('Logged out');
        } else {
          toast.error(ERROR_MESSAGE.genericError);
        }
      })
      .catch((error) => {
        if (error.code === AUTH_ERROR.invalidCred) {
          toast.error(ERROR_MESSAGE.wrongPassword);
        } else {
          toast.error(ERROR_MESSAGE.deletingError);
        }
      });
  };

  const handleConfirmClick = () => {
    setIsConfirming(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {!isConfirming ? (
        <button
          className="btn btn-outline btn-error w-32"
          onClick={handleConfirmClick}
        >
          Delete Profile
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-lg font-bold text-red-600">
            Delete Your Profile
          </h1>
          <p className="text-gray-600 text-sm">
            This action is irreversible! Please confirm by entering your
            password.
          </p>
          <form className=" flex flex-col gap-4 w-full">
            <input
              autoComplete="current-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="input-bordered input-error w-full h-10 text-gray-900 text-sm"
            />
            <button
              type="button"
              className="btn btn-danger w-full btn-outline btn-error"
              onClick={() => handleDeleteProfile(password)}
            >
              Confirm Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteProfile;
