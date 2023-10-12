
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const generatePassword = (length, useSymbols, useUppercase, useLowercase, useNumbers) => {
  const maxLength = 32;
  const minLength = 12;

  if (length < minLength || length > maxLength) {
    alert(`ความยาวรหัสผ่านต้องอยู่ระหว่าง 8-32 ตัวอักษร`);
    return null;
  }

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

  // Check password strength
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[-!@#$%^&*()_+=[\]{}|;:',.<>?]/.test(password);
  const isStrong =
    password.length >= 14 &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSymbol;

  let strength = '';
  if (isStrong) {
    strength = 'Strong';
  } else if (password.length > minLength && (hasUppercase || hasLowercase || hasNumber || hasSymbol)) {
    strength = 'Mediocre';
  } else {
    strength = 'Weak';
  }

  return { password, strength };
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');

  const generateNewPassword = () => {
    const { password, strength } = generatePassword(
      passwordLength,
      useSymbols,
      useUppercase,
      useLowercase,
      useNumbers
    );
    setPassword(password);
    setPasswordStrength(strength);
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
      <TextInput style={styles.password}>{password}</TextInput>
      <Text style={styles.passwordStrengthLabel}>Password Strength:</Text>
      <Text style={styles.passwordStrength}>{passwordStrength}</Text>
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
  passwordStrengthLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordStrength: {
    fontSize: 20,
    color: 'blue',
  },
});

export default PasswordGenerator;


