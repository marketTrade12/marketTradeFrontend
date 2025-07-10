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

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconSet: "feather" | "ionicons" | "material";
  onPress: () => void;
  showChevron?: boolean;
  isDestructive?: boolean;
}

export default function ProfileScreen() {
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
          alignItems: "center",
          paddingVertical: theme.spacing.xl,
        },
        profileCard: {
          margin: theme.spacing.md,
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.lg,
          alignItems: "center",
          ...theme.shadows.medium,
        },
        avatar: {
          width: 80,
          height: 80,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: theme.spacing.md,
        },
        avatarText: {
          fontSize: theme.typography.h1.fontSize,
          fontWeight: theme.typography.h1.fontWeight,
          fontFamily: theme.typography.h1.fontFamily,
          color: theme.colors.textInverse,
        },
        name: {
          fontSize: theme.typography.h2.fontSize,
          fontWeight: theme.typography.h2.fontWeight,
          fontFamily: theme.typography.h2.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        },
        email: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
          marginBottom: theme.spacing.md,
        },
        editButton: {
          backgroundColor: theme.colors.primary,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.borderRadius.sm,
        },
        editButtonText: {
          color: theme.colors.textInverse,
          fontSize: theme.typography.button.fontSize,
          fontWeight: theme.typography.button.fontWeight,
          fontFamily: theme.typography.button.fontFamily,
        },
        section: {
          marginTop: theme.spacing.lg,
        },
        sectionHeader: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.surface,
        },
        sectionTitle: {
          fontSize: theme.typography.subHeading.fontSize,
          fontWeight: theme.typography.subHeading.fontWeight,
          fontFamily: theme.typography.subHeading.fontFamily,
          color: theme.colors.textSecondary,
        },
        menuCard: {
          backgroundColor: theme.colors.cardBackground,
          marginHorizontal: theme.spacing.md,
          borderRadius: theme.borderRadius.md,
          ...theme.shadows.small,
        },
        menuItem: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        lastMenuItem: {
          borderBottomWidth: 0,
        },
        menuIcon: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.sm,
          backgroundColor: theme.colors.surface,
          alignItems: "center",
          justifyContent: "center",
          marginRight: theme.spacing.md,
        },
        menuContent: {
          flex: 1,
        },
        menuTitle: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        },
        menuSubtitle: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
        },
        destructiveTitle: {
          color: theme.colors.error,
        },
        chevron: {
          marginLeft: theme.spacing.sm,
        },
        statsContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: theme.spacing.md,
        },
        statItem: {
          alignItems: "center",
        },
        statValue: {
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.h3.fontWeight,
          fontFamily: theme.typography.h3.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        },
        statLabel: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
        },
        badge: {
          backgroundColor: theme.colors.primaryLight,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.xs,
          marginLeft: theme.spacing.sm,
        },
        badgeText: {
          fontSize: theme.typography.caption.fontSize,
          fontWeight: theme.typography.caption.fontWeight,
          fontFamily: theme.typography.caption.fontFamily,
          color: theme.colors.primary,
        },
        versionText: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textMuted,
          textAlign: "center",
          paddingVertical: theme.spacing.lg,
        },
      }),
    [theme]
  );

  const accountMenuItems: MenuItem[] = [
    {
      id: "personal-info",
      title: "Personal Information",
      subtitle: "Manage your account details",
      icon: "user",
      iconSet: "feather",
      onPress: () => console.log("Personal Info"),
      showChevron: true,
    },
    {
      id: "security",
      title: "Security & Privacy",
      subtitle: "Password, 2FA, and privacy settings",
      icon: "shield",
      iconSet: "feather",
      onPress: () => console.log("Security"),
      showChevron: true,
    },
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Push notifications and email alerts",
      icon: "bell",
      iconSet: "feather",
      onPress: () => console.log("Notifications"),
      showChevron: true,
    },
    {
      id: "language",
      title: "Language & Region",
      subtitle: "English (US)",
      icon: "globe",
      iconSet: "feather",
      onPress: () => router.push("/(tabs)/language-selection"),
      showChevron: true,
    },
  ];

  const tradingMenuItems: MenuItem[] = [
    {
      id: "trading-preferences",
      title: "Trading Preferences",
      subtitle: "Default settings and risk management",
      icon: "trending-up",
      iconSet: "feather",
      onPress: () => console.log("Trading Preferences"),
      showChevron: true,
    },
    {
      id: "portfolio",
      title: "Portfolio Settings",
      subtitle: "View and manage your investments",
      icon: "pie-chart",
      iconSet: "feather",
      onPress: () => router.push("/(tabs)/portfolio"),
      showChevron: true,
    },
    {
      id: "payment-methods",
      title: "Payment Methods",
      subtitle: "Manage cards and bank accounts",
      icon: "credit-card",
      iconSet: "feather",
      onPress: () => console.log("Payment Methods"),
      showChevron: true,
    },
  ];

  const supportMenuItems: MenuItem[] = [
    {
      id: "help-center",
      title: "Help Center",
      subtitle: "FAQs and support articles",
      icon: "help-circle",
      iconSet: "feather",
      onPress: () => router.push("/(tabs)/support"),
      showChevron: true,
    },
    {
      id: "contact-support",
      title: "Contact Support",
      subtitle: "Get help from our team",
      icon: "message-circle",
      iconSet: "feather",
      onPress: () => console.log("Contact Support"),
      showChevron: true,
    },
    {
      id: "feedback",
      title: "Send Feedback",
      subtitle: "Help us improve the app",
      icon: "star",
      iconSet: "feather",
      onPress: () => console.log("Feedback"),
      showChevron: true,
    },
  ];

  const otherMenuItems: MenuItem[] = [
    {
      id: "about",
      title: "About TradeX",
      subtitle: "Version 1.0.0",
      icon: "info",
      iconSet: "feather",
      onPress: () => console.log("About"),
      showChevron: true,
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      icon: "file-text",
      iconSet: "feather",
      onPress: () => console.log("Terms"),
      showChevron: true,
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: "lock",
      iconSet: "feather",
      onPress: () => console.log("Privacy"),
      showChevron: true,
    },
    {
      id: "logout",
      title: "Sign Out",
      icon: "log-out",
      iconSet: "feather",
      onPress: () => console.log("Logout"),
      isDestructive: true,
    },
  ];

  const renderMenuItem = (item: MenuItem, isLast: boolean = false) => (
    <TouchableOpacity
      key={item.id}
      style={[dynamicStyles.menuItem, isLast && dynamicStyles.lastMenuItem]}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={dynamicStyles.menuIcon}>
        <Icon
          name={item.icon}
          set={item.iconSet}
          size={20}
          color={item.isDestructive ? theme.colors.error : theme.colors.text}
        />
      </View>
      <View style={dynamicStyles.menuContent}>
        <Text
          style={[
            dynamicStyles.menuTitle,
            item.isDestructive && dynamicStyles.destructiveTitle,
          ]}
        >
          {item.title}
        </Text>
        {item.subtitle && (
          <Text style={dynamicStyles.menuSubtitle}>{item.subtitle}</Text>
        )}
      </View>
      {item.showChevron && (
        <Icon
          name="chevron-right"
          set="feather"
          size={20}
          color={theme.colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );

  const renderMenuSection = (title: string, items: MenuItem[]) => (
    <View style={dynamicStyles.section}>
      <View style={dynamicStyles.sectionHeader}>
        <Text style={dynamicStyles.sectionTitle}>{title.toUpperCase()}</Text>
      </View>
      <View style={dynamicStyles.menuCard}>
        {items.map((item, index) =>
          renderMenuItem(item, index === items.length - 1)
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar
        style={theme.isLight ? "dark" : "light"}
        backgroundColor={theme.colors.background}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={dynamicStyles.profileCard}>
          <View style={dynamicStyles.avatar}>
            <Text style={dynamicStyles.avatarText}>JD</Text>
          </View>
          <Text style={dynamicStyles.name}>John Doe</Text>
          <Text style={dynamicStyles.email}>john.doe@example.com</Text>

          {/* Quick Stats */}
          <View style={dynamicStyles.statsContainer}>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>12</Text>
              <Text style={dynamicStyles.statLabel}>Active Trades</Text>
            </View>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>₹5,240</Text>
              <Text style={dynamicStyles.statLabel}>Portfolio Value</Text>
            </View>
            <View style={dynamicStyles.statItem}>
              <Text
                style={[
                  dynamicStyles.statValue,
                  { color: theme.colors.success },
                ]}
              >
                +12.5%
              </Text>
              <Text style={dynamicStyles.statLabel}>Returns</Text>
            </View>
          </View>

          <TouchableOpacity style={dynamicStyles.editButton}>
            <Text style={dynamicStyles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Sections */}
        {renderMenuSection("Account", accountMenuItems)}
        {renderMenuSection("Trading", tradingMenuItems)}
        {renderMenuSection("Support", supportMenuItems)}
        {renderMenuSection("Other", otherMenuItems)}

        {/* Version */}
        <Text style={dynamicStyles.versionText}>
          TradeX v1.0.0 • Build 2024.1
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
