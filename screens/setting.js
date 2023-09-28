import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingsPage() {
  const [isTwoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon name="user" size={54} color="black" />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Setting</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.twoFactorRow}>
          <Text style={styles.twoFactorText}>Two-Factor Authentication</Text>
          <Switch
            value={isTwoFactorAuthEnabled}
            onValueChange={(newValue) => setTwoFactorAuthEnabled(newValue)}
          />
        </View>
      </View>

      <View style={styles.accountRow}>
        <Text style={styles.accountText}>My Account</Text>
        <Icon name="pencil" size={20} color="black" style={styles.icon} />
      </View>


       <View style={styles.accountRow}>
        <Text style={styles.accountText}>Delete</Text>
        <Icon name="trash" size={20} color="black" style={styles.icon} />
      </View>


       <View style={styles.accountRow}>
        <Text style={styles.accountText}>Log Out</Text>
        <Icon name="arrow-right-from-bracket" size={20} color="black" style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#369EFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    marginTop: 50,
  },
  titleContainer: {
    marginTop: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionContainer: {
    alignItems: 'flex-start',
    marginTop: 100,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  twoFactorRow: {
    flexDirection: 'row',
    alignItems: 'center',
     width: 300,
    height: 50,
    
    
  },
  twoFactorText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 30,
    fontWeight: 'bold',
  },
  accountText: {
    flex: 1,
    fontWeight: 'bold',
     fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default SettingsPage;
