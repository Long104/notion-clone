// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDgh1VYnyWu9-xMSXzYjR2hu48_4jmQQzY",
	authDomain: "notion-clone-3f452.firebaseapp.com",
	projectId: "notion-clone-3f452",
	storageBucket: "notion-clone-3f452.firebasestorage.app",
	messagingSenderId: "591880702141",
	appId: "1:591880702141:web:b4cc87125200c266a9cfd4",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};
