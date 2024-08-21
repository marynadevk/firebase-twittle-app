import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { dbFirestore } from '@/lib/firebase';

export const createNewPost = async (
  authorId: string,
  post: string,
) => {
  const postsCollection = collection(dbFirestore, 'posts');
  try {
    const newPost = {
      authorId,
      content: post,
      time: serverTimestamp(),
    };

    await addDoc(postsCollection, newPost);

  } catch (error: any) {
    throw new Error('Error creating post:', error.message);
  }
};