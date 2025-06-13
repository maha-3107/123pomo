/// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 
  authDomain: "pomodoro-task-manager-b5aa3.firebaseapp.com",
  projectId: "pomodoro-task-manager-b5aa3",
  storageBucket: "pomodoro-task-manager-b5aa3.firebasestorage.app",
  messagingSenderId: "492754188941",
  appId: "1:492754188941:web:17f26f729f62d3095780c4",
  measurementId: "G-QMCTC796SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);