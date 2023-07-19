import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Switch } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Infos({ route }) {
  const [details, setDetails] = useState(route.params.contact_details);
  const [isEnabledMail, setIsEnabledMail] = useState(false);
  const toggleSwitchMail = () =>
    setIsEnabledMail((previousState) => !previousState);

  const [isEnabledSms, setIsEnabledSms] = useState(false);
  const toggleSwitchSms = () =>
    setIsEnabledSms((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.identityContainer}>
        <Text style={styles.identityText}>Nom</Text>
        <TextInput
          style={styles.identityTextInput}
          value={details.contact.nom}
        />
      </View>
      <View style={styles.identityContainer}>
        <Text style={styles.identityText}>Prénom</Text>
        <TextInput
          style={styles.identityTextInput}
          value={details.contact.prenom}
        />
      </View>
      <View style={styles.identityContainer}>
        <Text style={styles.identityText}>Adresse email</Text>
        <View style={styles.contactLine}>
          <View style={styles.contactDetailsContainer}>
            <TextInput
              style={styles.contactDetailsTextInput}
              value={details.contact.e_mail}
            />
            <Icon
              name="mail-outline"
              style={styles.contactDetailsInputIcon}
              size={30}
              color="white"
            />
          </View>
          <View style={styles.contactSwitchContainer}>
            <Text style={styles.identityText}>Option mail</Text>
            <Switch
              onValueChange={toggleSwitchMail}
              value={isEnabledMail}
              style={styles.contactSwitch}
              thumbColor={isEnabledMail ? "white" : "gray"}
            />
          </View>
        </View>
      </View>
      <View style={styles.identityContainer}>
        <View style={[styles.contactLine, {alignItems: 'flex-start'}]}>
          <View style={styles.doubleContact}>
          <Text style={styles.identityText}>Téléphone mobile</Text>
            <View style={styles.contactDetailsContainer}>
              <TextInput
                style={styles.contactDetailsTextInput}
                value={details.contact.telephone_mobile}
              />
              <Icon
                name="call-outline"
                style={styles.contactDetailsInputIcon}
                size={30}
                color="white"
              />
            </View>
            <Text style={styles.identityText}>Téléphone fixe</Text>
            <View style={styles.contactDetailsContainer}>
              <TextInput
                style={styles.contactDetailsTextInput}
                value={details.contact.telephone_fixe}
              />
              <Icon
                name="call-outline"
                style={styles.contactDetailsInputIcon}
                size={30}
                color="white"
              />
            </View>
          </View>
          <View style={styles.contactSwitchContainer}>
            <Text style={styles.identityText}>Option SMS</Text>
            <Switch
              onValueChange={toggleSwitchSms}
              value={isEnabledSms}
              style={styles.contactSwitch}
              thumbColor={isEnabledSms ? "white" : "gray"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "hsl(24, 2%, 90%)",
    height: "100%",
  },
  identityContainer: {
    flexDirection: "column",
  },
  identityText: {
    color: "hsl(24, 2%, 55%)",
    fontSize: 18,
    fontWeight: "500",
  },
  identityTextInput: {
    padding: 10,
    fontSize: 18,
    borderColor: "gray",
    borderWidth: 0.5,
    marginRight: 5,
    color: "hsl(24, 2%, 50%)",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 4,
  },
  contactLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    marginBottom: 5,
  },
  contactDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 4,
  },
  contactDetailsInputIcon: {
    backgroundColor: "green",
    padding: 8.5,
  },
  contactDetailsTextInput: {
    padding: 10,
    fontSize: 18,
    borderColor: "gray",
    borderWidth: 0.5,
    color: "hsl(24, 2%, 50%)",
    backgroundColor: "white",
    width: "80%",
  },
  contactSwitchContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  contactSwitch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  doubleContact: {
    flexDirection : 'column',
    gap: 7
  }
});

export default Infos;
