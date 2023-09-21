import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Add_password from './add_password';

export default function Home({ navigation }) {
  const [headerText, setHeaderText] = useState('');
  const [items, setItems] = useState([]);
  const Stack = createNativeStackNavigator();

  const handleAddItem = () => {
    if (headerText) {
      setItems([...items, headerText]);
      setHeaderText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.flatten([{ marginTop: -5 }, styles.header])}>
        <Icon name="search" size={24} color="black" style={styles.icon} />
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
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />


      <Button style={{ backgroundColor: '#0483F8', justifyContent: 'center', marginTop: 100, marginHorizontal: 160 }} icon="plus" mode="contained" onPress={() => navigation.navigate('Add password')} title="add item">
        add item
      </Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#369EFF',
    padding: 10,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 20,
    color: 'white',
    flex: 1,
    backgroundColor: 'transparent',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 24,
  },
  item: {
    backgroundColor: 'lightgray',
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
