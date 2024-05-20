import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import ArrowRight from "../../icons/ArrowRight";

interface Item {
  label: string;
  description: string;
  pathTo: string;
  navigation: any;
}

const ListItem: React.FC<Item> = ({
  label,
  navigation,
  pathTo,
  description,
}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate(pathTo, { title: label });
      }}
    >
      <View style={styles.itemContent}>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={styles.itemName}>{label}</Text>
          <Text style={{ opacity: 0.5 }}>{description}</Text>
        </View>
        <ArrowRight fill="#000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 8,
    shadowColor: "#000",
    height: 80,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "500",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default ListItem;
