import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color="#9BA1A6" />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#9BA1A6"
        style={styles.input}
      />
      <Feather name="sliders" size={18} color="#9BA1A6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E293B",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    margin: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#fff",
  },
});
