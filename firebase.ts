import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-c0xLNYbeAEc3hSBnNEF5fXuN3fzCKnQ",
  authDomain: "chatpdf-d71ce.firebaseapp.com",
  projectId: "chatpdf-d71ce",
  storageBucket: "chatpdf-d71ce.appspot.com",
  messagingSenderId: "747249955110",
  appId: "1:747249955110:web:396e3ec3b4ba9dd1f211e7",
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }