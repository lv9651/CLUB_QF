import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCfkuf6Ljt-JAwBeLA4loP6MGzg2EQkzwc",
  authDomain: "qf-club.firebaseapp.com",
  projectId: "qf-club",
  storageBucket: "qf-club.firebasestorage.app",
  messagingSenderId: "1087917180114",
  appId: "1:1087917180114:web:8f3c4617e14d5c08c3190b",
  measurementId: "G-3YX004D30P"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Auth, Provider y Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();