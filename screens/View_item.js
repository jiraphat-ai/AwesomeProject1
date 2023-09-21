import React, { Component } from 'react'
import { FAB } from 'react-native-paper';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';



function View_item() {
  const [number, onChangeNumber] = React.useState('');
    var payments = [];
    for(let i = 0; i < 2; i++){
  
      payments.push(
        <View key = {i}>
           <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
        </View>
      )
    }
  return ( <View>
    <View>
      <View><Text>No</Text></View>
      <View><Text>Name</Text></View>
      <View><Text>Preference</Text></View>
    </View>

    { payments }
  </View>)
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default View_item;

