import CryptoJS from 'crypto-js';
import { FIREBASE_AUTH } from '../FirebaseConfig';





 function Encrypt(plainText) {
    const secretKey = FIREBASE_AUTH.currentUser.uid;
    const encryptedText = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    console.log('Encrypted Text:', encryptedText);
    console.log('Key:', secretKey);
    return encryptedText
}
function Decrypt(encryptedText) {
    const secretKey = FIREBASE_AUTH.currentUser.uid;
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log('Decrypted Text:', decryptedText);
    return decryptedText
    
}



export {Encrypt ,Decrypt}
