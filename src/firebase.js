// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import {getFirestore, setDoc, updateDoc, arrayUnion, doc, collection} from "firebase/firestore";
import * as ROUTES from "./constants/routes";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getStorage } from "firebase/storage";

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
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const functions = getFunctions();


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
        .then(async response => {
            try {
              const userDocRef = doc(db, "Users", response.user.uid);
              await setDoc(userDocRef, {
                uid: response.user.uid,
                email: email,
                firstName: firstName,
                lastName: lastName
              });
              const groupUsersRef = doc(db, "Groups", "Users");
              console.log(userDocRef.id);
              await updateDoc(groupUsersRef, {users: arrayUnion(doc(db,'Users', userDocRef.id))})
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            window.location = ROUTES.HOME;
        }).catch(error => {
        console.error(error);
    });
}


export async function sendMessage(message, uid) {

    const userDocRef = doc(db, "Users", uid)
    const messageDocRef = doc(collection(db, "Messages"));
    console.log(message)
    await setDoc(messageDocRef,  {
        userRef: userDocRef,
        message: message,
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
