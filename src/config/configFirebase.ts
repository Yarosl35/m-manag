import firebase from 'firebase/app';
import 'firebase/auth';

interface configFirebaseType {
  apiKey: string | undefined
  authDomain:string | undefined
  projectId: string | undefined
  storageBucket: string | undefined
  messagingSenderId: string | undefined
  appId: string | undefined
  measurementId: string | undefined
}

const configFirebase: configFirebaseType = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const initializeApp = (): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(configFirebase);
  } else {
    firebase.app();
  }
};
export default initializeApp;
