import React from 'react';
import { View, SectionList, Text } from 'react-native';

const ContactListScreen = () => {
  const contacts = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    // Add more contacts here
  ];

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.name}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={{ backgroundColor: '#f6f6f6', padding: 10 }}>
      <Text>{title}</Text>
    </View>
  );

  const sections = [
    {
      title: 'A',
      data: contacts.filter((contact) => contact.name.startsWith('A')),
    },
    {
      title: 'B',
      data: contacts.filter((contact) => contact.name.startsWith('B')),
    },
    {
      title: 'C',
      data: contacts.filter((contact) => contact.name.startsWith('C')),
    },
    // Add more sections for other letters
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

export default ContactListScreen;
