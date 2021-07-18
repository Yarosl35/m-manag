import firebase from 'firebase';
import 'firebase/auth';
import initializeApp from '../config/configFirebase';

export interface signInType {
  email: string
  displayName: string
  token: string
  photoURL: string | null
}

initializeApp();

function validateEmail(mail: string):boolean {
  const re = /@gmail.com/;
  return re.test(mail);
}

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signOut = async () => firebase.auth().signOut();

export const signIn = async (): Promise<signInType | null> => {
  const result = await firebase.auth().signInWithPopup(googleProvider);
  const { credential, user } = result;
  if (!credential || !user) return null;

  const token = (credential as firebase.auth.OAuthCredential).accessToken;

  if (!token) return null;

  const { email, displayName, photoURL } = user;
  if (email !== null && validateEmail(email)) {
    return {
      email,
      displayName: displayName || email,
      token,
      photoURL,
    };
  }

  await signOut();

  return null;
};
