import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-pHSzDKBzzeG4z50EDw4Jz4hux8RRdh0",
  authDomain: "tebtechnologyltd-da387.firebaseapp.com",
  projectId: "tebtechnologyltd-da387",
  storageBucket: "tebtechnologyltd-da387.appspot.com",
  messagingSenderId: "689939147315",
  appId: "1:689939147315:web:0f29b26f8f0ae100d85146",
  measurementId: "G-0XC7WCBZBD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };
