// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";
//import { getFirestore } from 'firebase/firestore/lite';
import {getFirestore, collection, addDoc} from "firebase/firestore";
import * as ROUTES from "./constants/routes";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAX58QmC9cMDqOdMJtj4t_A0i-hR-nwZ58",
    authDomain: "serverlessarchitecture-da270.firebaseapp.com",
    projectId: "serverlessarchitecture-da270",
    storageBucket: "serverlessarchitecture-da270.appspot.com",
    messagingSenderId: "17529469755",
    appId: "1:17529469755:web:c3b04933bf7aca5759d51e",
    measurementId: "G-BCRQ90E5TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

//export default db;
export default auth;

export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            window.location = ROUTES.HOME;
            // Sign in success
            // Route to site here
        }).catch(error => {
        console.error(error);
    });
}

export function register(email, password, firstName, lastName) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(response => {
            try {
                const docUser = addDoc(collection(db, "Users"), {
                    uid: response.user.uid,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                });
                console.log("Document written with ID: ", docUser.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            //window.location = '/login';
            // Sign in success
            // Route to site here
        }).catch(error => {
        console.error(error);
    });
}

export function logout() {
    window.location = ROUTES.SIGN_IN;
    return signOut(auth);
}

export function useAuth() {
    const [ currentUser, setCurrentUser ] = useState();

    useEffect(() => {
        return onAuthStateChanged(auth, user => setCurrentUser(user));
    }, [])

    return currentUser;
}