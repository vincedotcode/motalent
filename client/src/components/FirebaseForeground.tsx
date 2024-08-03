"use client";

import { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import useFCMToken from '@/hooks/useFCMToken';

const FirebaseForeground = () => {
  const { token, notificationPermissionStatus } = useFCMToken();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log('Foreground push notification received:', payload);
        });

        return () => unsubscribe();
      }
    }
  }, [notificationPermissionStatus]);

  return null;
};

export default FirebaseForeground;
