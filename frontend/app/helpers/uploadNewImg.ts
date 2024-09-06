import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { toast } from 'react-toastify';

export interface IUploadNewImg {
  fileName: string | undefined;
  url: string | undefined;
}

export const uploadNewImg = async (
  file: File | null
): Promise<IUploadNewImg | null> => {
  if (!file) return null;
  const fileName = Date.now() + file.name;
  const storageRef = ref(storage, `images/${fileName}`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return { fileName, url };
  } catch (error) {
    toast.error('Error uploading the file');
    return null;
  }
};
