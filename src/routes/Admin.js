import {useEffect, useState} from "react";
import {collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";


export const Admin = () => {
  const [users, serUsers] = useState([]);

  useEffect(() => {
    const usersColRef = collection(db, 'Users')
    onSnapshot(usersColRef, (snapshot) => {
      serUsers(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  const deleteAccount = async (id) => {
    await deleteDoc(doc(db, "Users", id));
  }

  return (
    <div>
      {users.map(user =>
        <div>
          {user.id + " " + user.data.firstName + " " + user.data.lastName}
          <button onClick={() => deleteAccount(user.id)}>Delete Account</button>
        </div>
      )}
    </div>
  )
}