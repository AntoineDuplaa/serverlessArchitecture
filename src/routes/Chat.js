import React, {useRef, useState} from 'react';
import {auth, db, functions, sendMessage} from "../firebase";
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

    const [messages, setMessages] = useState()
    const [formValue, setFormValue] = useState();

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
    const dummy = useRef()

    const sendTheMessage = () => {
        const {uid, photoURL} = auth.currentUser;
        //setFormValue('');
        //dummy.current.scrollIntoView({behavior: 'smooth'});
        sendMessage("azer", uid)
    }

    //setFormValue('');
    //dummy.current.scrollIntoView({behavior: 'smooth'});


    return (
        <div>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <form onClick={()=>sendTheMessage()}>
                    <input type="text" value={"allo"} onChange={(e) => setFormValue(e.target.value)}/>
                    <button type={"button"}>send</button>
                </form>
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