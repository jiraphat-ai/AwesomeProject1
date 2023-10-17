import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../FirebaseConfig';
import { doc, setDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { Encrypt } from '../function/aes';


const SetPinAndConfirmScreen = ({ navigation, route }) => {
    const params = route.params;
    const email = params.email;
    const password = params.password;
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const db = FIRESTORE_DB
    const handleUpdatePinToFireStore = async () => {
        try {
            const docRef = doc(db, "users", FIREBASE_AUTH.currentUser.uid);
            console.log(pin)
            setDoc(docRef, {
                pin: await Encrypt(pin),
            }, { merge: true });

            Alert.alert('Success', 'Your PIN has been updated.');
            //หลังจากกด ok ที่ Alert แล้วให้กลับไปหน้า Login
            navigation.replace('Insert Pin', {
                email: email,
                password: password
            });
        } catch (error) {
            console.log(error)
        }

    };


    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter your 6-digit PIN</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter PIN"
                    keyboardType="numeric"
                    maxLength={6}
                    secureTextEntry={true}
                    value={pin}
                    onChangeText={(text) => setPin(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm PIN"
                    keyboardType="numeric"
                    maxLength={6}
                    secureTextEntry={true}
                    value={confirmPin}
                    onChangeText={(text) => setConfirmPin(text)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Save Pin" onPress={handleUpdatePinToFireStore} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'sans-serif',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontFamily: 'sans-serif',
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default SetPinAndConfirmScreen;
