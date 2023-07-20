import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import stylesLess from "../couleurs_base.less";
import { useNavigation } from "@react-navigation/native";

function ContactCard({ item }) {
  const navigation = useNavigation();
  const handleContactPress = (contact) => {
    navigation.navigate("ContactDetails", contact);
  };

  return (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Icon
            name="person-circle-outline"
            color="hsl(24, 2%, 52%)"
            size={50}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "hsl(24, 2%, 25%)", fontSize: 25 }}>
              {item.prenom}
            </Text>
            <Text
              style={{
                color: "hsl(24, 2%, 40%)",
                fontWeight: "300",
                fontSize: 19,
              }}
            >
              {item.entreprise}
            </Text>
          </View>
        </View>
        <View style={[styles.badge, stylesLess[`${item.statut_couleur}Bg`]]}>
          <Text style={stylesLess[`${item.statut_couleur}`]}>
            {item.statut_label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingBottom: 20,
    backgroundColor: "hsl(24, 2%, 91%)",
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "hsl(24, 2%, 52%)",
    fontWeight: "400",
    fontSize: 18,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "hsl(24, 2%, 98%)",
    borderWidth: 0.2,
    borderColor: "hsl(24, 2%, 52%)",
    alignItems: "center",
    paddingVertical: 3,
  },
  sectionHeader: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "hsl(24, 2%, 55%)",
  },
  cardInfo: {
    flexDirection: "row",
  },
  badge: {
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 25,
  },
});

export default ContactCard;
