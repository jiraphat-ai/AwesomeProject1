import React, { Component } from 'react'
import { FAB } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

function View_item({ navigation, route }) {
  const [text, setText] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const screen_width = Dimensions.get('screen').width;
  var input_label = [{
    label: 'Name',
    icon: <Icon style={{ padding:15, justifyContent: 'center' }} name="eye" size={20} color="black" />
  }, {label:'Password',icon: <Icon style={{ padding:15, justifyContent: 'center' }} name="eye" size={20} color="black" />}, {label:'Url'}];
  var inputs = [];
  for (let i = 0; i < input_label.length; i++) {

    inputs.push(
      <View style={styles.input} key={i}>
        <TextInput style={{ width: screen_width * 0.7 }}
          label={input_label[i].label}
          secureTextEntry={passwordVisible}
          value={text}
          right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
          onChangeText={text => setText(text)
          
          }

        />
      {input_label[i]?.icon}
      </View>
    )
  }
  return (<View>

    <View style={styles.contriner}>
      <View><Text>{route.params?.type}</Text></View>
    </View>

    {inputs}
  </View>)
}
const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    width: 100
  },
  contriner: {
    padding: 20
  }
});
export default View_item;

