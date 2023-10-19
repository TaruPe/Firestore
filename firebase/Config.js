import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCPjyiI9zdKs1HyZhJaW84lqC7R-NXd4MU",
    authDomain: "message-ebd00.firebaseapp.com",
    projectId: "message-ebd00",
    storageBucket: "message-ebd00.appspot.com",
    messagingSenderId: "117793018817",
    appId: "1:117793018817:web:482751b2863f31e46e9540"
  };
  
  // Initialize Firebase app
  initializeApp(firebaseConfig);
  
  // Get the Firestore instance associated with the Firebase app
  const firestore = getFirestore();

  // Define the MESSAGES constant
  const MESSAGES = 'messages';
  
  // Export the necessary Firebase Firestore components and other Constants
  export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    MESSAGES
  };