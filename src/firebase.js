// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
//import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGQ0tYppWFJkuSxBhOpkH0xVDmX245Vdc",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "637908496727",
    appId: "2:637908496727:web:a4284b4c99e329d5",
    measurementId: "G-9VP01NDSXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export default db;


export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            console.log("hey");
            window.location = '/home';
            // Sign in success
            // Route to site here
        }).catch(error => {
        console.error(error);
    })
}

export function logout() {
    return signOut(auth);
}

export function useAuth() {
    const [ currentUser, setCurrentUser ] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;
}