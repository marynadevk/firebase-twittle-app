'use client';

import { ChangeEvent, FC } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  isEdit?: boolean;
};

const UploadImg: FC<Props> = ({ file, setFile, isEdit }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  return (
    <>
      <div className="flex justify-between">
        <label
          htmlFor="upload-photo"
          className="btn btn-outline btn-accent pointer-events-auto"
        >
          {isEdit ? 'Upload New Image' : 'Select Image'}
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          id="upload-photo"
          hidden
        />
      </div>
      {file && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-white text-xs font-extralight">
            {file?.name}
          </span>
          <button
            className="flex btn-circle btn-outline btn-accent justify-center"
            onClick={handleFileDelete}
          >
            <AiOutlineDelete className="fill-white p-0" />
          </button>
        </div>
      )}
      {file && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(file)}
            alt="Selected file"
            className="rounded max-h-64"
          />
        </div>
      )}
    </>
  );
};

export default UploadImg;
