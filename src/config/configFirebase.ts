import firebase from 'firebase/app';
import 'firebase/auth';
import readEnv from './readEnv';

interface configFirebaseType {
  apiKey: string
  authDomain:string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  // measurementId: string
}

const configFirebase: configFirebaseType = {
  apiKey: readEnv('REACT_APP_FIREBASE_API_KEY'),
  authDomain: readEnv('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: readEnv('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: readEnv('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: readEnv('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: readEnv('REACT_APP_FIREBASE_APP_ID'),
  // measurementId: readEnv('REACT_APP_FIREBASE_MEASUREMENT_ID'),
};

const initializeApp = (): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(configFirebase);
  } else {
    firebase.app();
  }
};
export default initializeApp;
