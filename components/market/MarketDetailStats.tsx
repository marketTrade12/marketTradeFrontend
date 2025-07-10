import { useTheme } from "@/hooks/useThemeColor";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface MarketDetailStatsProps {
  volume: number;
  participants: number;
  liquidity: number;
  status: "active" | "closed" | "resolved";
  createdDate: string;
  resolutionDate?: string;
  totalShares?: number;
  avgPrice?: number;
}

export default function MarketDetailStats({
  volume,
  participants,
  liquidity,
  status,
  createdDate,
  resolutionDate,
  totalShares,
  avgPrice,
}: MarketDetailStatsProps) {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return theme.colors.success;
      case "closed":
        return theme.colors.textSecondary;
      case "resolved":
        return theme.colors.info;
      default:
        return theme.colors.textSecondary;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.cardBackground,
          margin: theme.spacing.md,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.lg,
          ...theme.shadows.medium,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: theme.spacing.md,
          gap: theme.spacing.sm,
        },
        headerIcon: {
          width: 8,
          height: 8,
          borderRadius: theme.borderRadius.xs,
          backgroundColor: getStatusColor(status),
        },
        headerTitle: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
        },
        headerStatus: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: getStatusColor(status),
          textTransform: "uppercase",
        },
        statsGrid: {
          gap: theme.spacing.lg,
        },
        statRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          gap: theme.spacing.md,
        },
        statItem: {
          flex: 1,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.sm,
          padding: theme.spacing.md,
        },
        statLabel: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
          marginBottom: theme.spacing.xs,
        },
        statValue: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
        },
        dateSection: {
          marginTop: theme.spacing.lg,
          paddingTop: theme.spacing.lg,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        },
        dateRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing.sm,
        },
        dateLabel: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
        },
        dateValue: {
          fontSize: theme.typography.body2.fontSize,
          fontWeight: theme.typography.body2.fontWeight,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.text,
        },
      }),
    [theme, status]
  );

  return (
    <View style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <View style={dynamicStyles.headerIcon} />
        <Text style={dynamicStyles.headerTitle}>Market Statistics</Text>
        <Text style={dynamicStyles.headerStatus}>{status}</Text>
      </View>

      {/* Stats Grid */}
      <View style={dynamicStyles.statsGrid}>
        <View style={dynamicStyles.statRow}>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>Volume</Text>
            <Text style={dynamicStyles.statValue}>
              ₹{volume.toLocaleString()}
            </Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>Traders</Text>
            <Text style={dynamicStyles.statValue}>
              {participants.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={dynamicStyles.statRow}>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>Liquidity</Text>
            <Text style={dynamicStyles.statValue}>
              ₹{liquidity.toLocaleString()}
            </Text>
          </View>
          <View style={dynamicStyles.statItem}>
            <Text style={dynamicStyles.statLabel}>Total Shares</Text>
            <Text style={dynamicStyles.statValue}>
              {totalShares ? totalShares.toLocaleString() : "N/A"}
            </Text>
          </View>
        </View>

        {avgPrice && (
          <View style={dynamicStyles.statRow}>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statLabel}>Avg Price</Text>
              <Text style={dynamicStyles.statValue}>
                ₹{avgPrice.toFixed(2)}
              </Text>
            </View>
            <View style={dynamicStyles.statItem}>
              {/* Empty slot for balance */}
            </View>
          </View>
        )}
      </View>

      {/* Date Information */}
      <View style={dynamicStyles.dateSection}>
        <View style={dynamicStyles.dateRow}>
          <Text style={dynamicStyles.dateLabel}>Created</Text>
          <Text style={dynamicStyles.dateValue}>{formatDate(createdDate)}</Text>
        </View>

        {resolutionDate && (
          <View style={dynamicStyles.dateRow}>
            <Text style={dynamicStyles.dateLabel}>
              {status === "resolved" ? "Resolved" : "Resolution Date"}
            </Text>
            <Text style={dynamicStyles.dateValue}>
              {formatDate(resolutionDate)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
