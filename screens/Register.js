import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextInput, Button, View,  Modal } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [hint, setHint] = useState(null);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');



  async function UserRegister() {
    if (password !== confirmPassword) {
      setError('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      const data = {
        id: uid,
        email: email,
        name: name,
        hint: hint,
        phoneNumber : phoneNumber
      };
      const usersRef = firebase.firestore().collection('users');
      await usersRef.doc(uid).set(data);
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <View style={styles.container}>
      <Icon
        name="user"
        size={50}
        color="#00001"
        style={{ marginRight: 10, alignSelf: 'center' }}
      />
      <Text style={styles.logostyle}>Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="Grey"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="Grey"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Master Password"
        placeholderTextColor="Grey"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Re-type Master Password"
        placeholderTextColor="Grey"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />
        <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        placeholderTextColor="grey"
      />
         <Text style={styles.master}>Master Password Hint (optional)</Text>
      <TextInput style={styles.input} onChangeText={setHint} />

      <Text style={styles.login} onPress={() => navigation.navigate('Login')}>
        Login?
      </Text>
      <View style={styles.loginButton}>
        <Button
          color="#000001"
          title="Register"
          onPress={() => UserRegister()}
        />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#369EFF',
    padding: 8,
  },
  logostyle: {
    paddingVertical: 10,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: 12,
    padding: 10,
    marginRight: 30,
    marginLeft: 30,
  },
  loginButton: {
    marginTop: 12,
    marginRight: 30,
    marginLeft: 30,
  },
  master: {
    marginRight: 30,
    marginLeft: 40,
    marginTop: 5,
  },
  login: {
    color: '#FFF',
    marginRight: 30,
    alignSelf: 'flex-end',
  },
});
