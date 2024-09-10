import { ERROR_MESSAGE } from '@/app/constants/constants';
import { auth } from '@/lib/firebase/firebase.config';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export const reAuthWithCredential = async (password: string): Promise<void> => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error(ERROR_MESSAGE.unauthenticated);
    }
    const credential = EmailAuthProvider.credential(user.email!, password);
    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    throw error;
  }
};
