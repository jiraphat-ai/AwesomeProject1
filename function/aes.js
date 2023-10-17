import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { GetUsetData } from './get_data';











async function Encrypt(plainText) {
    try {
        const userData = await GetUsetData();
        const secretKey = userData.key;
        const encryptedText = CryptoJS.AES.encrypt(plainText, secretKey, {
            keySize: 256
        });
        console.log('Encrypted Text:', encryptedText.toString());
        console.log('Key:', secretKey);
        return encryptedText.toString();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
 async function Decrypt(encryptedText) {
    try {
        const userData = await GetUsetData();
        const secretKey = userData.key;
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey,{
            keysize: 256
        });
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        console.log('Decrypted Text:', decryptedText);
        return decryptedText.toString()
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  
  
    
}

// นี้ใช้ aes 256 แน่หหรอ!
// ใช้ได้แต่ต้องเปลี่ยน keysize ให้เท่ากับ 256 นะ    
// ก็เปลี่ยนแล้วไง
// แต่ถ้าไม่ใช้ก็ไม่ต้องเปลี่ยน
// แต่ถ้าใช้ก็ต้องเปลี่ยน




export {Encrypt ,Decrypt}
