// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCQKYOLrgy7uvesht_OD8k5AEn1Lma4B0Y',
	authDomain: 'linkedin-clone-bafb3.firebaseapp.com',
	projectId: 'linkedin-clone-bafb3',
	storageBucket: 'linkedin-clone-bafb3.appspot.com',
	messagingSenderId: '412195759817',
	appId: '1:412195759817:web:cdcb6375a5847e67c88f18'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { db, storage };
