import React, {useRef, useState} from 'react';
import {auth, db, functions} from "../firebase";
import {httpsCallable} from "firebase/functions";
import {doc, setDoc} from "firebase/firestore";
import firebase from 'firebase/compat/app';

const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
            <div className={'message ${messageClass}'}>
                <img src={'https://api.adorable.io/avatars/23/abott@adorable.png%27%7D'}  alt={"test"}/>
                <p>{text}</p>
            </div>
        </>
    )
};


const ChatRoom = () => {

    console.log("herllo")
    const messagesRef = firebase.firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages, setMessages] = useState()

    const getMessages = async() => {
        await setDoc(doc(db, 'messages'))
            .then(response => {
                const message = response.docs.map(doc => ({
                    data: doc.data(), id: doc.id,
                }))
                setMessages(message);
            })
            .catch(error => console.log(error.message))
    }

    const [formValue, setFormValue] = useState();

    const dummy = useRef()

        const sendMessage = async(e) => {
            e.preventDefault();

            const {uid, photoURL} = auth.currentUser;

            const addMessage = httpsCallable(functions, 'addMessage');
            addMessage({
                text: formValue,
                createAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
            })
                .then((result) => {
                    // Read result of the Cloud Function.
                    /** @type {any} */
                    console.log(result.data);
                    setFormValue('');
                    dummy.current.scrollIntoView({behavior: 'smooth'});
                });
        }

    return (

        <div>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id}  message={msg}/>)}
                <div ref={dummy}></div>
            </div>
            <div>
                <form onSubmit={sendMessage}>
                    <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                    <button type={"submit"}>send</button>
                </form>
            </div>
        </div>

    );
};


const Chat = () => {
    return (
        <div>
            <ChatRoom/>
        </div>
    );
};

export default Chat;