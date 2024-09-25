// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8SRCZukZcyoEIfKS77XOCGdSXHupsTqY",
    authDomain: "prueba-fazt-d29fa.firebaseapp.com",
    projectId: "prueba-fazt-d29fa",
    storageBucket: "prueba-fazt-d29fa.appspot.com",
    messagingSenderId: "99397301625",
    appId: "1:99397301625:web:bf35dbb693ed560cdbaba8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveTask = async (title, description) => {
    try {
        const docRef = await addDoc(collection(db, 'tasks'), {
            title: title,
            description: description
        })
        console.log('Tarea guardada', docRef.id)
    } catch (error) {
        console.log('Error al guardar tarea', error)
    }
}
