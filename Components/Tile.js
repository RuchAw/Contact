import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

function Tile({ item, navigation }) {
  const handleCardPress = (item) => {
    navigation.navigate(`${item.title}`);
  };
  return (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.card}>
        <ImageBackground source={item.image} style={styles.cardBackGroundImage}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.count}>{item.count}</Text>
          </View>
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "hsl(24, 2%, 75%)",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginHorizontal: 20,
    marginVertical: 8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 155,
    width: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "hsl(24, 2%, 95%)",
  },
  count: {
    fontSize: 36,
    fontWeight: "bold",
    color: "hsl(24, 2%, 95%)",
  },
  cardBackGroundImage: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    width: 140,
    height: 145,
    resizeMode: "contain",
  },
});

export default Tile;
