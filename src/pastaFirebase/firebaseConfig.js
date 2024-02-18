// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4tC41Tk8KX8gtWvtoIUL1-c0unLrt-l4",
  authDomain: "twister-social-app.firebaseapp.com",
  projectId: "twister-social-app",
  storageBucket: "twister-social-app.appspot.com",
  messagingSenderId: "260298388786",
  appId: "1:260298388786:web:8e378e87e826f5219e932b",
  measurementId: "G-BNDXH9R06P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export { app }