import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const edit_item = () => {
  return (
    <View>
      <Text>edit_item</Text>
    </View>
  )
}

export default edit_item