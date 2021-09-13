import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCdBTVidocnu3h-ENwo1MB4x7iZzLcDXwY',
  authDomain: 'react-firstcrud.firebaseapp.com',
  projectId: 'react-firstcrud',
  storageBucket: 'react-firstcrud.appspot.com',
  messagingSenderId: '355216587669',
  appId: '1:355216587669:web:f33b7c8da4dbd923e2149c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
