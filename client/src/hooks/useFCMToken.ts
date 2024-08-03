import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
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
  const [isTokenSent, setIsTokenSent] = useState<boolean>(false);

  useEffect(() => {
    console.log('Initializing Firebase Messaging');
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      const initializeFirebase = async () => {
        try {
          // Initialize Firebase app
          const app = initializeApp(firebaseConfig);
          const messaging = getMessaging(app);
          console.log('Firebase App Initialized');

          console.log('Requesting Notification Permission');
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          console.log(`Notification Permission: ${permission}`);

          if (permission === 'granted') {
            console.log('Waiting for Service Worker registration to be ready');
            const registration = await navigator.serviceWorker.ready;
            console.log('Service Worker is ready');

            console.log('Attempting to get FCM token');
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
              serviceWorkerRegistration: registration,
            });
            console.log(`Current Token: ${currentToken}`);
            if (currentToken) {
              setToken(currentToken);
              if (!isTokenSent) {
                console.log('Sending token to server');
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications/tokens`, { token: currentToken });
                setIsTokenSent(true);
                console.log('Token sent to server');
              }
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          } else {
            console.log('Notification permission not granted');
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
  }, [isTokenSent]);

  return { token, notificationPermissionStatus, isSupported };
};

export default useFCMToken;
