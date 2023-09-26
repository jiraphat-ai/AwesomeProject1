import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, SectionList, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Folders = () => {
  const [headerText, setHeaderText] = useState('');
  // const [data, setItem] = useState(['Folder1','Folders2','Folders3']);
 const data = ['Folder1','Folders2','Folders3','Folder1','Folders2','Folders3'];
  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Icon name="search" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.headerText}
          value={headerText}
          onChangeText={(text) => setHeaderText(text)}
          placeholder="Search..."
          placeholderTextColor="white"
        />
      </View>
      
      <FlatList
        data={data}
        numColumns={2} // กำหนดให้แสดงเป็น 2 คอลัมน์
      contentContainerStyle={styles.containercol}
        renderItem={({ item }) => 
          
            <TouchableOpacity 
        onPress={() => {
          // navigation.navigate({
          //   name: 'View_item', 
          //   params: {
          //     type:item.title
          //   }
          // })
        }}>
        <View style={styles.column}>
      <Icon name="folder" size={80} color="#F4B948" style={styles.icon} />
       <Text>{item}</Text>
      </View></TouchableOpacity>
     
      }
        keyExtractor={item => `basicListEntry-${item}`}
      />
      
    </View>
   
    
  );
};

const styles = StyleSheet.create({
  containercol: {
     alignItems:'center'
  },
  column: {
    flex: 1, // คอลัมน์แต่ละคอลัมน์จะมีพื้นที่เท่ากัน
    marginHorizontal: 48, // ระยะห่างในคอลัมน์
    // คุณสามารถเพิ่มสไตล์เพิ่มเติมเพื่อกำหนดรูปแบบและสไตล์ในคอลัมน์แต่ละคอลัมน์ตามที่ต้องการ
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#369EFF',
    padding: 10,
    borderRadius: 25,
  },
  headerText: {
    flex: 1,
    color: 'black',
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Updated this line
    paddingHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
  },
  columnCenter: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default Folders;