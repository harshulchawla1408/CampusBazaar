import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSD27m3xrzMfj2s3pvkNbkzSRWuD5Iwic",
  authDomain: "campusbazaar-33d28.firebaseapp.com",
  projectId: "campusbazaar-33d28",
  storageBucket: "campusbazaar-33d28.appspot.com",
  messagingSenderId: "217915140243",
  appId: "1:217915140243:web:592a733358d4d356ce8566",
  measurementId: "G-Q8DJBLNKVS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let analytics = null;

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

const storage = getStorage(app);

export { app, auth, analytics, storage };