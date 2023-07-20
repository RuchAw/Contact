import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
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
import Tile from './Components/Tile';
import ContactsHeader from './Components/ContactsHeader';


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

      return (
        <View style={{ alignItems: "center", justifyContent: 'space-between' }}>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={({item}) => <Tile item={item} navigation={navigation} />}
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
  const HomeHeader = () => (
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

  //The tiles grid
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
            options={{header : ()=>HomeHeader()}}
          />
          <Stack.Screen
            name="Contacts"
            component={Contacts}
            options={{header: ()=>ContactsHeader()}}
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
  }
});