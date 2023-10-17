import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { FIRESTORE_DB , FIREBASE_AUTH } from '../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Decrypt } from '../function/aes';

export default function InsertPin({ navigation, route}) {
    const db = FIRESTORE_DB;
    const [pin, setPin] = useState('');
    const params = route.params;
    const email = params.email;
    const password = params.password;

    const checkPin = async () => {
        try {
            const docRef = doc(db, "users", FIREBASE_AUTH.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                data.pin = await Decrypt(data.pin);
                if (data.pin === pin) {
                    console.log('PIN is correct!');
                    await AsyncStorage.setItem('user', JSON.stringify({ email, password })).then(() => {
                        navigation.replace('My Password');
                    });
                } else {
                    alert('PIN is incorrect!');
                }
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document: ', error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Enter your PIN:</Text>
            <TextInput
                value={pin}
                onChangeText={setPin}
                keyboardType="numeric"
                secureTextEntry={true}
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20, width: '80%' }}
            />
            <Button mode="contained" onPress={checkPin} style={{ width: '80%' }}>
                Enter
            </Button>
        </View>
    );
}
