import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function FourTextInputBoxes() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');

  const handleSave = () => {
    console.log('ข้อความที่กล่อง 1:', text1);
    console.log('ข้อความที่กล่อง 2:', text2);
    console.log('ข้อความที่กล่อง 3:', text3);
    console.log('ข้อความที่กล่อง 4:', text4);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>My Account                                      </Text> 
        <Button title="Save" onPress={handleSave} />
      </View>

      <View style={styles.textInput}>
        <Icon name="envelope" size={20} color="black" style={{marginHorizontal:7,}}/>
        <TextInput
          placeholder="Email Address"
          onChangeText={setText1}
          value={text1}
        />
        <Icon name="pencil" size={20} color="black" style={{marginHorizontal:70,}}/>
      </View>

      <View style={styles.textInput}>
        <Icon name="user" size={20} color="black" style={{marginHorizontal:10,}}/>
        <TextInput
          placeholder="Your name"
          onChangeText={setText2}
          value={text2}
        />
        <Icon name="pencil" size={20} color="black" style={{marginHorizontal:70,}}/>
      </View>

      <View style={styles.textInput}>
        <Icon name="key" size={20} color="black" style={{marginHorizontal:7,}}/>
        <TextInput
          placeholder="Master Password"
          onChangeText={setText3}
          value={text3}
        />
        <Icon name="eye" size={20} color="black" />
        <Icon name="copy" size={20} color="black" style={{marginHorizontal:10,}}/>
        <Icon name="exchange" size={15} color="black"style={{marginHorizontal:10,}} />
      </View>

      <View style={styles.textInput}>
        <Icon name="lock" size={20} color="black" style={{marginHorizontal:10,}}/>
        <TextInput
          placeholder="Re-type Master Password"
          onChangeText={setText4}
          value={text4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#369EFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  textInput: {
    backgroundColor: 'white',
    width: 300,
    height: 36,
    fontSize: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FourTextInputBoxes;