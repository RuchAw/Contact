import React from 'react';
import { View, SectionList, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ContactCard from './ContactCard';


function Contacts() {

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let contactsUrl = 'https://api-v2.hopcrm.com/api/mobile/contacts';
            let allContacts = [];

            //Fetching contacts for the first time
            let contactsResponse = await fetch(contactsUrl);
            let contactsRawData = await contactsResponse.json();
            // console.log(contactsRawData.next_page_url);
            allContacts = contactsRawData.data;

            //While there is a next page fetch data
            while (contactsRawData.next_page_url != null) {
                console.log(contactsRawData.next_page_url);
                contactsUrl = contactsRawData.next_page_url;
                contactsResponse = await fetch(contactsUrl);
                contactsRawData = await contactsResponse.json();
                allContacts.concat(contactsRawData.data);
            }
            // console.log(allContacts);

            setContacts(allContacts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getSections = () => {
        const sections = [];

        // Sort contacts alphabetically by prenom
        const sortedContacts = contacts.sort((contacta, contactb) => contacta.prenom.localeCompare(contactb.prenom));

        let currentLetter = null;
        let currentContacts = [];

        sortedContacts.forEach((contact) => {
            if (contact.prenom.charAt(0) !== '') {
                const firstLetter = contact.prenom.charAt(0).toUpperCase();

                if (firstLetter !== currentLetter) {
                    // Start a new section for a different letter
                    if (currentContacts.length > 0) {
                        sections.push({ letter: currentLetter, data: currentContacts });
                    }

                    currentLetter = firstLetter;
                    currentContacts = [contact];
                } else {
                    // Add the contact to the current section
                    currentContacts.push(contact);
                }
            }
        });

        // Add the last section
        sections.push({ letter: currentLetter, data: currentContacts });

        return sections;
    };

    const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.letter}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contactHeader}>
                <Icon onPress={handleBackPress} name="chevron-back-outline" color="hsl(24, 2%, 52%)" size={18}></Icon>
                <Text style={styles.headerText}>
                    Contacts
                </Text>
                <View>
                    {/* empty to center items */}
                </View>
            </View>
            <View style={styles.container}>
                <SectionList
                    sections={getSections()}
                    keyExtractor={(item) => item.cle.toString()}
                    renderItem={ContactCard}
                    renderSectionHeader={renderSectionHeader}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingBottom: 20,
        backgroundColor: 'hsl(24, 2%, 91%)'
    },
    contactHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    headerText: {
        color: "hsl(24, 2%, 52%)",
        fontWeight: '400',
        fontSize: 18
    },
    sectionHeader: {
        paddingHorizontal: 6,
        paddingVertical: 8,
    },
    sectionHeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'hsl(24, 2%, 55%)'
    },
    badge: {
        padding: 8,
        marginHorizontal: 10,
        borderRadius: 25
    }
});

export default Contacts
