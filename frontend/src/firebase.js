export const firebaseConfig = {
    apiKey: "AIzaSyArHe0Djoak-aAy4o8tWMrhrK1fBA9hBnE",
    authDomain: "vllfl-35989.firebaseapp.com",
    projectId: "vllfl-35989",
    storageBucket: "vllfl-35989.firebasestorage.app",
    messagingSenderId: "327305056220",
    appId: "1:327305056220:web:107cb6eec00125e923c919",
    measurementId: "G-ZH4G9B4P5R"
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
