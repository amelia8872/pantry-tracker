// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAw01ERV1swCjSc6PmkO-Jy_OvaCU8TGNc',
  authDomain: 'pantry-tracker-e72ba.firebaseapp.com',
  projectId: 'pantry-tracker-e72ba',
  storageBucket: 'pantry-tracker-e72ba.appspot.com',
  messagingSenderId: '1084398560126',
  appId: '1:1084398560126:web:af7f0ba494ff063a7a892f',
  measurementId: 'G-9VMMF7R8T2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
export { firestore };
