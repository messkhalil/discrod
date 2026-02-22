import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_h7hHz6WYsPemSBtJ690ADcCdk1jBgkA",
  authDomain: "discord-5d5dd.firebaseapp.com",
  projectId: "discord-5d5dd",
  storageBucket: "discord-5d5dd.firebasestorage.app",
  messagingSenderId: "551252331990",
  appId: "1:551252331990:web:b86bdffab1ba8718f46877",
  measurementId: "G-80GQEPBMC1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);