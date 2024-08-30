import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export const uploadNewImg = async (file: File | null) => {
  if (!file) return;
  const storageRef = ref(storage, `images/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log('File Uploaded Successfully');
    return url;
  } catch (error) {
    console.error('Error uploading the file', error);
  }
};