// firebaseConfig.js

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <- Solo importamos getAuth
import { getFirestore } from "firebase/firestore";
// No es necesario importar initializeAuth o getReactNativePersistence

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArN9WPd-GJ4gCSTE3VyV4iABeLEE6q-rk",
  authDomain: "memobiblia-c9bff.firebaseapp.com",
  projectId: "memobiblia-c9bff",
  storageBucket: "memobiblia-c9bff.firebasestorage.app",
  messagingSenderId: "103130188078",
  appId: "1:103130188078:web:6a818ca086c387217092bf"
};

// Inicialización segura
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app); // <- ESTE ES EL CAMBIO CLAVE. Simple y automático.
const db = getFirestore(app);

export { app, auth, db };

