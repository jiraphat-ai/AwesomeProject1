import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet , Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchDocumentOnce } from '../function/get_data';
import { Decrypt } from '../function/aes';
import Clipboard from '@react-native-clipboard/clipboard';
import { DeleteDoc } from '../function/Add_data';



function InfoItem({ text, marginTop, fontWeight, color }) {



  return (
    <View>

      <Text style={[styles.text, { marginTop, fontWeight, color }]}>{text}</Text>
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
  }
});


function View_item({ navigation, route }) {
  const [data, setData] = useState({}); // สถานะสำหรับชื่อผู้ใช้
  const [username, setUser] = useState("************")
  const [password, setPass] = useState("************")

  
  const [eye, setEye] = useState(true)
  function copyText(text){
    console.log(text)
    
    Clipboard.setStrings([text]);
  }
  async function GetInfo(id) {

    const dataFetch = await fetchDocumentOnce(id);
    setData(dataFetch)

  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetInfo(route.params?.id);
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    GetInfo(route.params?.id)
  }, [])
  return (
    <View>
      <InfoItem text="Item information" marginTop={0} fontWeight="bold" color="black" />
      <InfoItem text="Name" marginTop={30} />
      <InfoItem text={data.tag} marginTop={10} color="gray" marginLeft={10} />
      <View style={styles.line}></View>
      <InfoItem text="Username" marginTop={20} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InfoItem text="" marginTop={10} color="gray" />
        <InfoItem text={username} marginTop={20} fontWeight="bold" color="gray" />
        <Icon name="copy" size={20} color="black" style={{ marginLeft: 20 }} /></View>
      <View style={styles.line}></View>
      <InfoItem text="Password" marginTop={20} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InfoItem text="" marginTop={10} color="gray" />
        <InfoItem text={password} marginTop={15} fontWeight="bold" color="gray" />
        <Icon onPress={async ()  => {
          if (!eye) {
            setUser(await Decrypt(data.username));
            setPass(await Decrypt(data.password));
          }
          else {
            setUser("************");
            setPass("************");
           
          }
          setEye(!eye)
        }} name="eye" size={20} color="black" style={{ marginLeft: 20 }} />
        <Icon name="copy" onPress={()=>{
          copyText(password);
        }} size={20} color="black" style={{ marginLeft: 10 }} /></View>
      <View style={styles.line}></View>
      <InfoItem text="URL" marginTop={20} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InfoItem text="" marginTop={10} color="gray" />
        <InfoItem text={data.URL} marginTop={20} fontWeight="bold" color="gray" />
        <Icon name="copy" size={20} color="black" style={{ marginLeft: 20 }} /></View>
      <View style={styles.line}></View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon onPress={() => navigation.navigate({
              name: 'Edit Item', 
              params: data
            })} name="edit" size={50} color="#369EFF" style={{ marginTop: 50, marginLeft: 300 }} />
        <Icon name="trash" size={50} color="black" onPress={()=>{
          Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => DeleteDoc("password_entry",data.id).then(() => {
                navigation.goBack();
              }) }
            ]
          );
        }} style={{ marginTop: 45, marginLeft: 20 }} /></View>
    </View>
  );
}

export default View_item;
