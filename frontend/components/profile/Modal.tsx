import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { auth } from '@/lib/firebase/firebase.config';
import { updateEmail, updateProfile, User } from 'firebase/auth';
import { PersonalImage, ChangePassword } from '../index';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

enum Fields {
  FULLNAME = 'fullName',
  EMAIL = 'email',
}

const Modal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isEdit, setIsEdit] = useState({
    fullName: false,
    email: false,
  });
  const currentUser = auth.currentUser as User;
  const [updatedUser, setUpdatedUser] = useState({
    fullName: currentUser.displayName,
    email: currentUser.email,
    avatarUrl: currentUser.photoURL,
  });
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const handleIsEdit = (field: string) => {
    setIsEdit((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveField = async (field: string) => {
    if (!currentUser) return;
    try {
      if (field === Fields.FULLNAME) {
        await updateProfile(currentUser, {
          displayName: updatedUser.fullName,
        });
      } else if (field === Fields.EMAIL && updatedUser.email) {
        await updateEmail(currentUser, updatedUser.email);
      }
    } finally {
      setIsEdit((prevState) => ({
        ...prevState,
        [field]: false,
      }));
    }
  };

  return (
    <>
      <dialog className="modal modal-bottom sm:modal-middle" ref={modalRef}>
        <div className="modal-box flex flex-col items-center gap-5 min-w-max">
          <h3 className="font-bold text-xl">Edit profile</h3>
          <form className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-2">
                {Object.values(Fields).map((field) => (
                  <div key={field}>
                    {!isEdit[field] ? (
                      <div className="badge badge-accent badge-outline h-12 w-96 gap-2">
                        {field}: {updatedUser?.[field]}
                        <button
                          className="btn btn-ghost btn-sm btn-circle"
                          onClick={() => handleIsEdit(field)}
                        >
                          <AiFillEdit />
                        </button>
                      </div>
                    ) : (
                      <label className="input input-bordered input-accent flex items-center font-semibold text-stone-800 w-96">
                        {field}:
                        <input
                          type="text"
                          className="grow font-light text-end"
                          name={field}
                          value={updatedUser[field] as string}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-circle"
                          onClick={() => handleSaveField(field)}
                        >
                          <MdDone />
                        </button>
                      </label>
                    )}
                  </div>
                ))}
              </div>
              <PersonalImage avatarUrl={currentUser.photoURL as string} />
            </div>
            <h4 className="font-bold text-sm">Change password</h4>

            <ChangePassword />

            <div className="modal-action">
              <button
                className="btn btn-outline accent-inherit"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
