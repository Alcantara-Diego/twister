// import firebase from 'firebase/app';
import firebaseConfig from "../firebaseConfig";
// import 'firebase/firestore';

import { getFirestore} from "firebase/firestore";


import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);




export { app, db }



