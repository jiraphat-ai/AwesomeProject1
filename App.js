import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Settings } from 'react-native';
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
import all_item from './screens/all_item';
import edit_item from './screens/edit_item';
import floders from './screens/floders';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Gen_pass from './screens/gen_pass';
import sett from './screens/setting';
import Account_edit from './screens/account_edit';
import Login from './screens/Login';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import Register from './screens/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import SetPinAndConfirmScreen from './screens/set_pin_and_';
import InsertPin from './screens/insertpin';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: '#369EFF', fontSize: 16, fontWeight: 'bold' }, // กำหนดสีและขนาดตัวอักษร
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={30} color={'#369EFF'} />
          ),
        }} />
      <Tab.Screen
        name="Generate Password"
        component={Gen_pass}
        options={{
          headerShown: false,
          tabBarLabel: 'Gennerate Password',
          tabBarLabelStyle: { color: '#369EFF', fontSize: 14, fontWeight: 'bold' }, // กำหนดสีและขนาดตัวอักษร
          tabBarIcon: ({ color, size }) => (
            <Icon name="lock" size={30} color={'#369EFF'} />
          ),
        }} />
      <Tab.Screen
        name="Settings"
        component={sett}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarLabelStyle: { color: '#369EFF', fontSize: 16, fontWeight: 'bold' }, // กำหนดสีและขนาดตัวอักษร
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={30} color={'#369EFF'} />
          ),
        }} />


    </Tab.Navigator>
  );
}
//หัวฟ้า
function App() {
  const auth = FIREBASE_AUTH;
  const [user, setUser] = useState(null)


  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName={user ? "My Password" : "Login"}
        screenOptions={{
          header: CustomNavigationBar,
        }}>
        <Stack.Screen name="Login" component={Login}
          options={{
            headerShown: false, // ทำให้ App Bar ซ่อนตัวทั้งหมด
          }} />

        <Stack.Screen name="Set Pin" component={SetPinAndConfirmScreen}
          options={{
            headerShown: false, // ทำให้ App Bar ซ่อนตัวทั้งหมด
          }} />
            <Stack.Screen name="Insert Pin" component={InsertPin}
          options={{
            headerShown: false, // ทำให้ App Bar ซ่อนตัวทั้งหมด
          }} />
        <Stack.Screen name="Register" component={Register}
          options={{
            headerShown: false, // ทำให้ App Bar ซ่อนตัวทั้งหมด
          }} />
        <Stack.Screen name="My Password" component={BottomTabs}

          options={{
            title: 'My Password',
            headerStyle: {
              backgroundColor: '#369EFF',
            },
            headerLeft: null,
            headerTintColor: '#000',
            headerTitleAlign: 'center', // จัดตำแหน่งให้ข้อความอยู่ตรงกลา
            headerTitleStyle: {
            },
            footterStyle: {
              backgroundColor: '#369EFF',
            },

          }}
        />

        <Stack.Screen name="Add password" component={Add_password}

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

        {/* <Stack.Screen name="Edit item" component={edit_item}
        
        options={{
          title: 'Edit Item',
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
      /> */}

        <Stack.Screen name="Folders" component={floders}

          options={{
            title: 'Folders',
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
        <Stack.Screen name="All item" component={all_item}

          options={{
            title: 'All item',
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
        <Stack.Screen name="Account_edit" component={Account_edit}

          options={{
            title: 'Account_edit',
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

        <Stack.Screen name="Edit Item" component={edit_item}

          options={{
            title: 'edit_item',
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
            <Text style={{ textAlign: 'center', color: 'black', backgroundColor: 'black', fontWeight: 'bold', padding: 10 }}>MENU</Text>
          </Menu.Item>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="th" size={20} color="black" paddingLeft={10} />
            <Menu.Item onPress={() => navigation.navigate('All item')} title="All item"
              style={{ paddingLeft: 10 }} // เพิ่มช่องว่างด้านซ้ายของ Text
            /></View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="trash-o" size={20} color="black" paddingLeft={10} />
            <Menu.Item onPress={() => navigation.navigate('Delete')} title="Delete"
              style={{ paddingLeft: 10 }} // เพิ่มช่องว่างด้านซ้ายของ Text
            /></View>
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
  }
});


export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
