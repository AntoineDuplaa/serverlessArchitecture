import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db, storage} from "../firebase"
import {scryRenderedDOMComponentsWithTag} from "react-dom/test-utils";
import {getFirestore, setDoc, updateDoc, arrayUnion, doc, collection, addDoc, getDocs, query, where } from "firebase/firestore";


function App() {
    // State to store uploaded file
    const [images, setImages] = useState([])
    const [url, setUrl] = useState("")
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = async () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);
        const path = "files/" + file.name
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            async () => {
              // download url
              getDownloadURL(storageRef).then(async (tmpUrl) => {
                setUrl(tmpUrl)
                console.log(tmpUrl);
                const docRef = await addDoc(collection(db, "Files"), {
                  path: path,
                  url: tmpUrl,
                });
                console.log("Document written with ID: ", docRef.id);
              });
            },
        );
    };

    async function retrievePhotos() {
        getDocs(collection(db, 'Files'))
            .then(response => {
                const images = response.docs.map(doc => ({
                    data: doc.data(), id: doc.id,
                }))
                setImages(images);
                console.log(images)

            })
            .catch(error => console.log(error.message))
    }

    return (
        <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <button onClick={retrievePhotos}>Display pictures</button>
            <p>{percent} "% done"</p>
            {images.map(image =>  <img src={image.data.url} height="300px" width="300px"/>)}
        </div>
    );
}

export default App;
