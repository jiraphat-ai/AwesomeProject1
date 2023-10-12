import CryptoJS from 'crypto-js';
import { FIREBASE_AUTH } from '../FirebaseConfig';





 function Encrypt(plainText) {
    const secretKey = FIREBASE_AUTH.currentUser.uid;
    const encryptedText = CryptoJS.AES.encrypt(plainText, secretKey,{
        keysize: 256

    }).toString();
    console.log('Encrypted Text:', encryptedText);
    console.log('Key:', secretKey);
    return encryptedText
}
function Decrypt(encryptedText) {
    const secretKey = FIREBASE_AUTH.currentUser.uid;
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey,{
        keysize: 256
    });
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log('Decrypted Text:', decryptedText);
    return decryptedText
    
}

// นี้ใช้ aes 256 แน่หหรอ!
// ใช้ได้แต่ต้องเปลี่ยน keysize ให้เท่ากับ 256 นะ    
// ก็เปลี่ยนแล้วไง
// แต่ถ้าไม่ใช้ก็ไม่ต้องเปลี่ยน
// แต่ถ้าใช้ก็ต้องเปลี่ยน




export {Encrypt ,Decrypt}
