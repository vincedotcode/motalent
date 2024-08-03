import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import axios from 'axios';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const useFCMToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === 'granted') {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
              serviceWorkerRegistration: registration,
            });

            if (currentToken) {
              setToken(currentToken);
              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications/tokens`, { token: currentToken });
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }
        } else {
          setIsSupported(false);
          console.warn('This browser does not support the APIs required for Firebase Cloud Messaging.');
        }
      } catch (error) {
        console.log('Error retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { token, notificationPermissionStatus, isSupported };
};

export default useFCMToken;
