import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { envFirebase } from '../config';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: envFirebase.apiKey,
  authDomain: envFirebase.authDomain,
  projectId: envFirebase.projectId,
  storageBucket: envFirebase.storageBucket,
  messagingSenderId: envFirebase.messagingSenderId,
  appId: envFirebase.appId,
};

const app = initializeApp(firebaseConfig);
const dbFirestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, dbFirestore, auth, storage };
