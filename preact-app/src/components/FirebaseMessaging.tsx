import { useEffect, useState } from 'preact/hooks';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

interface FirebaseMessagingProps {
  vapidKey: string;
}

export default function FirebaseMessaging({ vapidKey }: FirebaseMessagingProps) {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<'granted' | 'denied' | 'default'>('default');

  useEffect(() => {
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
    const messaging = getMessaging(app);

    // Request permission
    Notification.requestPermission().then((perm) => {
      setPermission(perm);
      if (perm === 'granted') {
        // Get token
        getToken(messaging, { vapidKey }).then((currentToken) => {
          if (currentToken) {
            setToken(currentToken);
            // Send token to your server
            console.log('Token:', currentToken);
          }
        }).catch((err) => {
          console.error('Error getting token:', err);
        });
      }
    });

    // Handle foreground messages
    onMessage(messaging, (payload) => {
      console.log('Received foreground message:', payload);
      // Handle the message as needed
    });

    return () => {
      // Cleanup
    };
  }, [vapidKey]);

  return (
    <div>
      <p>Notification Permission: {permission}</p>
      {token && <p>Token: {token}</p>}
    </div>
  );
}
