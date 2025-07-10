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

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "trade" | "reward";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 1000,
    description: "Bank deposit",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    type: "trade",
    amount: -250,
    description: "Bitcoin prediction trade",
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: "3",
    type: "reward",
    amount: 150,
    description: "Winning trade payout",
    date: "2024-01-13",
    status: "completed",
  },
  {
    id: "4",
    type: "withdrawal",
    amount: -500,
    description: "Bank withdrawal",
    date: "2024-01-12",
    status: "pending",
  },
];

export default function WalletScreen() {
  const router = useRouter();
  const theme = useTheme();
  const balance = 2840;

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
        balanceCard: {
          backgroundColor: theme.colors.primary,
          marginHorizontal: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.xl,
          alignItems: "center",
          marginBottom: theme.spacing.lg,
          ...theme.shadows.large,
        },
        balanceLabel: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textInverse,
          marginBottom: theme.spacing.sm,
        },
        balanceAmount: {
          fontSize: theme.typography.h1.fontSize,
          fontWeight: theme.typography.h1.fontWeight,
          fontFamily: theme.typography.h1.fontFamily,
          color: theme.colors.textInverse,
          marginBottom: theme.spacing.lg,
        },
        balanceActions: {
          flexDirection: "row",
          gap: theme.spacing.md,
        },
        actionButton: {
          backgroundColor: theme.colors.textInverse,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.xs,
        },
        actionButtonText: {
          fontSize: theme.typography.button.fontSize,
          fontWeight: theme.typography.button.fontWeight,
          fontFamily: theme.typography.button.fontFamily,
          color: theme.colors.primary,
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
        transactionItem: {
          backgroundColor: theme.colors.cardBackground,
          marginHorizontal: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          flexDirection: "row",
          alignItems: "center",
          ...theme.shadows.small,
        },
        transactionIcon: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.lg,
          alignItems: "center",
          justifyContent: "center",
          marginRight: theme.spacing.md,
        },
        depositIcon: {
          backgroundColor: theme.colors.secondaryLight,
        },
        withdrawalIcon: {
          backgroundColor: theme.colors.surface,
        },
        tradeIcon: {
          backgroundColor: theme.colors.primaryLight,
        },
        rewardIcon: {
          backgroundColor: theme.colors.secondaryLight,
        },
        transactionContent: {
          flex: 1,
        },
        transactionDescription: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        },
        transactionDate: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
        },
        transactionAmount: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          textAlign: "right",
        },
        positiveAmount: {
          color: theme.colors.success,
        },
        negativeAmount: {
          color: theme.colors.error,
        },
        statusBadge: {
          paddingHorizontal: theme.spacing.xs,
          paddingVertical: theme.spacing.xs / 2,
          borderRadius: theme.borderRadius.xs,
          marginTop: theme.spacing.xs,
        },
        completedBadge: {
          backgroundColor: theme.colors.secondaryLight,
        },
        pendingBadge: {
          backgroundColor: theme.colors.warning + "20",
        },
        failedBadge: {
          backgroundColor: theme.colors.error + "20",
        },
        statusText: {
          fontSize: theme.typography.caption.fontSize,
          fontWeight: theme.typography.caption.fontWeight,
          fontFamily: theme.typography.caption.fontFamily,
          textAlign: "right",
        },
        completedText: {
          color: theme.colors.success,
        },
        pendingText: {
          color: theme.colors.warning,
        },
        failedText: {
          color: theme.colors.error,
        },
        emptyState: {
          padding: theme.spacing.xl,
          alignItems: "center",
        },
        emptyText: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
          textAlign: "center",
        },
      }),
    [theme]
  );

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return { name: "arrow-down", color: theme.colors.success };
      case "withdrawal":
        return { name: "arrow-up", color: theme.colors.error };
      case "trade":
        return { name: "trending-up", color: theme.colors.primary };
      case "reward":
        return { name: "award", color: theme.colors.success };
      default:
        return { name: "dollar-sign", color: theme.colors.text };
    }
  };

  const getTransactionIconStyle = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return dynamicStyles.depositIcon;
      case "withdrawal":
        return dynamicStyles.withdrawalIcon;
      case "trade":
        return dynamicStyles.tradeIcon;
      case "reward":
        return dynamicStyles.rewardIcon;
      default:
        return dynamicStyles.tradeIcon;
    }
  };

  const getStatusStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return {
          badge: dynamicStyles.completedBadge,
          text: dynamicStyles.completedText,
        };
      case "pending":
        return {
          badge: dynamicStyles.pendingBadge,
          text: dynamicStyles.pendingText,
        };
      case "failed":
        return {
          badge: dynamicStyles.failedBadge,
          text: dynamicStyles.failedText,
        };
      default:
        return {
          badge: dynamicStyles.completedBadge,
          text: dynamicStyles.completedText,
        };
    }
  };

  const renderTransaction = (transaction: Transaction) => {
    const icon = getTransactionIcon(transaction.type);
    const iconStyle = getTransactionIconStyle(transaction.type);
    const statusStyle = getStatusStyle(transaction.status);
    const isPositive = transaction.amount > 0;

    return (
      <View key={transaction.id} style={dynamicStyles.transactionItem}>
        <View style={[dynamicStyles.transactionIcon, iconStyle]}>
          <Icon name={icon.name} set="feather" size={20} color={icon.color} />
        </View>
        <View style={dynamicStyles.transactionContent}>
          <Text style={dynamicStyles.transactionDescription}>
            {transaction.description}
          </Text>
          <Text style={dynamicStyles.transactionDate}>
            {new Date(transaction.date).toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Text
            style={[
              dynamicStyles.transactionAmount,
              isPositive
                ? dynamicStyles.positiveAmount
                : dynamicStyles.negativeAmount,
            ]}
          >
            {isPositive ? "+" : ""}₹{Math.abs(transaction.amount)}
          </Text>
          <View style={[dynamicStyles.statusBadge, statusStyle.badge]}>
            <Text style={[dynamicStyles.statusText, statusStyle.text]}>
              {transaction.status.toUpperCase()}
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
        <Text style={dynamicStyles.headerTitle}>Wallet</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={dynamicStyles.balanceCard}>
          <Text style={dynamicStyles.balanceLabel}>Available Balance</Text>
          <Text style={dynamicStyles.balanceAmount}>
            ₹{balance.toLocaleString()}
          </Text>
          <View style={dynamicStyles.balanceActions}>
            <TouchableOpacity style={dynamicStyles.actionButton}>
              <Icon
                name="plus"
                set="feather"
                size={16}
                color={theme.colors.primary}
              />
              <Text style={dynamicStyles.actionButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dynamicStyles.actionButton}>
              <Icon
                name="arrow-up"
                set="feather"
                size={16}
                color={theme.colors.primary}
              />
              <Text style={dynamicStyles.actionButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={dynamicStyles.sectionHeader}>
          <Text style={dynamicStyles.sectionTitle}>RECENT TRANSACTIONS</Text>
        </View>

        {mockTransactions.length === 0 ? (
          <View style={dynamicStyles.emptyState}>
            <Text style={dynamicStyles.emptyText}>
              No transactions yet. Your transaction history will appear here.
            </Text>
          </View>
        ) : (
          mockTransactions.map(renderTransaction)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
