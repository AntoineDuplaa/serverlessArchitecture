import {useEffect, useState} from "react";
import {doc, getDoc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {updateEmail, deleteUser} from "firebase/auth";
import {auth, db} from "../firebase";
import * as ROUTES from "../constants/routes";
import {SIGN_IN} from "../constants/routes";


export const Account = () => {
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect( () => {
    const getData = async () => {
      const user = auth.currentUser;
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    }

    getData();
  },[])

    const handleUpdate = async () => {
        await updateEmail(auth.currentUser, email);
        const userDocRef = doc(db, "Users", auth.currentUser.uid);
        await updateDoc(userDocRef, {
            email: email,
            firstName: firstName,
            lastName: lastName
        })
        window.location = ROUTES.HOME;
    }

    const handleDelete = async () => {
      const userDocRef = doc(db, "Users", auth.currentUser.uid);
      await deleteDoc(userDocRef);
      await deleteUser(auth.currentUser);
      window.location = ROUTES.SIGN_IN;
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    }

  return (
    <div>
        <h1>{userData.email}</h1>
        <h2>{userData.firstName}</h2>
        <h2>{userData.lastName}</h2>

        <label>Email</label>
        <input onChange={handleChangeEmail}/>
        <label style={{marginTop: "10px"}}>First name</label>
        <input onChange={handleChangeFirstName}/>
        <label style={{marginTop: "10px"}}>Last name</label>
        <input onChange={handleChangeLastName}/>
        <button style={{marginTop: "10px"}} onClick={handleUpdate}>Edit</button>
        <button style={{marginTop: "10px"}} onClick={handleDelete}>Delete</button>
      {/*<button onClick={() => deleteAccount}>Supprimer son compte</button>*/}
    </div>
  )
}