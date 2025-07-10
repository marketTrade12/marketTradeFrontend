// components/Header.tsx
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "../ui/Icon";

export default function Header() {
  const theme = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    logoContainer: {
      // Logo styles
    },
    logoText: {
      fontSize: theme.typography.h2.fontSize,
      fontFamily: theme.typography.h2.fontFamily,
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.colors.primary,
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      gap: theme.spacing.xs,
      ...theme.shadows.small,
    },
    actionText: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.text,
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      {/* Left - Logo */}
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => router.push("/(tabs)")}
      >
        <Text style={styles.logoText}>TradeX</Text>
      </TouchableOpacity>

      {/* Right - Actions */}
      <View style={styles.actions}>
        {/* Wallet Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/wallet")}
        >
          <Icon
            name="wallet"
            set="ionicons"
            size={18}
            color={theme.colors.text}
          />
          <Text style={styles.actionText}>$1,000</Text>
        </TouchableOpacity>

        {/* How to Play Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/how-to-play")}
        >
          <Icon
            name="help-circle"
            set="feather"
            size={18}
            color={theme.colors.text}
          />
          <Text style={styles.actionText}>How to Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
