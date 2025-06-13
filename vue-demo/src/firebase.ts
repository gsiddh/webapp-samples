import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD37s0ZJeXjVUQRhGlO1cKgmGwk0GvbF00",
  authDomain: "mess-auto.firebaseapp.com",
  projectId: "mess-auto",
  storageBucket: "mess-auto.appspot.com",
  messagingSenderId: "324484105269",
  appId: "1:324484105269:web:24f6ce7ea1428397f1dd7c",
  measurementId: "G-10W3S7SNZ4"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
