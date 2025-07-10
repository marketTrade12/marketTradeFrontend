import { useTheme } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface Position {
  id: string;
  marketQuestion: string;
  outcome: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  profit: number;
  profitPercentage: number;
  status: "active" | "closed" | "resolved";
  imageUrl?: string;
}

const mockPositions: Position[] = [
  {
    id: "1",
    marketQuestion: "Will Bitcoin reach $100,000 by end of 2024?",
    outcome: "Yes",
    shares: 50,
    avgPrice: 65,
    currentPrice: 72,
    value: 3600,
    profit: 350,
    profitPercentage: 10.8,
    status: "active",
  },
  {
    id: "2",
    marketQuestion: "Will Tesla stock price exceed $300 this quarter?",
    outcome: "No",
    shares: 30,
    avgPrice: 45,
    currentPrice: 38,
    value: 1140,
    profit: -210,
    profitPercentage: -15.6,
    status: "active",
  },
  {
    id: "3",
    marketQuestion: "Will inflation rate be below 3% in Q4 2024?",
    outcome: "Yes",
    shares: 25,
    avgPrice: 55,
    currentPrice: 55,
    value: 1375,
    profit: 0,
    profitPercentage: 0,
    status: "resolved",
  },
];

export default function PortfolioScreen() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "closed">(
    "all"
  );
  const theme = useTheme();

  const filteredPositions = mockPositions.filter((position) => {
    if (activeTab === "all") return true;
    return position.status === activeTab;
  });

  const totalValue = mockPositions.reduce((sum, pos) => sum + pos.value, 0);
  const totalProfit = mockPositions.reduce((sum, pos) => sum + pos.profit, 0);
  const totalProfitPercentage =
    totalValue > 0 ? (totalProfit / (totalValue - totalProfit)) * 100 : 0;

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        header: {
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.lg,
          paddingBottom: theme.spacing.md,
        },
        title: {
          fontSize: theme.typography.h2.fontSize,
          fontWeight: theme.typography.h2.fontWeight,
          fontFamily: theme.typography.h2.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.sm,
        },
        portfolioValue: {
          fontSize: theme.typography.h1.fontSize,
          fontWeight: theme.typography.h1.fontWeight,
          fontFamily: theme.typography.h1.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        },
        profitLoss: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          marginBottom: theme.spacing.lg,
        },
        summaryCard: {
          margin: theme.spacing.md,
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.lg,
          ...theme.shadows.medium,
        },
        summaryRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: theme.spacing.sm,
        },
        summaryLabel: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
        },
        summaryValue: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
        },
        summaryDivider: {
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          marginVertical: theme.spacing.sm,
        },
        tabsContainer: {
          flexDirection: "row",
          paddingHorizontal: theme.spacing.md,
          marginBottom: theme.spacing.md,
        },
        tab: {
          flex: 1,
          paddingVertical: theme.spacing.sm,
          alignItems: "center",
          borderBottomWidth: 2,
          borderBottomColor: "transparent",
        },
        activeTab: {
          borderBottomColor: theme.colors.primary,
        },
        tabText: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
        },
        activeTabText: {
          color: theme.colors.primary,
          fontWeight: theme.typography.body1.fontWeight,
        },
        positionCard: {
          marginHorizontal: theme.spacing.md,
          marginBottom: theme.spacing.md,
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          ...theme.shadows.small,
        },
        positionHeader: {
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: theme.spacing.sm,
        },
        positionIcon: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.surface,
          marginRight: theme.spacing.sm,
        },
        positionInfo: {
          flex: 1,
        },
        positionQuestion: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
          lineHeight: theme.typography.body1.lineHeight,
          marginBottom: theme.spacing.xs,
        },
        positionOutcome: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
        },
        statusBadge: {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.xs,
        },
        statusBadgeActive: {
          backgroundColor: theme.colors.secondaryLight,
        },
        statusBadgeClosed: {
          backgroundColor: theme.colors.surface,
        },
        statusBadgeResolved: {
          backgroundColor: theme.colors.primaryLight,
        },
        statusText: {
          fontSize: theme.typography.caption.fontSize,
          fontWeight: theme.typography.caption.fontWeight,
          fontFamily: theme.typography.caption.fontFamily,
        },
        statusTextActive: {
          color: theme.colors.success,
        },
        statusTextClosed: {
          color: theme.colors.textSecondary,
        },
        statusTextResolved: {
          color: theme.colors.primary,
        },
        positionStats: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: theme.spacing.sm,
        },
        statItem: {
          alignItems: "center",
        },
        statLabel: {
          fontSize: theme.typography.caption.fontSize,
          fontFamily: theme.typography.caption.fontFamily,
          color: theme.colors.textSecondary,
          marginBottom: theme.spacing.xs,
        },
        statValue: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
        },
        profitPositive: {
          color: theme.colors.success,
        },
        profitNegative: {
          color: theme.colors.error,
        },
        emptyState: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: theme.spacing.xxxl,
        },
        emptyText: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
          textAlign: "center",
          marginBottom: theme.spacing.lg,
        },
        exploreButton: {
          backgroundColor: theme.colors.primary,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
        },
        exploreButtonText: {
          color: theme.colors.textInverse,
          fontSize: theme.typography.button.fontSize,
          fontWeight: theme.typography.button.fontWeight,
          fontFamily: theme.typography.button.fontFamily,
        },
      }),
    [theme, activeTab]
  );

  const renderTabButton = (tab: "all" | "active" | "closed", label: string) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        key={tab}
        style={[dynamicStyles.tab, isActive && dynamicStyles.activeTab]}
        onPress={() => setActiveTab(tab)}
      >
        <Text
          style={[
            dynamicStyles.tabText,
            isActive && dynamicStyles.activeTabText,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPosition = ({ item }: { item: Position }) => {
    const isProfit = item.profit > 0;
    const isLoss = item.profit < 0;

    return (
      <View style={dynamicStyles.positionCard}>
        <View style={dynamicStyles.positionHeader}>
          <View style={dynamicStyles.positionIcon}>
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={dynamicStyles.positionIcon}
              />
            ) : (
              <View
                style={[
                  dynamicStyles.positionIcon,
                  { backgroundColor: theme.colors.surface },
                ]}
              />
            )}
          </View>
          <View style={dynamicStyles.positionInfo}>
            <Text style={dynamicStyles.positionQuestion} numberOfLines={2}>
              {item.marketQuestion}
            </Text>
            <Text style={dynamicStyles.positionOutcome}>
              Position: {item.outcome}
            </Text>
          </View>
          <View
            style={[
              dynamicStyles.statusBadge,
              item.status === "active" && dynamicStyles.statusBadgeActive,
              item.status === "closed" && dynamicStyles.statusBadgeClosed,
              item.status === "resolved" && dynamicStyles.statusBadgeResolved,
            ]}
          >
            <Text
              style={[
                dynamicStyles.statusText,
                item.status === "active" && dynamicStyles.statusTextActive,
                item.status === "closed" && dynamicStyles.statusTextClosed,
                item.status === "resolved" && dynamicStyles.statusTextResolved,
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={dynamicStyles.positionStats}>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>Shares</Text>
            <Text style={dynamicStyles.statValue}>{item.shares}</Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>Avg Price</Text>
            <Text style={dynamicStyles.statValue}>₹{item.avgPrice}</Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>Current</Text>
            <Text style={dynamicStyles.statValue}>₹{item.currentPrice}</Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>Value</Text>
            <Text style={dynamicStyles.statValue}>₹{item.value}</Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>P&L</Text>
            <Text
              style={[
                dynamicStyles.statValue,
                isProfit && dynamicStyles.profitPositive,
                isLoss && dynamicStyles.profitNegative,
              ]}
            >
              {isProfit ? "+" : ""}₹{item.profit} ({isProfit ? "+" : ""}
              {item.profitPercentage.toFixed(1)}%)
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar
        style={theme.isLight ? "dark" : "light"}
        backgroundColor={theme.colors.background}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.title}>Portfolio</Text>
          <Text style={dynamicStyles.portfolioValue}>
            ₹{totalValue.toLocaleString()}
          </Text>
          <Text
            style={[
              dynamicStyles.profitLoss,
              totalProfit > 0 && dynamicStyles.profitPositive,
              totalProfit < 0 && dynamicStyles.profitNegative,
            ]}
          >
            {totalProfit > 0 ? "+" : ""}₹{totalProfit} (
            {totalProfit > 0 ? "+" : ""}
            {totalProfitPercentage.toFixed(2)}%) today
          </Text>
        </View>

        {/* Summary Card */}
        <View style={dynamicStyles.summaryCard}>
          <View style={dynamicStyles.summaryRow}>
            <Text style={dynamicStyles.summaryLabel}>Total Invested</Text>
            <Text style={dynamicStyles.summaryValue}>
              ₹{(totalValue - totalProfit).toLocaleString()}
            </Text>
          </View>
          <View style={dynamicStyles.summaryRow}>
            <Text style={dynamicStyles.summaryLabel}>Current Value</Text>
            <Text style={dynamicStyles.summaryValue}>
              ₹{totalValue.toLocaleString()}
            </Text>
          </View>
          <View style={dynamicStyles.summaryDivider} />
          <View style={dynamicStyles.summaryRow}>
            <Text style={dynamicStyles.summaryLabel}>Total P&L</Text>
            <Text
              style={[
                dynamicStyles.summaryValue,
                totalProfit > 0 && dynamicStyles.profitPositive,
                totalProfit < 0 && dynamicStyles.profitNegative,
              ]}
            >
              {totalProfit > 0 ? "+" : ""}₹{totalProfit} (
              {totalProfit > 0 ? "+" : ""}
              {totalProfitPercentage.toFixed(2)}%)
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={dynamicStyles.tabsContainer}>
          {renderTabButton("all", "All")}
          {renderTabButton("active", "Active")}
          {renderTabButton("closed", "Closed")}
        </View>

        {/* Positions List */}
        {filteredPositions.length === 0 ? (
          <View style={dynamicStyles.emptyState}>
            <Text style={dynamicStyles.emptyText}>
              No positions found{activeTab !== "all" ? ` in ${activeTab}` : ""}
            </Text>
            <TouchableOpacity style={dynamicStyles.exploreButton}>
              <Text style={dynamicStyles.exploreButtonText}>
                Explore Markets
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredPositions}
            renderItem={renderPosition}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
