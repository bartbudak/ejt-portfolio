import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: replace authDomain / projectId / storageBucket once the Firebase
// project for this site exists (suggested id: "ejt-folio").
const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "ejt-folio.firebaseapp.com",
  projectId: "ejt-folio",
  storageBucket: "ejt-folio.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
});

export const db = getFirestore(app);
export const storage = getStorage(app);
