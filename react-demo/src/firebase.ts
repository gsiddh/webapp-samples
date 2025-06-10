import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
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
const messaging = getMessaging(app);

// Request permission and get token
export const requestPermissionAndToken = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Get registration token
      const currentToken = await getToken(messaging, {
        vapidKey: 'BH2rCQkMjwmOTRH9jkjykkmx5xUx25cDweLmL6cTlbJznP_nxtivrycwO4ltmlX3TyiHQjGGjJtZJqADYefGtPE', // Replace with your VAPID key
      });

      if (currentToken) {
        console.log('Token retrieved:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
        return null;
      }
    } else {
      console.log('Notification permission denied');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
    return null;
  }
};

// Handle foreground messages
export const setupForegroundMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);
    // Handle the message as needed
  });
};
