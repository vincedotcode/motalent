"use client";

import { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import useFCMToken from '@/hooks/useFCMToken';

const FirebaseForeground = () => {
  const { token, notificationPermissionStatus } = useFCMToken();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messagingInstance = getMessaging();
        const unsubscribe = onMessage(messagingInstance, (payload) => {
          console.log('Foreground push notification received:', payload);
        });

        return () => unsubscribe();
      }
    }
  }, [notificationPermissionStatus]);

  return null;
};

export default FirebaseForeground;
