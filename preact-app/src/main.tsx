import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'

// Register service worker for Firebase Messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
}

render(<App />, document.getElementById('app')!)
