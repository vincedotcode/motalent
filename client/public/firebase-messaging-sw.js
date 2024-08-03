importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDVHIGPRW1QJOtgKhwqp2Zypy7HaCDiG00",
  authDomain: "motalent-b2832.firebaseapp.com",
  projectId: "motalent-b2832",
  storageBucket: "motalent-b2832.appspot.com",
  messagingSenderId: "1094072707703",
  appId: "1:1094072707703:web:8e16598adc5bce021cf472",
  measurementId: "G-LVNVREF49R"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body, icon } = payload.notification;
  const notificationOptions = {
    body,
    icon,
  };

  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  if (event.notification.data && event.notification.data.link) {
    clients.openWindow(event.notification.data.link);
  }

  event.notification.close();
});
