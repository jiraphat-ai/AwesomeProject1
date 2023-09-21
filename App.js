import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider as PaperProvider } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { Appbar, Menu } from 'react-native-paper';
import Delete from './screens/delete';
import Add_password from './screens/add_password';
import { AppRegistry } from 'react-native';


const Stack = createNativeStackNavigator();

function BBScreen() {
  const handleButton1Press = () => {
    // ทำสิ่งที่คุณต้องการเมื่อปุ่ม 1 ถูกกด
    console.log('ปุ่ม 1 ถูกกด');
  };


  const handleButton2Press = () => {
    // ทำสิ่งที่คุณต้องการเมื่อปุ่ม 2 ถูกกด
    console.log('ปุ่ม 2 ถูกกด');
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 20 }}>
      <TouchableOpacity
        style={{ backgroundColor: '#0483F8', padding: 10, borderRadius: 5, marginRight: 20 }}
        onPress={handleButton1Press}
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
  );
}

function HomeScreen() {
  const [emailValue, setEmailValue] = useState('');
  const [userValue, setuserValue] = useState('');
  const [pwValue, setpwValue] = useState('');
  const [urlValue, seturlValue] = useState('');
  const [selectedItemValue, setSelectedItemValue] = useState(''); // ค่าที่เลือกจากรายการแบบดรอปดาวน์
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const handleAddPassword = () => {
    console.log('ข้อความ:', textValue);
    console.log('รายการที่เลือก:', selectedItemValue);
//tt
    // ส่วนการบันทึกรายการรหัสผ่านลงในฐานข้อมูลหรือสตอเรจ
  };

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
          <Picker style={{ backgroundColor: '#FEF9F9'  }}
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
          onChangeText={(text) => setpwValue(text)}/>
         <Icon style={{ marginLeft: 15 }} name="eye" size={20} color="black"/>
          <Icon style={{ marginLeft: 15 }} name="copy" size={20} color="black" />
        <Icon style={{ marginLeft: 15 }} name="exchange" size={15} color="black" />
      </View>
      

      <Text style={{ marginTop: 20, marginBottom: 3, marginTop: 10 }}>URL</Text>
      <View style={{ flexDirection: 'row', marginBottom: 3 }}>
        <TextInput
          style={{ ...styles.textInput, borderColor: 'black', borderWidth: 1, backgroundColor: '#FEF9F9' }}
          placeholder=" URL                                   "
          value={urlValue}
          onChangeText={(text) => seturlValue(text)}
        /><Icon style={{ marginLeft: 15 }} name="copy" size={20} color="black" />
        </View>
        <View style={{flexDirection: 'row',marginTop: 10, alignItems: 'center'}}>
      <CheckBox
          checked={isChecked}
          onPress={toggleCheckBox}
          containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}  
        /><Text style={{justifyContent:'center'}}>New URL</Text></View>
      <BBScreen />

    </View>
  );
}
//หัวฟ้า
function App() {
  return (
    
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          header: CustomNavigationBar,
        }}>
        <Stack.Screen name="My Password" component={Add_password}
        
          options={{
            title: 'My Password',
            headerStyle: {
              backgroundColor: '#369EFF',
            },
            headerTintColor: '#000',
            headerTitleAlign: 'center', // จัดตำแหน่งให้ข้อความอยู่ตรงกลา
            headerTitleStyle: {
            },
            footterStyle: {
              backgroundColor: '#369EFF',
            },

          }}
        />

        <Stack.Screen name="Delete" component={Delete}
        
        options={{
          title: 'Delete',
          headerStyle: {
            backgroundColor: '#369EFF',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center', 
          headerTitleStyle: {
          },
          footterStyle: {
            backgroundColor: '#369EFF',
          },

        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CustomNavigationBar({ navigation, back  ,route }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={{backgroundColor:'#369EFF',alignItems: 'center'}} >
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name}  style={{alignItems:'center'}}/>
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Option 1" />
          <Menu.Item onPress={() => {navigation.navigate('Delete')}} title="Option 2" />
          <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}
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
  }});
  

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
