// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAf_KZw0PisOXLynN9WqqVjSCm5mfQnPMo",
  authDomain: "cryptoapp-b4ea1.firebaseapp.com",
  projectId: "cryptoapp-b4ea1",
  storageBucket: "cryptoapp-b4ea1.firebasestorage.app",
  messagingSenderId: "391272336305",
  appId: "1:391272336305:web:2008364b1d1fdbb1e30b90",
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
