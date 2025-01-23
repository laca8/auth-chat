// client/src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx8dgLjOfhWdWQKIHRDMRnL5OKGX-QiAk",
  authDomain: "auth-app-1ba1c.firebaseapp.com",
  projectId: "auth-app-1ba1c",
  storageBucket: "auth-app-1ba1c.firebasestorage.app",
  messagingSenderId: "389253070243",
  appId: "1:389253070243:web:baa692ded11e137907ee16",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
