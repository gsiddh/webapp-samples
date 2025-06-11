import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyD37s0ZJeXjVUQRhGlO1cKgmGwk0GvbF00",
    authDomain: "mess-auto.firebaseapp.com",
    projectId: "mess-auto",
    storageBucket: "mess-auto.firebasestorage.app",
    messagingSenderId: "324484105269",
    appId: "1:324484105269:web:24f6ce7ea1428397f1dd7c",
    measurementId: "G-10W3S7SNZ4"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();


onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });