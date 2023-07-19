import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Notes from "./Notes";
import Affaires from "./Affaires";
import Infos from "./Infos";
import Taches from "./Taches";
import Autres from "./Autres";

const Tab = createBottomTabNavigator();

function FooterTab({ navigation, contact }) {
  return (
    <Tab.Navigator
      initialRouteName="Infos"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
        tabBarStyle:{
            backgroundColor: 'hsl(24, 2%, 52%)',
        }
      }}
    >
      <Tab.Screen
        name="Infos"
        component={Infos}
        initialParams={{contact: contact}}
        options={{
          tabBarLabel: "Infos",
          tabBarIcon: ({ color }) => (
            <Icon
              name="information-circle-outline"
              color={ color }
              size={35}
              onPress={() => {
                navigation.navigate("Infos", contact);
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarLabel: "Notes",
          tabBarIcon: ({ color }) => (
            <Icon
              name="pencil-outline"
              color={ color }
              size={35}
              onPress={() => {
                navigation.navigate("Notes");
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Taches"
        component={Taches}
        options={{
          tabBarLabel: "Taches",
          tabBarIcon: ({ color }) => (
            <Icon
              name="calendar-outline"
              color={ color }
              size={35}
              onPress={() => {
                navigation.navigate("Notes");
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Affaires"
        component={Affaires}
        options={{
          tabBarLabel: "Affaires",
          tabBarIcon: ({ color }) => (
            <Icon
              name="disc-outline"
              color={ color }
              size={35}
              onPress={() => {
                navigation.navigate("Notes");
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Autres"
        component={Autres}
        options={{
          tabBarLabel: "Autres",
          tabBarIcon: ({ color }) => (
            <Icon
              name="menu-outline"
              color={ color }
              size={35}
              onPress={() => {
                navigation.navigate("Autres");
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default FooterTab;
