import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {
  const [headerText, setHeaderText] = useState('');
  const [items, setItems] = useState([
    { folder1: 'Folder 1', folder2: 'Folder 2' },
  ]);

  const handleAddItem = () => {
    if (headerText) {
      setItems([...items, { folder1: headerText, folder2: 'Another Folder' }]);
      setHeaderText('');
    }
  };

  const handleItemClick = (itemName) => {
    // Handle the click on the item (e.g., navigate to a new screen or perform an action)
  };

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
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity onPress={() => handleItemClick(item.folder1)}>
              <View style={styles.columnCenter}>
                <Icon name="folder" size={24} color="black" style={styles.icon} />
                <Text style={styles.itemText}>{item.folder1}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleItemClick(item.folder2)}>
              <View style={styles.columnCenter}>
                <Icon name="folder" size={24} color="black" style={styles.icon} />
                <Text style={styles.itemText}>{item.folder2}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
