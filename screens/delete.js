import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity ,Image} from 'react-native';

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
          placeholder="เพิ่มรายการใหม่"
          onChangeText={(text) => setNewRecord(text)}
          value={newRecord}
        />
        <Button title="เพิ่ม" onPress={handleAddRecord} />
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
            <Text>{item}</Text>
           
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default RecordList;