import {useEffect, useState} from "react";
import {collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import {auth, db, logout} from "../firebase";
import {deleteUser} from "firebase/auth";



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
    if (id === auth.currentUser.uid) {
      await logout()
    }
  }

  return (
    <div>
      {users.map(user =>
        <div key={user.id}>
          {user.id + " " + user.data.firstName + " " + user.data.lastName}
          <button onClick={() => deleteAccount(user.id)}>Delete Account</button>
        </div>
      )}
    </div>
  )
}