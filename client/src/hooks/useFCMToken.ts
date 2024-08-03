import { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';

const useFCMToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      const initializeFirebase = async () => {
        const messaging = getMessaging();
        
        try {
          await Notification.requestPermission();
          setNotificationPermissionStatus(Notification.permission);

          const registration = await navigator.serviceWorker.ready;

          const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY, serviceWorkerRegistration: registration });
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
    }
  }, []);

  return { token, notificationPermissionStatus, isSupported };
};

export default useFCMToken;
