import {useEffect, useState} from 'react';
import './Chat.css';
import {auth, db, useAuth} from "../../firebase";
import {Timestamp, collection, query, orderBy, onSnapshot, addDoc, doc, getDoc} from "firebase/firestore";


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
      user: doc(db,'Users', uid),
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
  const {text, user} = props.message;
  const [userData, setUserData] = useState({});

  useEffect( () => {
    const getData = async () => {
      const docSnap = await getDoc(user);
      setUserData(docSnap.data());
    }

    getData();
  },[])
  const messageClass = user.id === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <p>{userData.firstName + " " + userData.lastName}:{" " + text}</p>
    </div>
  </>)
}


export default Chat;
