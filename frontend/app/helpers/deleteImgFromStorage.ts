import { ref, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { toast } from 'react-toastify';

export const deleteImgFromStorage = async (fileName: string) => {
  const storageRef = ref(storage, `images/${fileName}`);
  try {
    await deleteObject(storageRef);
  } catch (error) {
    toast.error('Error deleting the file');
  }
};
