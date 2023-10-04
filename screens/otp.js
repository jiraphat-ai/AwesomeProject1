import React, { useState, useEffect, useRef } from 'react';
import { Text, 
        StyleSheet, 
        TextInput, 
        Button, 
        View,
        Alert, 
        TouchableOpacity} from 'react-native';
import { firebase } from '@firebase/app';
import  firestore  from '../firestore';
import Home  from './Home';
import Register  from './Register';
import '@firebase/auth';

export default function Otp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

 

 return (
    <View style={styles.container}>
      <Text style={styles.logostyle}>OTP</Text>
    <TextInput
      placeholder = 'Phone Number With Country code'
      placeholderTextColor='Grey'
      onchangeText = {setPhoneNumber}
      keyboardType = 'phone-pad'
      autoCompleteType='tel'
      style = {styles.input}
    />
    <TouchableOpacity style= {styles.sendVerification} >
     <Text style={styles.buttonText}>
      Send OTP
     </Text>
    </TouchableOpacity>
      <TextInput
      placeholder = 'OTP'
      placeholderTextColor='Grey'
      onchangeText = {setCode}
      keyboardType = 'number-pad'
      autoCompleteType='tel'
      style = {styles.input}
    />
     <TouchableOpacity style= {styles.sendVerification} >
     <Text style={styles.buttonText}>
      Confirm OTP
     </Text>
    </TouchableOpacity>
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
  sendVerification:{
    backgroundColor: '#003366',
    marginTop: 12,
    marginRight: 30,
    marginLeft: 30,
    height:35,
    padding: 6
  },
  buttonText: {
    color: '#FFF',
    alignSelf: 'center',
  }
});