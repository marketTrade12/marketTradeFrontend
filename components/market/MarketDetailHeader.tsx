import Icon from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useThemeColor";
import React, { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MarketDetailHeaderProps {
  market: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    category: string;
    endDate: string;
    volume: number;
    participants: number;
  };
  onBack: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  isBookmarked?: boolean;
}

export default function MarketDetailHeader({
  market,
  onBack,
  onBookmark,
  onShare,
  isBookmarked = false,
}: MarketDetailHeaderProps) {
  const theme = useTheme();

  const formatTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.primary,
          paddingBottom: theme.spacing.lg,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.lg,
          paddingBottom: theme.spacing.md,
        },
        backButton: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.background + "20",
          alignItems: "center",
          justifyContent: "center",
          ...theme.shadows.small,
        },
        headerActions: {
          flexDirection: "row",
          gap: theme.spacing.sm,
        },
        actionButton: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.background + "20",
          alignItems: "center",
          justifyContent: "center",
          ...theme.shadows.small,
        },
        content: {
          backgroundColor: theme.colors.cardBackground,
          marginHorizontal: theme.spacing.md,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.lg,
          ...theme.shadows.medium,
        },
        marketInfo: {
          flexDirection: "row",
          alignItems: "flex-start",
          gap: theme.spacing.md,
        },
        marketImage: {
          width: 56,
          height: 56,
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.colors.surface,
        },
        marketContent: {
          flex: 1,
        },
        categoryContainer: {
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.xs,
        },
        categoryBadge: {
          width: 36,
          height: 36,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.primaryLight,
          alignItems: "center",
          justifyContent: "center",
          ...theme.shadows.small,
        },
        categoryText: {
          fontSize: theme.typography.body2.fontSize,
          fontWeight: theme.typography.body2.fontWeight,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.primary,
          textTransform: "uppercase",
        },
        title: {
          fontSize: theme.typography.h2.fontSize,
          fontWeight: theme.typography.h2.fontWeight,
          fontFamily: theme.typography.h2.fontFamily,
          color: theme.colors.text,
          lineHeight: theme.typography.h2.lineHeight,
          marginBottom: theme.spacing.sm,
        },
        description: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
          lineHeight: theme.typography.body1.lineHeight,
          marginBottom: theme.spacing.md,
        },
        statsContainer: {
          flexDirection: "row",
          gap: theme.spacing.lg,
        },
        statItem: {
          alignItems: "center",
          gap: theme.spacing.xs,
        },
        statLabel: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
        },
        statValue: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
        },
        timeRemaining: {
          color: theme.colors.warning,
        },
      }),
    [theme]
  );

  return (
    <View style={dynamicStyles.container}>
      {/* Header with navigation */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity style={dynamicStyles.backButton} onPress={onBack}>
          <Icon
            name="arrow-left"
            set="feather"
            size={20}
            color={theme.colors.textInverse}
          />
        </TouchableOpacity>

        <View style={dynamicStyles.headerActions}>
          {onBookmark && (
            <TouchableOpacity
              style={dynamicStyles.actionButton}
              onPress={onBookmark}
            >
              <Icon
                name={isBookmarked ? "bookmark" : "bookmark"}
                set="feather"
                size={20}
                color={theme.colors.textInverse}
              />
            </TouchableOpacity>
          )}
          {onShare && (
            <TouchableOpacity
              style={dynamicStyles.actionButton}
              onPress={onShare}
            >
              <Icon
                name="share"
                set="feather"
                size={20}
                color={theme.colors.textInverse}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Market content card */}
      <View style={dynamicStyles.content}>
        <View style={dynamicStyles.marketInfo}>
          {market.imageUrl && (
            <Image
              source={{ uri: market.imageUrl }}
              style={dynamicStyles.marketImage}
            />
          )}

          <View style={dynamicStyles.marketContent}>
            <View style={dynamicStyles.categoryContainer}>
              <View style={dynamicStyles.categoryBadge}>
                <Icon
                  name="tag"
                  set="feather"
                  size={16}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={dynamicStyles.categoryText}>{market.category}</Text>
            </View>

            <Text style={dynamicStyles.title} numberOfLines={2}>
              {market.title}
            </Text>

            {market.description && (
              <Text style={dynamicStyles.description} numberOfLines={3}>
                {market.description}
              </Text>
            )}

            <View style={dynamicStyles.statsContainer}>
              <View style={dynamicStyles.statItem}>
                <Text style={dynamicStyles.statLabel}>Volume</Text>
                <Text style={dynamicStyles.statValue}>
                  ₹{market.volume.toLocaleString()}
                </Text>
              </View>

              <View style={dynamicStyles.statItem}>
                <Text style={dynamicStyles.statLabel}>Traders</Text>
                <Text style={dynamicStyles.statValue}>
                  {market.participants}
                </Text>
              </View>

              <View style={dynamicStyles.statItem}>
                <Text style={dynamicStyles.statLabel}>Time Left</Text>
                <Text
                  style={[dynamicStyles.statValue, dynamicStyles.timeRemaining]}
                >
                  {formatTimeRemaining(market.endDate)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
