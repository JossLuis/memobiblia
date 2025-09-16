// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 👇 Reemplaza con la configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArN9WPd-GJ4gCSTE3VyV4iABeLEE6q-rk",
  authDomain: "memobiblia-c9bff.firebaseapp.com",
  projectId: "memobiblia-c9bff",
  storageBucket: "memobiblia-c9bff.firebasestorage.app",
  messagingSenderId: "103130188078",
  appId: "1:103130188078:web:6a818ca086c387217092bf"
};

const app = initializeApp(firebaseConfig);

// Autenticación
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);
