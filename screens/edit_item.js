import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function InfoItem({ text, marginTop, fontWeight, color }) {
  return (
    <View>
      <Text style={[styles.text, { marginTop, fontWeight, color }]}>{text}</Text>
    </View>
  );
}

function EditItem({ navigation, route }) {
  const [name, setName] = useState(''); // สถานะสำหรับชื่อ
  const [email, setEmail] = useState(''); // สถานะสำหรับอีเมล
  const [username, setUsername] = useState(''); // สถานะสำหรับชื่อผู้ใช้
  const [password, setPassword] = useState(''); // สถานะสำหรับรหัสผ่าน
  const [url, setUrl] = useState(''); // สถานะสำหรับ URL
  useEffect(() => {
    console.log("sdsd",route.params?.data)

  }, [])
  return (
    <View>
      <InfoItem text="Item information" marginTop={0} fontWeight="bold" color="black" />
      <InfoItem text="Name" marginTop={20} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InfoItem text="" marginTop={10} color="gray" />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setName}
          placeholder="name"
        />
        <Icon name="copy" size={20} color="black" style={{ marginLeft: 20 }} />
      </View>
      <InfoItem text="Username" marginTop={20} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InfoItem text="" marginTop={10} color="gray" />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="username"
        />
        <Icon name="copy" size={20} color="black" style={{ marginLeft: 20 }} />
      </View>
      <InfoItem text="Password" marginTop={20} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InfoItem text="" marginTop={10} color="gray" />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
        />
        <Icon name="eye" size={20} color="black" style={{ marginLeft: 20 }} />
        <Icon name="copy" size={20} color="black" style={{ marginLeft: 10 }} />
      </View>
      <InfoItem text="URL" marginTop={20} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InfoItem text="" marginTop={10} color="gray" />
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="URL"
        />
        <Icon name="copy" size={20} color="black" style={{ marginLeft: 20 }} />
      </View>

      <InfoItem text="Last Updated : " marginTop={100} color="gray" marginLeft={10} fontSize={10} />
      <InfoItem text="Last Password Updated : " color="gray" marginLeft={10} fontSize={10} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="save" size={50} color="red" style={{ marginTop: 45, marginLeft: 350 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
  },
  input: {
    marginLeft: 10,
    fontSize: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default EditItem;
