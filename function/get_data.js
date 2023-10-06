import { collection, getDocs ,doc,getDoc} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { Decrypt } from "./aes";

async function fetchCollectionPassword(collectionName) {
    const db = FIRESTORE_DB;
    const querySnapshot = await getDocs(collection(db, "users", FIREBASE_AUTH.currentUser.uid, "password_entry"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

// ตัวอย่างการใช้งาน
async function FetchDataPassword() {
    try {
        const data = await fetchCollectionPassword();
        console.log("Data from Firestore:", data);
        return data
        // นำข้อมูลที่ได้มาใช้งานแสดงในแอปพลิเคชันของคุณ
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function fetchDocumentData( documentId) {
    const db = FIRESTORE_DB;
    const docRef = doc(db, "users", FIREBASE_AUTH.currentUser.uid ,"password_entry" , documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Document not found");
    }
}

// ตัวอย่างการใช้งาน
async function fetchDocumentOnce(documentId) {
    try {
        const data = await fetchDocumentData( documentId);
        console.log("Data from Firestore:", data);
        return data;
        // นำข้อมูลที่ได้มาใช้งานแสดงในแอปพลิเคชันของคุณ
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}

export { FetchDataPassword ,fetchDocumentOnce }
// เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูล
