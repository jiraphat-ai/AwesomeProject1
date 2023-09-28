import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


function RecordList() {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState('');

  const handleAddRecord = () => {
    if (newRecord) {
      setRecords([...records, newRecord]);
      setNewRecord('');
    }
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder="เพิ่มรายการใหม่test"
          onChangeText={(text) => setNewRecord(text)}
          value={newRecord}
        />
        <Button title="เพิ่มtest" onPress={handleAddRecord} />
      </View>

      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleDeleteRecord(index)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              borderBottomWidth: 1,
              borderColor: '#ccc',
            }}
          >
           <View style={{ flexDirection: 'row', alignItems: 'left'}}>
         
                  <Icon name="google" fade size={20} color="black" />
                 
              </View>
              <Text style={{ flexDirection: 'row', alignItems: 'right' }}>{item}{'\n'}{item}@gmail.com</Text>   
             
        
         
          
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="trash-o" fade size={20} color="black" />
              </View>
              
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default RecordList;