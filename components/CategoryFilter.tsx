import { Colors } from "@/constants/Colors";
import { MarketCategory } from "@/constants/types";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "./ui/Icon";

type Props = {
  categories: (MarketCategory | "all")[];
  selectedCategory: string;
  onCategorySelect: (category: MarketCategory | "all") => void;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "sports":
      return { name: "trophy", set: "feather" };
    case "politics":
      return { name: "gavel", set: "material" };
    case "crypto":
      return { name: "bitcoin", set: "fontawesome" };
    case "economics":
      return { name: "trending-up", set: "feather" };
    case "technology":
      return { name: "cpu", set: "feather" };
    case "entertainment":
      return { name: "film", set: "feather" };
    case "business":
      return { name: "briefcase", set: "feather" };
    case "science":
      return { name: "flask", set: "ionicons" };
    case "news":
      return { name: "newspaper", set: "ionicons" };
    default:
      return { name: "grid", set: "feather" };
  }
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: Props) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const icon = getCategoryIcon(category);
        return (
          <TouchableOpacity
            key={category}
            style={styles.tab}
            onPress={() => onCategorySelect(category)}
          >
            <Icon
              name={icon.name}
              set={icon.set as any}
              size={24}
              color={isSelected ? theme.primary : "#9CA3AF"}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: isSelected ? theme.text : "#6B7280",
                  fontWeight: isSelected ? "600" : "500",
                },
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            {isSelected && (
              <View
                style={[
                  styles.selectedIndicator,
                  { backgroundColor: theme.primary },
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  tab: {
    alignItems: "center",
    marginHorizontal: 12,
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
  selectedIndicator: {
    height: 2,
    width: 24,
    borderRadius: 1,
    marginTop: 4,
  },
});
