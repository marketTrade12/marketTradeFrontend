import { MarketCategory } from "@/constants/types";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  selectedCategory: string;
  onCategorySelect: (category: any) => void;
  categories: MarketCategory[];
}

export default function CategoryFilter({
  selectedCategory,
  onCategorySelect,
  categories,
}: Props) {
  const theme = useTheme();

  const getCategoryIcon = (category: MarketCategory) => {
    switch (category) {
      case "sports":
        return "⚽";
      case "politics":
        return "🏛️";
      case "crypto":
        return "₿";
      case "entertainment":
        return "🎭";
      case "technology":
        return "💻";
      default:
        return "📊";
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    categoryButton: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginRight: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: "row",
      alignItems: "center",
      minWidth: 100,
    },
    activeCategoryButton: {
      backgroundColor: theme.colors.primaryLight,
      borderColor: theme.colors.primary,
    },
    categoryIcon: {
      marginRight: theme.spacing.xs,
      fontSize: 16,
    },
    categoryText: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.textSecondary,
      textTransform: "capitalize",
    },
    activeCategoryText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });

  const renderCategory = ({ item }: { item: MarketCategory }) => {
    const isSelected = selectedCategory === item;
    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          isSelected && styles.activeCategoryButton,
        ]}
        onPress={() => onCategorySelect(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.categoryIcon}>{getCategoryIcon(item)}</Text>
        <Text
          style={[styles.categoryText, isSelected && styles.activeCategoryText]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: theme.spacing.lg }}
      />
    </View>
  );
}
