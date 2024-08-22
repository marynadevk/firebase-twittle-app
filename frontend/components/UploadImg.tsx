'use client';

import { ChangeEvent, FC } from 'react';

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const UploadImg: FC<Props> = ({ file, setFile }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex justify-between">
      <label
        htmlFor="upload-photo"
        className="btn btn-outline btn-accent pointer-events-auto"
      >
        Select Image
      </label>
      <input type="file" onChange={handleFileChange} id="upload-photo" />
    </div>
  );
};

export default UploadImg;
