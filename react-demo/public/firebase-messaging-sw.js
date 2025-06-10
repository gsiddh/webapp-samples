importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD37s0ZJeXjVUQRhGlO1cKgmGwk0GvbF00",
    authDomain: "mess-auto.firebaseapp.com",
    projectId: "mess-auto",
    storageBucket: "mess-auto.firebasestorage.app",
    messagingSenderId: "324484105269",
    appId: "1:324484105269:web:24f6ce7ea1428397f1dd7c",
    measurementId: "G-10W3S7SNZ4"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
