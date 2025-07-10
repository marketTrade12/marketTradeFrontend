import Icon from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
  retryText?: string;
  backText?: string;
}

export default function ErrorState({
  message,
  onRetry,
  onBack,
  retryText = "Try Again",
  backText = "Go Back",
}: ErrorStateProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.xl,
    },
    icon: {
      marginBottom: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.h3.fontWeight,
      fontFamily: theme.typography.h3.fontFamily,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: "center",
    },
    message: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
      lineHeight: theme.typography.body1.lineHeight,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      gap: theme.spacing.sm,
      minWidth: 120,
      justifyContent: "center",
    },
    retryButton: {
      backgroundColor: theme.colors.primary,
    },
    backButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    buttonText: {
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
      fontFamily: theme.typography.button.fontFamily,
    },
    retryButtonText: {
      color: theme.colors.textInverse,
    },
    backButtonText: {
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          name="alert-circle"
          set="feather"
          size={64}
          color={theme.colors.textSecondary}
        />
      </View>
      <Text style={styles.title}>Oops! Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttonContainer}>
        {onRetry && (
          <TouchableOpacity
            style={[styles.button, styles.retryButton]}
            onPress={onRetry}
            activeOpacity={0.8}
          >
            <Icon
              name="refresh-cw"
              set="feather"
              size={16}
              color={theme.colors.textInverse}
            />
            <Text style={[styles.buttonText, styles.retryButtonText]}>
              {retryText}
            </Text>
          </TouchableOpacity>
        )}

        {onBack && (
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Icon
              name="arrow-left"
              set="feather"
              size={16}
              color={theme.colors.text}
            />
            <Text style={[styles.buttonText, styles.backButtonText]}>
              {backText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
