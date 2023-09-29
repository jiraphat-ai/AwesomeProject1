import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



function InfoItem({ text, marginTop, fontWeight, color}) {
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
  return (
    <View>
      <InfoItem text="Item information" marginTop={0} fontWeight="bold" color="black"/>
      <InfoItem text="Name" marginTop={30}  />
      <InfoItem text="email" marginTop={10} color="gray" marginLeft={10}/>
      <View style={styles.line}></View>
      <InfoItem text="Username" marginTop={20} />      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <InfoItem text="" marginTop={10} color="gray"/>
      <InfoItem text="xxx@gmail.com" marginTop={20} fontWeight="bold" color="gray" />
      <Icon name="copy" size={20} color="black" style={{ marginLeft: 20 }} /></View>
      <View style={styles.line}></View>
      <InfoItem text="Password" marginTop={20} />      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <InfoItem text="" marginTop={10} color="gray"/>
      <InfoItem text="xxxxxxxxxx" marginTop={15} fontWeight="bold" color="gray" />
      <Icon name="eye" size={20} color="black" style={{ marginLeft: 20 }} />
      <Icon name="copy" size={20} color="black" style={{ marginLeft: 10 }} /></View>
      <View style={styles.line}></View>
      <InfoItem text="URL" marginTop={20} />      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <InfoItem text="" marginTop={10} color="gray"/>
      <InfoItem text="email" marginTop={20} fontWeight="bold" color="gray" />
      <Icon name="copy" size={20} color="black" style={{ marginLeft: 20 }} /></View>
      <View style={styles.line}></View>


      <InfoItem text="Updated : " marginTop={100} color="gray" marginLeft={10} fontSize={10}/>
      <InfoItem text="Password Updated : " color="gray" marginLeft={10} fontSize={10}/>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon onPress={()=>navigation.navigate("Edit Item")} name="edit" size={50} color="#369EFF" style={{ marginTop: 50, marginLeft: 300 }}/>
      <Icon name="trash" size={50} color="black" style={{ marginTop: 45,marginLeft: 20 }}/></View>
    </View>
  );
}

export default View_item;
