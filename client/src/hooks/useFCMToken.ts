import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const useFCMToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      const initializeFirebase = async () => {
        // Initialize Firebase app
        initializeApp(firebaseConfig);
        const messaging = getMessaging();
        
        try {
          console.log('Requesting Notification Permission');
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          console.log(`Notification Permission: ${permission}`);

          const registration = await navigator.serviceWorker.ready;
          console.log('Service Worker is ready');

          const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY, serviceWorkerRegistration: registration });
          console.log(`Current Token: ${currentToken}`);
          if (currentToken) {
            setToken(currentToken);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications/tokens`, { token: currentToken });
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        } catch (err) {
          console.error('An error occurred while retrieving token.', err);
        }
      };

      initializeFirebase();
    } else {
      setIsSupported(false);
      console.log('Notifications are not supported');
    }
  }, []);

  return { token, notificationPermissionStatus, isSupported };
};

export default useFCMToken;
