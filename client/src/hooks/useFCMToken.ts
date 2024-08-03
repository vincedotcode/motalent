import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import axios from 'axios';

const useFCMToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
          const permission = Notification.permission;
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
          } else if (permission === 'default') {
            const newPermission = await Notification.requestPermission();
            setNotificationPermissionStatus(newPermission);

            if (newPermission === 'granted') {
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
