// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChCSlDfaDjr5BrIytid3ZMTU6cS00uEw8",
  authDomain: "netflix-clone-app-react.firebaseapp.com",
  projectId: "netflix-clone-app-react",
  storageBucket: "netflix-clone-app-react.firebasestorage.app",
  messagingSenderId: "433675342832",
  appId: "1:433675342832:web:2b2ebbce58a27c23248335",
  measurementId: "G-BWMG1KQCCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
