import React, { useEffect, useState } from 'react';
import { View, SectionList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

function ContactDetails({ route }) {

    console.log(route.params.cle);

    const [details, setDetails] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            let detailsUrl = `https://api-v2.hopcrm.com/api/mobile/contacts/${route.params.cle}`;

            let detailsResponse = await fetch(detailsUrl);
            let detailsRawData = await detailsResponse.json();
            // console.log(detailsRawData);
           
            setDetails(detailsRawData);

            console.log(detailsRawData);
            console.log(details);

            setLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };
    
    const renderDetailsHeader = () => (
        <LinearGradient
          colors={['hsl(185, 44%, 50%)', 'hsl(185, 44%, 20%)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ padding: 10, paddingBottom: 20 }}
          
        >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon onPress={handleBackPress} name="chevron-back-outline" color="white" size={16}></Icon>
                    <Text style={{color: 'white'}}>
                        Contacts
                    </Text>
                </View>
                <View>
                    {/* empty for space in the middle */}
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={{color: 'white'}}>
                            Modifier
                        </Text>
                    </TouchableOpacity>
                </View>
            
            </View>
          <View style={{ padding: 5, flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Image source={require('../assets/images/fakeimg.jpg')} style={{ width: 80, height: 80, borderRadius: 40 }} />
              {details.contact && 
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'white', fontSize: 25 }}>{details?.contact.prenom} {details?.contact.nom}</Text>
                <Text style={{ color: 'white', fontWeight: '200' }}>{details?.entreprise.nom}</Text>
                <Text style={{ color: 'white', fontWeight: '200' }}>{details?.contact.e_mail}</Text>
                <Text style={{ color: 'white', fontWeight: '200' }}>{details?.contact.telephone_mobile}</Text>
              </View>}
              
            </View>

            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '25%'}}>
              <TouchableOpacity onPress={() => console.log('Mail pressed')} >
                <Icon name="mail-outline" color='white' size={40}></Icon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Call Pressed')}>
                <Icon name="call-outline" color='white' size={40}></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      );

    useEffect(() => {
        navigation.setOptions(
            {header : ()=>renderDetailsHeader()}
        );
    }, [loaded]);

    return (
        <View>
            <Text>
                Contact details
            </Text>
        </View>
    )
}

export default ContactDetails
