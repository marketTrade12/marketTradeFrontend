import Icon from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Choose a Market",
    description:
      "Browse through various prediction markets and select one that interests you.",
    icon: "search",
  },
  {
    id: 2,
    title: "Make Your Prediction",
    description:
      "Decide whether you think the outcome will be 'Yes' or 'No' and choose your stake amount.",
    icon: "target",
  },
  {
    id: 3,
    title: "Place Your Trade",
    description:
      "Confirm your prediction and place your trade. Your shares will be added to your portfolio.",
    icon: "trending-up",
  },
  {
    id: 4,
    title: "Track & Earn",
    description:
      "Monitor your positions and earn rewards when your predictions are correct.",
    icon: "award",
  },
];

export default function HowToPlayScreen() {
  const router = useRouter();
  const theme = useTheme();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
        },
        backButton: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.surface,
          alignItems: "center",
          justifyContent: "center",
          marginRight: theme.spacing.md,
        },
        headerTitle: {
          fontSize: theme.typography.h2.fontSize,
          fontWeight: theme.typography.h2.fontWeight,
          fontFamily: theme.typography.h2.fontFamily,
          color: theme.colors.text,
        },
        content: {
          paddingHorizontal: theme.spacing.md,
        },
        intro: {
          marginBottom: theme.spacing.xl,
        },
        introTitle: {
          fontSize: theme.typography.h1.fontSize,
          fontWeight: theme.typography.h1.fontWeight,
          fontFamily: theme.typography.h1.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.md,
          textAlign: "center",
        },
        introDescription: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
          textAlign: "center",
          lineHeight: theme.typography.body1.lineHeight,
          marginBottom: theme.spacing.lg,
        },
        stepsContainer: {
          marginBottom: theme.spacing.xl,
        },
        stepCard: {
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.md,
          flexDirection: "row",
          alignItems: "flex-start",
          ...theme.shadows.small,
        },
        stepNumber: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
          marginRight: theme.spacing.md,
        },
        stepNumberText: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textInverse,
        },
        stepContent: {
          flex: 1,
        },
        stepTitle: {
          fontSize: theme.typography.heading.fontSize,
          fontWeight: theme.typography.heading.fontWeight,
          fontFamily: theme.typography.heading.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        },
        stepDescription: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
          lineHeight: theme.typography.body1.lineHeight,
        },
        stepIcon: {
          marginLeft: theme.spacing.sm,
        },
        tipsContainer: {
          backgroundColor: theme.colors.primaryLight,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.xl,
        },
        tipsTitle: {
          fontSize: theme.typography.heading.fontSize,
          fontWeight: theme.typography.heading.fontWeight,
          fontFamily: theme.typography.heading.fontFamily,
          color: theme.colors.primary,
          marginBottom: theme.spacing.md,
          textAlign: "center",
        },
        tip: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.primary,
          lineHeight: theme.typography.body1.lineHeight,
          marginBottom: theme.spacing.sm,
        },
        footer: {
          padding: theme.spacing.lg,
        },
        startButton: {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.borderRadius.md,
          paddingVertical: theme.spacing.md,
          alignItems: "center",
          ...theme.shadows.medium,
        },
        startButtonText: {
          fontSize: theme.typography.button.fontSize,
          fontWeight: theme.typography.button.fontWeight,
          fontFamily: theme.typography.button.fontFamily,
          color: theme.colors.textInverse,
        },
      }),
    [theme]
  );

  const renderStep = (step: Step) => (
    <View key={step.id} style={dynamicStyles.stepCard}>
      <View style={dynamicStyles.stepNumber}>
        <Text style={dynamicStyles.stepNumberText}>{step.id}</Text>
      </View>
      <View style={dynamicStyles.stepContent}>
        <Text style={dynamicStyles.stepTitle}>{step.title}</Text>
        <Text style={dynamicStyles.stepDescription}>{step.description}</Text>
      </View>
      <View style={dynamicStyles.stepIcon}>
        <Icon
          name={step.icon}
          set="feather"
          size={20}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar
        style={theme.isLight ? "dark" : "light"}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity
          style={dynamicStyles.backButton}
          onPress={() => router.back()}
        >
          <Icon
            name="arrow-left"
            set="feather"
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle}>How to Play</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={dynamicStyles.content}>
          {/* Introduction */}
          <View style={dynamicStyles.intro}>
            <Text style={dynamicStyles.introTitle}>
              Start Trading in 4 Simple Steps
            </Text>
            <Text style={dynamicStyles.introDescription}>
              TradeX makes prediction trading simple and fun. Follow these steps
              to get started with your first trade.
            </Text>
          </View>

          {/* Steps */}
          <View style={dynamicStyles.stepsContainer}>
            {steps.map(renderStep)}
          </View>

          {/* Tips */}
          <View style={dynamicStyles.tipsContainer}>
            <Text style={dynamicStyles.tipsTitle}>💡 Pro Tips</Text>
            <Text style={dynamicStyles.tip}>
              • Start with small amounts to get familiar with the platform
            </Text>
            <Text style={dynamicStyles.tip}>
              • Research the topic before making predictions
            </Text>
            <Text style={dynamicStyles.tip}>
              • Diversify your portfolio across different markets
            </Text>
            <Text style={dynamicStyles.tip}>
              • Check market trends and community sentiment
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={dynamicStyles.footer}>
          <TouchableOpacity
            style={dynamicStyles.startButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={dynamicStyles.startButtonText}>Start Trading Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
