import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCBGMJzHbwD3Y95fwRKVgdYU2KBQ7oDYHQ",
    authDomain: "dineeasy-8176e.firebaseapp.com",
    projectId: "dineeasy-8176e",
    storageBucket: "dineeasy-8176e.firebasestorage.app",
    messagingSenderId: "811985378716",
    appId: "1:811985378716:web:26c599db464c67a537bc59",
    measurementId: "G-0F0ERHYX32"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };