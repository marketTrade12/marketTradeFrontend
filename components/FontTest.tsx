import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export function FontTest() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ThemedText type="heading" style={{ marginBottom: theme.spacing.md }}>
        Inter Heading (SemiBold)
      </ThemedText>
      <ThemedText type="subHeading" style={{ marginBottom: theme.spacing.sm }}>
        Inter Sub-Heading (Medium)
      </ThemedText>
      <ThemedText type="body1" style={{ marginBottom: theme.spacing.sm }}>
        Inter Body Text (Regular) - This is regular body text using Inter font.
      </ThemedText>
      <ThemedText type="body2" style={{ marginBottom: theme.spacing.sm }}>
        Inter Body 2 (Regular) - Smaller body text.
      </ThemedText>
      <ThemedText type="caption" style={{ marginBottom: theme.spacing.md }}>
        Inter Caption (Regular) - Small caption text.
      </ThemedText>
      <ThemedText type="button">Inter Button Text (Medium)</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
