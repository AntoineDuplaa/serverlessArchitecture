import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../firebase";


export const Account = () => {
  const [userData, setUserData] = useState({});

  useEffect( () => {
    const getData = async () => {
      const user = auth.currentUser;
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    }

    getData();
  },[])



  return (
    <div>
      {/*<button onClick={() => deleteAccount}>Supprimer son compte</button>*/}
    </div>
  )
}