import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { doc, setDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { CheckBox } from 'react-native-elements';
import { NativeModules, Platform } from 'react-native'
import AesCrypto from 'react-native-aes-crypto';
import CryptoJS from 'crypto-js';
import { Decrypt, Encrypt } from '../function/aes';
import { addToFirestore } from '../function/Add_data';
import { FetchDataPassword } from '../function/get_data'
const Stack = createNativeStackNavigator();



function Add_password({navigation}) {
  const [emailValue, setEmailValue] = useState('');
  const [userValue, setuserValue] = useState('');
  const [pwValue, setpwValue] = useState('');
  const [urlValue, seturlValue] = useState('');
  const [selectedItemValue, setSelectedItemValue] = useState(''); // ค่าที่เลือกจากรายการแบบดรอปดาวน์
  const [isChecked, setIsChecked] = useState(false);
  const [isShow, setShow] = useState(true);
  const [strength, setstrength] = useState('');
  const [color, setColor] = useState('');


  const auth = FIREBASE_AUTH;
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const SaveBTN = async () => {
    try{
    let En = await Encrypt(pwValue);
    let De = await Decrypt(En);
    console.log("En", En, "De", De)
   
     await addToFirestore("password_entry" , auth.currentUser.uid , {
        URL : urlValue,
        date_created : Timestamp.now(),
        date_updated : Timestamp.now(),
        password : await Encrypt(pwValue),
        username : await Encrypt(userValue),
        tag : emailValue
      }).then(() => {
        navigation.goBack();
      })

  }catch(error){
    console.log(error)
  };}
  //88

  const handleButton2Press = () => {
    // ทำสิ่งที่คุณต้องการเมื่อปุ่ม 2 ถูกกด
    FetchDataPassword()
  };
  var maxlength = 32
    var minlength = 12
  function GennaratePasswordSecurity() {
  
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
      retVal = "";
    for (var i = 0, n = charset.length; i < maxlength; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    CheckSecurity()
    setpwValue(retVal)
  }

  function CheckSecurity() {
    const hasUppercase = /[A-Z]/.test(pwValue);
    const hasLowercase = /[a-z]/.test(pwValue);
    const hasNumber = /\d/.test(pwValue);
    const hasSymbol = /[-!@#$%^&*()_+=[\]{}|;:',.<>?]/.test(pwValue);
    const isStrong =
      pwValue.length >= 14 &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSymbol;

    let strength = '';
    let color = '';
    if (isStrong) {
      strength = 'Strong';
      color = 'green'
    } else if (pwValue.length >= minlength && (hasUppercase || hasLowercase || hasNumber || hasSymbol)) {
      strength = 'Mediocre';
      color = 'orange'
    } else {
      strength = 'Weak';
      color = 'red'
    }
    setstrength(strength)
    setColor(color)
  }

  React.useEffect(() => {
    CheckSecurity()
  })


  return (
    <View style={{ padding: 15, marginTop: 10, }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Icon name="remove" size={20} color="black" /></View>
      <Text style={{ marginTop: 20, marginBottom: 3, marginTop: 10 }}>What type of item is this?</Text>
      <Picker style={{ backgroundColor: '#FEF9F9' }}
        selectedValue={selectedItemValue}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedItemValue(itemValue)
        }
      >
        <Picker.Item label="Login" value="Login" />
        <Picker.Item label="Card" value="Card" />
        <Picker.Item label="Identity" value="Identity" />
        <Picker.Item label="Secure Note" value="SN" />
      </Picker>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View style={{ flex: 1, flexDirection: 'column', paddingEnd: 20 }}>
          <Text style={{ marginTop: 20, marginBottom: 3 }}>Name</Text>
          <TextInput
            style={{
              ...styles.textInput,
              borderColor: 'black',
              borderWidth: 1,
              backgroundColor: '#FEF9F9',
            }}
            placeholder="Email"
            value={emailValue}
            onChangeText={(text) => setEmailValue(text)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'column', paddingEnd: 20 }}>
          <Text style={{ marginTop: 20, marginBottom: 3 }}>Folder</Text>
          <Picker style={{ backgroundColor: '#FEF9F9' }}
            selectedValue={selectedItemValue}
            onValueChange={(itemValue, itemIndex) => setSelectedItemValue(itemValue)}
          >
            <Picker.Item label="No Folder" value="No Folder" />
          </Picker>
        </View></View>

      <Text style={{ flexDirection: 'row', marginBottom: 3, marginTop: 10 }}>Username</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{ ...styles.textInput, borderColor: 'black', borderWidth: 1, backgroundColor: '#FEF9F9' }}
          placeholder=" XXX@gmail.com             "
          value={userValue}
          onChangeText={(text) => setuserValue(text)}
        /><Icon style={{ marginLeft: 15 }} name="copy" size={20} color="black" />
      </View>


      <Text style={{ marginTop: 20, marginBottom: 3, marginTop: 10 }}>Password</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>

        <TextInput
          style={{ ...styles.textInput, borderColor: 'black', borderWidth: 1, backgroundColor: '#FEF9F9' }}
          placeholder=" XXXXXX                           "
          value={pwValue}
          secureTextEntry={isShow}
          onChangeText={(text) => setpwValue(text)} />
        <Icon style={{ marginLeft: 15 }} name="eye" onPress={() => {
          setShow(!isShow)
        }} size={20} color="black" />
        <Icon style={{ marginLeft: 15 }} name="copy" size={20} color="black" />
        <Icon style={{ marginLeft: 15 }} onPress={() => {
          GennaratePasswordSecurity()
        }} name="exchange" size={15} color="black" />
      </View>

      <Text style={{ marginTop: 20, marginBottom: 3, marginTop: 10, color: color }}>{strength}</Text>
      <Text style={{ marginTop: 20, marginBottom: 3, marginTop: 10 }}>URL</Text>
      <View style={{ flexDirection: 'row', marginBottom: 3 }}>
        <TextInput
          style={{ ...styles.textInput, borderColor: 'black', borderWidth: 1, backgroundColor: '#FEF9F9' }}
          placeholder=" URL                                   "
          value={urlValue}
          onChangeText={(text) => seturlValue(text)}
        /><Icon style={{ marginLeft: 15 }} name="copy" size={20} color="black" />
      </View>

      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <CheckBox
          checked={isChecked}
          onPress={toggleCheckBox}
          containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
        /><Text style={{ justifyContent: 'center' }}>New URL</Text></View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#0483F8', padding: 10, borderRadius: 5, marginRight: 20 }}
          onPress={SaveBTN}
        >
          <Text style={{ color: 'black' }}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: '#FEF9F9', padding: 10, borderRadius: 5 }}
          onPress={handleButton2Press}
        >
          <Text style={{ color: 'black' }}>CANCEL</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
//หัวฟ้า


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',

    footerContainer: {
      backgroundColor: '#369EFF', // เปลี่ยนสีตรงนี้เป็นสีที่คุณต้องการ
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText: {
      color: 'white', // เปลี่ยนสีตรงนี้ตามที่คุณต้องการ
    },

  },

});

const buttonStyle = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightgray',
    padding: 10,
    alignItems: 'center',
  }
});


export default Add_password;