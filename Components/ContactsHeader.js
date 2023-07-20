import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

function ContactsHeader() {

  return (
    <LinearGradient
      colors={['hsl(185, 44%, 50%)', 'hsl(185, 44%, 20%)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ padding: 10 }}
    >
      <View style={{ padding: 5, flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <View style={styles.searchBarContainer}>
              <TextInput style={styles.searchInput} placeholder="Search" />
              <Icon name="search-outline" style={styles.searchIcon} size={40} color='white'/>
            </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => console.log('Notification Bell Pressed')}>
            <Icon name="notifications-outline" color='white' size={30}></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Sandwich Menu Pressed')}>
            <Icon name="menu-outline" color='white' size={30}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    searchBar:{
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 0, 
      padding: 0,
      backgroundColor: 'white',
      borderRadius: 20,
      width: '92%'
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 25,
      width: '92%'
    },
    searchInput: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 18,
    },
    searchIcon: {
      backgroundColor: 'hsl(185, 44%, 65%)',
      borderRadius: 25,
    },
  });

export default ContactsHeader;
