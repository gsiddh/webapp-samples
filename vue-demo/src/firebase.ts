import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
export const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      
      // Get registration token
      const currentToken = await getToken(messaging, {
        vapidKey: 'BH2rCQkMjwmOTRH9jkjykkmx5xUx25cDweLmL6cTlbJznP_nxtivrycwO4ltmlX3TyiHQjGGjJtZJqADYefGtPE' // You'll need to get this from Firebase Console
      });

      if (currentToken) {
        console.log('Token retrieved:', currentToken);
        // Send token to your server
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
  }
};

// Handle foreground messages
export const onMessageListener = () => {
  return onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Handle message
  });
};
