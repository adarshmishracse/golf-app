import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzZq9vx4QQFawyO3llE16hg2HnEkGR9tg",
  authDomain: "golf-app-45d0b.firebaseapp.com",
  projectId: "golf-app-45d0b",
  storageBucket: "golf-app-45d0b.firebasestorage.app",
  messagingSenderId: "1051823505801",
  appId: "1:1051823505801:web:d91fc6bd5310b1f5aae158",
  measurementId: "G-M7ZN9614RJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);