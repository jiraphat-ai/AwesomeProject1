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
import Home from './screens/Home';
import View_item from './screens/View_item';


const Stack = createNativeStackNavigator();

//หัวฟ้า
function App() {
  return (
    
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          header: CustomNavigationBar,
        }}>
        <Stack.Screen name="My Password" component={Home}
        
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
        <Stack.Screen name="View_item" component={View_item}
        
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

function CustomNavigationBar({ navigation, back, route }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={{ backgroundColor: '#369EFF' }}>
      <View style={{ flexDirection: 'row', alignItems: '', flex: 1 }}>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={route.name} style={{ alignItems: 'center' }} />
      </View>
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item disabled title="MENU">
        <Text style={{ textAlign: 'center' , color: 'black', backgroundColor: 'black', fontWeight: 'bold' , padding: 10 }}>MENU</Text>
        </Menu.Item>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Menu.Item onPress={() => {navigation.navigate('View_item')}} title="All item" />
        <Icon name="th" size={20} color="black" /></View>
        <Menu.Item onPress={() => { console.log('Option 2 was pressed') }} title="Favorites" />
        <Menu.Item onPress={() => {navigation.navigate('Delete')}} title="Delete" />

        <Menu.Item disabled title="Types">
        <Text style={{ color: 'black', backgroundColor: 'black', padding: 10 }}>Types</Text>
        </Menu.Item>
        <Menu.Item onPress={() => { console.log('Option 4 was pressed') }} title="Card" />
        <Menu.Item onPress={() => { console.log('Option 5 was pressed') }} title="Login" />
        <Menu.Item onPress={() => { console.log('Option 6 was pressed') }} title="Identity" />
        <Menu.Item disabled title="Folders">
        <Text style={{ color: 'black', backgroundColor: 'black', padding: 10 }}></Text>
        </Menu.Item>
        <Menu.Item onPress={() => { console.log('Option 6 was pressed') }} title="No Folders" />
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
