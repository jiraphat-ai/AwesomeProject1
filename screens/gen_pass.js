import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Clipboard from '@react-native-community/clipboard'; // เพิ่มการนำเข้า Clipboard

const generatePassword = (length, useSymbols, useUppercase, useLowercase, useNumbers) => {
  let charset = '';
  if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumbers) charset += '0123456789';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};



const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  
  const copyToClipboard = () => {
    Clipboard.setString(password); // ใช้ Clipboard เพื่อคัดลอกข้อความไปยังคลิปบอร์ด
    alert('Password copied to clipboard');
  };
  const generateNewPassword = () => {
    const newPassword = generatePassword(
      passwordLength,
      useSymbols,
      useUppercase,
      useLowercase,
      useNumbers
    );
    setPassword(newPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Password Length"
        keyboardType="numeric"
        value={passwordLength.toString()}
        onChangeText={(text) => setPasswordLength(parseInt(text) || 0)}
      />
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, useSymbols && styles.optionSelected]}
          onPress={() => setUseSymbols(!useSymbols)}
        >
          <Text>Symbol</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, useUppercase && styles.optionSelected]}
          onPress={() => setUseUppercase(!useUppercase)}
        >
          <Text>Uppercase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, useLowercase && styles.optionSelected]}
          onPress={() => setUseLowercase(!useLowercase)}
        >
          <Text>Lowercase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, useNumbers && styles.optionSelected]}
          onPress={() => setUseNumbers(!useNumbers)}
        >
          <Text>Numbers</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.generateButton} onPress={generateNewPassword}>
        <Text>Generate Password</Text>
      </TouchableOpacity>
      <Text style={styles.passwordLabel}>Generated Password:</Text>
      <Text style={styles.password}>{password}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 200,
    padding: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  optionSelected: {
    backgroundColor: 'lightblue',
  },
  generateButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  passwordLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  password: {
    fontSize: 20,
  },
});

export default PasswordGenerator;