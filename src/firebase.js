import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, query, where, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ Import Storage correctly

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVF4Obh71lI1_QTDezFRh36DYDG6EPBgo",
  authDomain: "healthifydb.firebaseapp.com",
  projectId: "healthifydb",
  storageBucket: "healthifydb.appspot.com",
  messagingSenderId: "930394252812",
  appId: "1:930394252812:web:cc995e0ad26c7ad1e1b029"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore Database
const auth = getAuth(app); // Firebase Authentication
const storage = getStorage(app); // Firebase Storage

const usersCollection = collection(db, "users");
const appointmentsCollection = collection(db, "appointments");

export { db, auth, storage, usersCollection, appointmentsCollection, addDoc, getDocs, getDoc, setDoc, query, where, doc };
