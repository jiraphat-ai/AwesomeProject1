
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
async function addToFirestore(collectionname , docName , data) {
    const db = FIRESTORE_DB;
    console.log('Document written with ID: ', data)
    try {
        const docRef = await addDoc(collection(db,"users",FIREBASE_AUTH.currentUser.uid,collectionname), data);
        
        console.log('Document written with ID: ', docRef.id)
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export {addToFirestore}