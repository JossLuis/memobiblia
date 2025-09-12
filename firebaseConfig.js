// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYOwK9rtjYCesL7MAbOrjYc4BB1NTVXZ0",
  authDomain: "memobiblia-fbae9.firebaseapp.com",
  projectId: "memobiblia-fbae9",
  storageBucket: "memobiblia-fbae9.firebasestorage.app",
  messagingSenderId: "759670163986",
  appId: "1:759670163986:web:1cabd17288134492ec66cb"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Auth
export const auth = getAuth(app);