import { collection, getDocs } from "firebase/firestore";
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
        console.log("Data from Firestore:", Decrypt(data[1].password));
        // นำข้อมูลที่ได้มาใช้งานแสดงในแอปพลิเคชันของคุณ
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export { FetchDataPassword }
// เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูล
