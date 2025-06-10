import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
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
async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      
      // Get registration token
      const currentToken = await getToken(messaging, {
        vapidKey: 'BH2rCQkMjwmOTRH9jkjykkmx5xUx25cDweLmL6cTlbJznP_nxtivrycwO4ltmlX3TyiHQjGGjJtZJqADYefGtPE' // Get this from Firebase Console
      });

      if (currentToken) {
        console.log('Token retrieved:', currentToken);
        // Send token to your server (if needed)
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
}

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log('Received foreground message:', payload);
  // Handle the message as needed
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
      requestPermission();
    })
    .catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
