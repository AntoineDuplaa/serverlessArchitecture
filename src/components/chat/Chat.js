import {useEffect, useState} from 'react';
import './Chat.css';
import {auth, db, useAuth} from "../../firebase";
import {Timestamp, collection, query, orderBy, onSnapshot, addDoc} from "firebase/firestore";


function Chat() {

  const user = useAuth();

  return (
    <div className="Chat">
      <section>
        {user && <ChatRoom />}
      </section>
    </div>
  );
}

function ChatRoom() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatColRef = query(collection(db, 'Messages'), orderBy('createdAt', 'asc'))
    onSnapshot(chatColRef, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(db, 'Messages'), {
      text: formValue,
      createdAt: Timestamp.now(),
      uid,
      photoURL
    })
    setFormValue('');
  }

  return (<>
    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg.data} />)}
    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  </>)
}


export default Chat;
