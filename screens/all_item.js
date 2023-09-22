import { SectionList, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { Avatar, Card, IconButton } from 'react-native-paper';
import React from 'react'
//  data: ['Facebook', 'Instagram', 'Google'],
export default function All_item({ navigation }) {
  const data = [{
    title: 'FAVORITES',
    data: [{
      title: 'Facebook',
      subtitle: 'Facebook subtitle',
      icon: 'facebook'
    },
    {
      title: 'Instagram',
      subtitle: 'Instagram subtitle',
      icon: 'instagram'
    },
    {
      title: 'Google',
      subtitle: 'Google subtitle',
      icon: 'google'
    },
    {
      title: 'TikTok',
      subtitle: 'TikTok subtitle',
      icon: 'tiktok'
    }],

  },
  {
    title: 'TYPES',
    data: [{
      title: 'Card',
      subtitle: 'Card subtitle',

    },
    {
      title: 'log in',
      subtitle: 'log in subtitle'
    },
    {
      title: 'Google',
      subtitle: 'Google subtitle'
    },
    {
      title: 'identity',
      subtitle: 'identity subtitle'
    }],
  },
  {
    title: 'FOLDERS',
    data: [{
      title: 'FOLDER1',
      subtitle: 'FOLDER1 subtitle'
    },
    {
      title: 'FOLDER2',
      subtitle: 'FOLDER2 subtitle'
    },
    {
      title: 'FOLDER3',
      subtitle: 'FOLDER3 subtitle'
    },
    ],
  },
  ]
  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        renderItem={({ item }) => <TouchableOpacity 
        onPress={() => {
          navigation.navigate({
            name: 'View_item', 
            params: {
              type:item.title
            }
          })
        }}>
          <Card.Title
          title={item.title}
          subtitle={item.subtitle}
          left={(props) => <Avatar.Icon {...props} icon={item.icon ? item.icon : 'folder'} />}
          right={(props) => <IconButton {...props} icon="dots-vertical"  />}
        /></TouchableOpacity>}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#369EFF',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});