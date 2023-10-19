import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, TextInput, Button, View, Alert } from 'react-native';
import { firebase } from '@firebase/app';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { doc, setDoc, collection, addDoc, Timestamp, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword ,sendEmailVerification } from 'firebase/auth';
import { StackActions, NavigationActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUsetData } from '../function/get_data';

export default function Login({ navigation }) {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const db = FIRESTORE_DB
  // const goToMyPassword = () => {
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: 'My Password' })],
  //   });

  //   // dispatch การรีเซ็ต stack navigator
  //   navigation.dispatch(resetAction);
  // };


  const UserLogin = async () => {
    try {
      const respones = await signInWithEmailAndPassword(auth, email, password)
      const user = respones.user;
      await sendEmailVerification(user);
      alert("Email sent");
      if (respones)
        if (await CheckUserIsHavePininFirestore()) {
          navigation.replace('Insert Pin', {
            email: email,
            password: password
          });;
          // แก้ error The action 'REPLACE' with payload {"name":{"name":"Insert Pin","params":{"email":"ball2@gmail.com","password":"123456"}}} was not handled by any navigator.Do you have a screen named '[object Object]'?
          navigation.replace('Insert Pin', {
            email: email,
            password: password
          });
          // await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
        } else {
          navigation.replace('Set Pin', {
            email: email,
            password: password
          });
          // global.uEmail = email;
          // await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
        }
      // navigation.replace('My Password');
      // global.uEmail = email;
      // await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
    }
    catch (error) {
      console.log(error)
      alert(error);
    } finally {

    }
    // await firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     alert('สำเร็จ');
    //     navigation.navigate('Home');
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  }
  async function CheckUserIsHavePininFirestore() {
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(FIRESTORE_DB, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.pin) {
        console.log('PIN is correct!', data.pin);
        return true;
      } else {
        console.log('PIN is incorrect!');
        return false;
      }
    } else {
      console.log('No such document!');
      return false;
    }
  }
  async function checkLoginStatus() {
   
    try {
      // ตรวจสอบข้อมูลการล็อกอินใน AsyncStorage
      const userd = await AsyncStorage.getItem('user');
      if (userd) {
        // แปลงข้อมูล JSON กลับเป็น Object
        const userData = JSON.parse(userd);
        console.log(userData)
        try {
          const respones = await signInWithEmailAndPassword(auth, userData.email, userData.password)

          if (respones) {
            if (await CheckUserIsHavePininFirestore()) {
              navigation.replace('Insert Pin', {
                email: email,
                password: password
              });;
              // แก้ error The action 'REPLACE' with payload {"name":{"name":"Insert Pin","params":{"email":"ball2@gmail.com","password":"123456"}}} was not handled by any navigator.Do you have a screen named '[object Object]'?
           
              // await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
            } else {
              navigation.replace('Set Pin', {
                email: email,
                password: password
              });
              // global.uEmail = email;
              // await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
            }
          }
          return true;
        }
        catch (error) {
          console.log(error)
          alert(error);
          return false
        }
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }


  };




  async function UpdatedPinToFirestore(pinValue) {
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(FIRESTORE_DB, 'users', uid);
    await setDoc(docRef, { pin: pinValue }, { merge: true });
  }

  useEffect(() => {

    checkLoginStatus();
  }, [])



  return (
    <View style={styles.container}>
      <Text style={styles.logostyle}>Log in</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder='Email Address'
        placeholderTextColor='Grey'
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder='Master Password'
        placeholderTextColor='Grey'
        secureTextEntry={hidePassword}
      />

      <Text style={styles.register} onPress={() => navigation.navigate('Register')}>Register?</Text>
      <View style={styles.loginButton}>
        <Button color='#000001' title="Login" onPress={() => UserLogin()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#369EFF'
  },
  logostyle: {
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 30
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: 12,
    padding: 10,
    marginRight: 30,
    marginLeft: 30
  },
  loginButton: {
    marginTop: 12,
    marginRight: 30,
    marginLeft: 30
  },
  register: {
    color: '#FFF',
    marginRight: 30,
    alignSelf: 'flex-end'
  }
});