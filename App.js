import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, FlatList, ImageBackground, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from './Components/Contacts';
import ContactDetails from './Components/ContactDetails';
import Notes from './Components/Notes';
import Affaires from './Components/Affaires';
import Taches from './Components/Taches';
import Autres from './Components/Autres';
import Infos from './Components/Infos';


const Stack = createNativeStackNavigator();


export default function App() {

  const [dataFromApi, setData] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const volumeUrl = 'https://api-v2.hopcrm.com/api/mobile/infos/volumetrie';
      const userUrl = 'https://api-v2.hopcrm.com/api/mobile/sessions/infos';

      //Fetching data for volumetry
      const volumeResponse = await fetch(volumeUrl);
      const volumeRawData = await volumeResponse.json();
      console.log(volumeRawData);
      setData(volumeRawData);

      //Fetching data for user
      const userResponse = await fetch(userUrl);
      const userRawData = await userResponse.json();
      console.log(userRawData.user.prenom)
      console.log(userRawData.client.nom)
      setUser({
        nomClient: userRawData.client.nom,
        prenomUser: userRawData.user.prenom 
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function ScreenWithButton() {

    return function ({ navigation }) {
      const handleCardPress = (item) => {
        navigation.navigate(`${item.title}`);
      };


      const renderCard = ({ item }) => (
        <TouchableOpacity
          onPress={() => handleCardPress(item)}
        >

          <View style={styles.card}>
            <ImageBackground source={item.image} style={styles.cardBackGroundImage}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={styles.count}>{item.count}</Text>
              </View>
              <View>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </ImageBackground>
          </View>

        </TouchableOpacity>
      );

      return (
        <View style={{ alignItems: "center", justifyContent: 'space-between' }}>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
          />
        </View>
      );
    };


  }


  //The gray bar
  const BarComponent = () => {
    return (
      <View style={{ backgroundColor: 'gray', padding: "5%" }}>
      </View>
    );
  };

  //Home Header 
  const renderHomeHeader = () => (
    <LinearGradient
      colors={['hsl(185, 44%, 50%)', 'hsl(185, 44%, 20%)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ padding: 10 }}
    >
      <View style={{ padding: 5, flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <Image source={require('./assets/images/user.jpg')} style={{ width: 60, height: 60, borderRadius: 30 }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: 'white', fontSize: 25 }}>Bonjour {user.prenomUser}</Text>
            <Text style={{ color: 'white', fontWeight: '200' }}>{user.nomClient}</Text>
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

  //Contacts Header
  const renderContactHeader = () => (
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


  //The cards grid

  const data = [
    { id: '1', title: 'Contacts', image: require('./assets/images/Contacts.png'), count: dataFromApi.contact },
    { id: '2', title: 'Tâches', image: require('./assets/images/Taches.png'), count: dataFromApi.action },
    { id: '3', title: 'Dashboard', image: require('./assets/images/Dashboard.png'), count: dataFromApi.ligne },
    { id: '4', title: 'Enreprises', image: require('./assets/images/Entreprises.png'), count: dataFromApi.organisation },
    { id: '5', title: 'Notes', image: require('./assets/images/Notes.png'), count: dataFromApi.note },
    { id: '6', title: 'Affaires', image: require('./assets/images/Affaires.png'), count: dataFromApi.affaire },
    { id: '7', title: 'Pièces', image: require('./assets/images/Pieces.png'), count: dataFromApi.piece },
    { id: '8', title: 'Produits', image: require('./assets/images/Produits.png'), count: dataFromApi.produit }
  ];

  return (
    <View style={{ flex: 1 }}>
      <BarComponent />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ScreenWithButton()}
            options={{header : ()=>renderHomeHeader()}}
          />
          <Stack.Screen
            name="Contacts"
            component={Contacts}
            options={{header: ()=>renderContactHeader()}}
          />
          <Stack.Screen
            name="ContactDetails"
            component={ContactDetails}
          />
          <Stack.Screen
            name="Notes"
            component={Notes}
          />
          <Stack.Screen
            name="Affaires"
            component={Affaires}
          />
          <Stack.Screen
            name="Autres"
            component={Autres}
          />
          <Stack.Screen
            name="Taches"
            component={Taches}
          />
          <Stack.Screen
            name="Infos"
            component={Infos}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: 'hsl(24, 2%, 75%)',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginHorizontal: 20,
    marginVertical: 8,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 155,
    width: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "hsl(24, 2%, 95%)"
  },
  count: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "hsl(24, 2%, 95%)"
  },
  cardBackGroundImage: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
    width: 140,
    height: 145,
    resizeMode: 'contain',
  },
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