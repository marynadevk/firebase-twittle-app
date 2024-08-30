import { ref, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export const deleteImgFromStorage = async (fileName: string) => {
  console.log('Deleting file:', fileName);
  const storageRef = ref(storage, `images/${fileName}`);
  try {
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting the file', error);
  }
};
