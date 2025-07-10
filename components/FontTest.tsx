import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function FontTest() {
  const theme = useTheme();

  return (
    <View style={{ padding: theme.spacing.md }}>
      <ThemedText type="title" style={{ marginBottom: theme.spacing.md }}>
        Inter H1 (Bold)
      </ThemedText>
      <ThemedText
        type="defaultSemiBold"
        style={{ marginBottom: theme.spacing.sm }}
      >
        Inter Sub-Heading (SemiBold)
      </ThemedText>
      <ThemedText type="default" style={{ marginBottom: theme.spacing.sm }}>
        Inter Body1 (Regular)
      </ThemedText>
      <ThemedText type="subtitle" style={{ marginBottom: theme.spacing.sm }}>
        Inter Body2 (Regular)
      </ThemedText>
      <ThemedText type="link" style={{ marginBottom: theme.spacing.md }}>
        Inter Caption (Regular)
      </ThemedText>
      <ThemedText type="defaultSemiBold">Inter Button Text (Medium)</ThemedText>
    </View>
  );
}
