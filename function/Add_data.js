
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { doc, setDoc, collection, addDoc ,deleteDoc} from 'firebase/firestore';
import { firebase } from '../FirebaseConfig';
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

async function UpdatedToFirestore(collectionname , docName , data) {
    const db = FIRESTORE_DB;
    console.log('Document written with ID: ', data)
    try {
        const docRef = await setDoc(doc(db,"users",FIREBASE_AUTH.currentUser.uid,collectionname,docName), data  ,{ merge: true });
        
        console.log('Document written with ID: ', docName)
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

async function addUserToFirestore(id) {
    try {
        const idHash = SHA256(id).toString();
    
        const docRef = doc(db, 'users', id); 
        await setDoc(docRef, {
          email: email,
          hint: hint,
          name: name,
          id: id,
          key: idHash
        });
        console.log('Document written with ID: ',id); 
      } catch (e) {
        console.error('Error adding document: ', e);
      }
}

async function DeleteDoc(collectionname , docName) {
    const db = FIRESTORE_DB;
    try {
        await deleteDoc(doc(db, "users", FIREBASE_AUTH.currentUser.uid , collectionname , docName));
        console.log("Document successfully deleted!");
    } catch (e) {
        console.error("Error removing document: ", e);
    }
}

async function UpdateUserData(data) {
    const db = FIRESTORE_DB;
    try {
        await setDoc(doc(db, "users", FIREBASE_AUTH.currentUser.uid), data , { merge: true });
        console.log("Document successfully updated!");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}


// const user = firebase.auth().currentUser;

// user.updatePassword(newPassword)
//     .then(() => {
//         // Update successful.
//     })
//     .catch((error) => {
//         // An error occurred.
//     });

export {addToFirestore ,UpdatedToFirestore ,DeleteDoc ,UpdateUserData}