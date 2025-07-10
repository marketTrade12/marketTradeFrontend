import Icon from "@/components/ui/Icon";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import TradeBottomSheet from "@/components/TradeBottomSheet";

import { marketData } from "@/constants/data";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useTheme } from "@/hooks/useThemeColor";
import { formatTimeRemaining } from "@/utils/marketUtils";

// --- TYPES ---
// Re-defined here to support the new UI. Ideally, centralize these.
type OrderBookEntry = { price: number; amount: number };

interface Outcome {
  id: string;
  label: string;
  chance: number;
  yesPrice: number;
  noPrice: number;
  volume: string;
  icon?: { name: string; set: string };
  orderBook?: {
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
  };
}

interface Event {
  id: string;
  date: string;
  description: string;
  // Add other fields as needed for events
}

interface MarketDetail {
  id: string;
  title: string;
  category: string;
  endDate: string;
  type: "binary" | "multi-outcome";
  outcomes: Outcome[];
  totalVolume: string;
  description: string;
  traders: number;
  imageUrl?: string;
  events?: Event[];
}

export default function MarketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // === STATE ===
  const [market, setMarket] = useState<MarketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // UI State
  const [expandedOutcome, setExpandedOutcome] = useState<string | null>(null);
  const [showEvents, setShowEvents] = useState(false);

  // Bottom sheet state
  const tradeSheetRef = useRef<BottomSheetModal>(null);
  const [selectedTrade, setSelectedTrade] = useState<{
    detailId: string;
    optionLabel: string;
    actionType: "buy" | "sell";
  } | null>(null);

  // === EFFECTS ===
  useEffect(() => {
    loadMarketDetail();
  }, [id]);

  // === FUNCTIONS ===
  const loadMarketDetail = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      // Find the market from data
      const foundMarket = marketData.find((m) => m.id === id);
      if (!foundMarket) {
        setError("Market not found");
        return;
      }

      // Transform to MarketDetail format
      const marketDetail: MarketDetail = {
        id: foundMarket.id,
        title: foundMarket.title,
        category: foundMarket.category,
        endDate: foundMarket.endDate,
        type: foundMarket.type,
        totalVolume: foundMarket.totalVolume,
        description: foundMarket.description || "No description available",
        traders: 150, // Mock data
        imageUrl: foundMarket.imageUrl,
        outcomes:
          foundMarket.type === "binary"
            ? [
                {
                  id: "outcome-1",
                  label: "Yes/No",
                  chance: Math.round(foundMarket.yesOption.price * 100),
                  yesPrice: Math.round(foundMarket.yesOption.price * 1000),
                  noPrice: Math.round(foundMarket.noOption.price * 1000),
                  volume: foundMarket.totalVolume,
                  orderBook: {
                    bids: [
                      { price: 55, amount: 100 },
                      { price: 54, amount: 150 },
                    ],
                    asks: [
                      { price: 56, amount: 75 },
                      { price: 57, amount: 200 },
                    ],
                  },
                },
              ]
            : foundMarket.options.map((opt, idx) => ({
                id: `outcome-${idx}`,
                label: opt.label,
                chance: Math.round(opt.price * 100),
                yesPrice: Math.round(opt.price * 1000),
                noPrice: Math.round((1 - opt.price) * 1000),
                volume: "₹25K",
                icon: { name: "circle", set: "feather" },
                orderBook: {
                  bids: [{ price: 45, amount: 50 }],
                  asks: [{ price: 47, amount: 30 }],
                },
              })),
        events: [
          {
            id: "1",
            date: "2024-12-20",
            description: "Market created",
          },
          {
            id: "2",
            date: "2024-12-22",
            description: "First trades placed",
          },
        ],
      };

      setMarket(marketDetail);
    } catch (err) {
      console.error("Error loading market:", err);
      setError("Failed to load market details");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMarketDetail();
    setRefreshing(false);
  }, []);

  const handleTradePress = useCallback(
    (optionLabel: string, actionType: "buy" | "sell", price?: number) => {
      if (!market) return;

      setSelectedTrade({
        detailId: market.id,
        optionLabel,
        actionType,
      });
      tradeSheetRef.current?.present();
    },
    [market]
  );

  const handleCloseTradeSheet = useCallback(() => {
    setSelectedTrade(null);
  }, []);

  const toggleOutcomeExpansion = (outcomeId: string) => {
    setExpandedOutcome(expandedOutcome === outcomeId ? null : outcomeId);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon
          name="arrow-left"
          set="feather"
          size={24}
          color={theme.colors.textInverse}
        />
      </TouchableOpacity>

      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => market && toggleBookmark(market as any)}
        >
          <Icon
            name={isBookmarked(market?.id || "") ? "bookmark" : "bookmark"}
            set="feather"
            size={20}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton}>
          <Icon
            name="share"
            set="feather"
            size={20}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton}>
          <Icon
            name="more-vertical"
            set="feather"
            size={20}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    if (!market) return null;

    return (
      <View style={styles.content}>
        {/* Market Image & Basic Info */}
        <View style={styles.marketInfo}>
          {market.imageUrl && (
            <Image
              source={{ uri: market.imageUrl }}
              style={styles.marketImage}
            />
          )}

          <View style={styles.marketMeta}>
            <Text style={styles.category}>{market.category.toUpperCase()}</Text>
            <Text style={styles.timeRemaining}>
              {formatTimeRemaining(market.endDate)}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{market.title}</Text>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>{market.totalVolume}</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Traders</Text>
            <Text style={styles.statValue}>{market.traders}</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Ends</Text>
            <Text style={styles.statValue}>
              {new Date(market.endDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{market.description}</Text>
        </View>

        {/* Outcomes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {market.type === "binary" ? "Options" : "Outcomes"}
          </Text>

          {market.outcomes.map((outcome, index) => (
            <View key={outcome.id} style={styles.outcomeCard}>
              {market.type === "binary" ? (
                <View style={styles.binaryOutcome}>
                  <TouchableOpacity
                    style={[styles.binaryOption, styles.yesOption]}
                    onPress={() =>
                      handleTradePress("Yes", "buy", outcome.yesPrice)
                    }
                  >
                    <Text style={styles.optionLabel}>YES</Text>
                    <Text style={styles.optionPrice}>{outcome.yesPrice}¢</Text>
                    <Text style={styles.optionChance}>{outcome.chance}%</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.binaryOption, styles.noOption]}
                    onPress={() =>
                      handleTradePress("No", "sell", outcome.noPrice)
                    }
                  >
                    <Text style={styles.optionLabel}>NO</Text>
                    <Text style={styles.optionPrice}>{outcome.noPrice}¢</Text>
                    <Text style={styles.optionChance}>
                      {100 - outcome.chance}%
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.multiOutcome}>
                  <View style={styles.multiHeader}>
                    <Text style={styles.multiLabel}>{outcome.label}</Text>
                    <Text style={styles.multiChance}>{outcome.chance}%</Text>
                  </View>

                  <View style={styles.multiActions}>
                    <TouchableOpacity
                      style={styles.multiButton}
                      onPress={() =>
                        handleTradePress(`${outcome.label} - Yes`, "buy")
                      }
                    >
                      <Text style={styles.multiButtonText}>
                        Buy Yes {outcome.yesPrice}¢
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.multiButton}
                      onPress={() =>
                        handleTradePress(`${outcome.label} - No`, "sell")
                      }
                    >
                      <Text style={styles.multiButtonText}>
                        Buy No {outcome.noPrice}¢
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Events */}
        {market.events && market.events.length > 0 && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setShowEvents(!showEvents)}
            >
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <Icon
                name={showEvents ? "chevron-up" : "chevron-down"}
                set="feather"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            {showEvents && (
              <View style={styles.eventsList}>
                {market.events.map((event) => (
                  <View key={event.id} style={styles.eventItem}>
                    <Text style={styles.eventDate}>
                      {new Date(event.date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.eventDescription}>
                      {event.description}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    header: {
      backgroundColor: theme.colors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      paddingTop: Platform.OS === "ios" ? theme.spacing.xl : theme.spacing.md,
    },
    backButton: {
      padding: theme.spacing.sm,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    headerButton: {
      padding: theme.spacing.sm,
    },
    scrollContainer: {
      flex: 1,
    },
    content: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
    },
    marketInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    marketImage: {
      width: 60,
      height: 60,
      borderRadius: theme.borderRadius.md,
      marginRight: theme.spacing.md,
    },
    marketMeta: {
      flex: 1,
    },
    category: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    timeRemaining: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      color: theme.colors.text,
      fontWeight: "500",
    },
    title: {
      fontSize: theme.typography.h2.fontSize,
      fontFamily: theme.typography.h2.fontFamily,
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      lineHeight: 32,
    },
    stats: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.small,
    },
    statItem: {
      flex: 1,
      alignItems: "center",
    },
    statLabel: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    statValue: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      fontWeight: "600",
      color: theme.colors.text,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.subHeading.fontSize,
      fontFamily: theme.typography.subHeading.fontFamily,
      fontWeight: theme.typography.subHeading.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    description: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      color: theme.colors.text,
      lineHeight: 24,
    },
    outcomeCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      ...theme.shadows.small,
    },
    binaryOutcome: {
      flexDirection: "row",
      gap: theme.spacing.md,
    },
    binaryOption: {
      flex: 1,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
    },
    yesOption: {
      backgroundColor: theme.colors.success + "15",
      borderWidth: 1,
      borderColor: theme.colors.success + "30",
    },
    noOption: {
      backgroundColor: theme.colors.error + "15",
      borderWidth: 1,
      borderColor: theme.colors.error + "30",
    },
    optionLabel: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      fontWeight: "600",
      marginBottom: theme.spacing.xs,
    },
    optionPrice: {
      fontSize: theme.typography.h3.fontSize,
      fontFamily: theme.typography.h3.fontFamily,
      fontWeight: theme.typography.h3.fontWeight,
      marginBottom: theme.spacing.xs,
    },
    optionChance: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.textSecondary,
    },
    multiOutcome: {
      // Multi-outcome styles
    },
    multiHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.md,
    },
    multiLabel: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      fontWeight: "500",
      color: theme.colors.text,
    },
    multiChance: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      fontWeight: "600",
      color: theme.colors.text,
    },
    multiActions: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    multiButton: {
      flex: 1,
      backgroundColor: theme.colors.primaryLight,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
      alignItems: "center",
    },
    multiButtonText: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      fontWeight: "600",
      color: theme.colors.primary,
    },
    eventsList: {
      // Events list styles
    },
    eventItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    eventDate: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.textSecondary,
    },
    eventDescription: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.text,
      flex: 1,
      textAlign: "right",
    },
  });

  // === RENDER ===
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingState message="Loading market details..." />
      </SafeAreaView>
    );
  }

  if (error || !market) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          message={error || "Market not found"}
          onRetry={loadMarketDetail}
          onBack={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        {renderHeader()}

        <ScrollView
          style={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </SafeAreaView>

      {/* Trade Bottom Sheet */}
      {selectedTrade && (
        <TradeBottomSheet
          ref={tradeSheetRef}
          detailId={selectedTrade.detailId}
          optionLabel={selectedTrade.optionLabel}
          actionType={selectedTrade.actionType}
          onClose={handleCloseTradeSheet}
        />
      )}
    </>
  );
}
