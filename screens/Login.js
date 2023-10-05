 import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, TextInput, Button, View } from 'react-native';
import { firebase } from '@firebase/app';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { StackActions, NavigationActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  // const goToMyPassword = () => {
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: 'My Password' })],
  //   });
  
  //   // dispatch การรีเซ็ต stack navigator
  //   navigation.dispatch(resetAction);
  // };
  

  const UserLogin = async () => {
    try{
      const respones = await signInWithEmailAndPassword(auth,email,password)
      navigation.replace('My Password');
      global.uEmail = email;
      await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
    }
    catch(error){
      console.log(error)
      alert(error);
    }finally{
      
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

async function checkLoginStatus() {
  try {
    // ตรวจสอบข้อมูลการล็อกอินใน AsyncStorage
    const userd = await AsyncStorage.getItem('user');
    if (userd) {
      // แปลงข้อมูล JSON กลับเป็น Object
      const userData = JSON.parse(userd);
      console.log(userData)
      try{
        const respones = await signInWithEmailAndPassword(auth,userData.email,userData.password)
        navigation.replace('My Password');
        global.uEmail = userData.email;
        return true;
      } 
      catch(error){
        console.log(error)
        alert(error); 
        return false
      }
    }
  } catch (error) {
    console.error('Error checking login status:', error);
  }

};

useEffect(()=> {

  checkLoginStatus();
},[])



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