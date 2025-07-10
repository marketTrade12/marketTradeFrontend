import { BaseOption } from "@/constants/types";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  option: BaseOption;
  onPress: () => void;
  isSelected?: boolean;
}

export default function MarketOutcomeCard({
  option,
  onPress,
  isSelected = false,
}: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isSelected
        ? theme.colors.primaryLight
        : theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginVertical: theme.spacing.xs,
      borderWidth: 1,
      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
      ...theme.shadows.small,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    label: {
      fontSize: theme.typography.subHeading.fontSize,
      fontFamily: theme.typography.subHeading.fontFamily,
      fontWeight: theme.typography.subHeading.fontWeight,
      color: isSelected ? theme.colors.primary : theme.colors.text,
      flex: 1,
    },
    price: {
      fontSize: theme.typography.h3.fontSize,
      fontFamily: theme.typography.h3.fontFamily,
      fontWeight: theme.typography.h3.fontWeight,
      color: isSelected ? theme.colors.primary : theme.colors.text,
    },
    stats: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statItem: {
      flex: 1,
    },
    statLabel: {
      fontSize: theme.typography.caption.fontSize,
      fontFamily: theme.typography.caption.fontFamily,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs / 2,
    },
    statValue: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      fontWeight: theme.typography.body2.fontWeight,
      color: isSelected ? theme.colors.primary : theme.colors.text,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{option.label}</Text>
        <Text style={styles.price}>{option.priceDisplay}</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>24h Volume</Text>
          <Text style={styles.statValue}>{option.volume24h}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Shares</Text>
          <Text style={styles.statValue}>{option.shares.toLocaleString()}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Change</Text>
          <Text
            style={[
              styles.statValue,
              {
                color:
                  option.priceChange24h >= 0
                    ? theme.colors.success
                    : theme.colors.error,
              },
            ]}
          >
            {option.priceChange24h >= 0 ? "+" : ""}
            {(option.priceChange24h * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
