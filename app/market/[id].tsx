// pages/market/[id].tsx
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Alert,
    Clipboard,
    Platform,
    RefreshControl,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import MarketAboutSection from "@/components/market/MarketAboutSection";
import MarketDetailHeader from "@/components/market/MarketDetailHeader";
import MarketDetailStats from "@/components/market/MarketDetailStats";
import MarketOutcomeCard from "@/components/market/MarketOutcomeCard";
import TradeBottomSheet from "@/components/TradeBottomSheet";

// Constants & Types
import { Colors } from "@/constants/Colors";
import { marketData } from "@/constants/data";
import { MarketDetail, marketDetails } from "@/constants/marketDetails";
import { MarketItem, TradeAction } from "@/constants/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatTimeRemaining } from "@/utils/marketUtils";

// Market Data Adapter Class - OOP pattern for data transformation
class MarketDataAdapter {
  private static instance: MarketDataAdapter;
  
  static getInstance(): MarketDataAdapter {
    if (!MarketDataAdapter.instance) {
      MarketDataAdapter.instance = new MarketDataAdapter();
    }
    return MarketDataAdapter.instance;
  }

  // Transform new MarketItem to legacy MarketDetail format for compatibility
  transformToLegacyFormat(marketItem: MarketItem): MarketDetail | null {
    try {
      if (marketItem.type === 'binary') {
        return {
          id: marketItem.id,
          title: marketItem.title,
          icon: marketItem.icon,
          totalVolume: marketItem.totalVolume,
          endDate: marketItem.endDate,
          resolver: {
            name: marketItem.resolutionSource,
            address: `https://${marketItem.resolutionSource.toLowerCase().replace(/\s+/g, '')}.com`
          },
          tags: marketItem.tags,
          outcomes: [
            {
              id: marketItem.yesOption.id,
              label: marketItem.yesOption.label,
              volume: marketItem.yesOption.volume24h,
              chance: Math.round(marketItem.yesOption.price * 100),
              yesPrice: Math.round(marketItem.yesOption.price * 100),
              noPrice: Math.round(marketItem.noOption.price * 100),
              orderBook: this.generateOrderBook(marketItem.yesOption.price)
            }
          ]
        };
      } else {
        return {
          id: marketItem.id,
          title: marketItem.title,
          icon: marketItem.icon,
          totalVolume: marketItem.totalVolume,
          endDate: marketItem.endDate,
          resolver: {
            name: marketItem.resolutionSource,
            address: `https://${marketItem.resolutionSource.toLowerCase().replace(/\s+/g, '')}.com`
          },
          tags: marketItem.tags,
          outcomes: marketItem.options.map(option => ({
            id: option.id,
            label: option.label,
            volume: option.volume24h,
            chance: Math.round(option.price * 100),
            yesPrice: Math.round(option.price * 100),
            noPrice: Math.round((1 - option.price) * 100),
            orderBook: this.generateOrderBook(option.price)
          }))
        };
      }
    } catch (error) {
      console.error('Error transforming market data:', error);
      return null;
    }
  }

  private generateOrderBook(midPrice: number) {
    const mid = Math.round(midPrice * 100);
    return {
      bids: [
        { price: Math.max(1, mid - 1), amount: 10 },
        { price: Math.max(1, mid - 2), amount: 5 },
        { price: Math.max(1, mid - 3), amount: 2 },
      ],
      asks: [
        { price: Math.min(99, mid + 1), amount: 8 },
        { price: Math.min(99, mid + 2), amount: 4 },
        { price: Math.min(99, mid + 3), amount: 1 },
      ],
    };
  }

  // Get market data from either source
  getMarketData(id: string): MarketDetail | null {
    // First check legacy data
    if (marketDetails[id]) {
      return marketDetails[id];
    }

    // Then check new data and transform
    const newMarketItem = marketData.find(market => market.id === id);
    if (newMarketItem) {
      return this.transformToLegacyFormat(newMarketItem);
    }

    return null;
  }
}

// Custom Hook for Market Data Management
const useMarketData = (marketId: string) => {
  const [marketDetail, setMarketDetail] = useState<MarketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const adapter = MarketDataAdapter.getInstance();

  const loadMarketData = useCallback(async () => {
    try {
      setError(null);
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = adapter.getMarketData(marketId);
      if (data) {
        setMarketDetail(data);
      } else {
        setError('Market not found');
      }
    } catch (err) {
      setError('Failed to load market data');
      console.error('Market loading error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [marketId, adapter]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    loadMarketData();
  }, [loadMarketData]);

  useEffect(() => {
    loadMarketData();
  }, [loadMarketData]);

  return { marketDetail, loading, error, refreshing, refresh };
};

// Main Component
export default function MarketDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // State Management
  const { marketDetail, loading, error, refreshing, refresh } = useMarketData(id);
  const [tradeMeta, setTradeMeta] = useState<TradeAction | null>(null);
  const [expandedOutcomeId, setExpandedOutcomeId] = useState<string | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Refs
  const sheetRef = useRef<BottomSheetModal>(null);

  // Focus effect for refreshing data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (marketDetail) {
        // Optionally refresh data when screen focuses
        // refresh();
      }
    }, [marketDetail])
  );

  // Handlers
  const handleTradePress = useCallback((optionLabel: string, actionType: "buy" | "sell", price?: number) => {
    if (!marketDetail) return;

    const tradeAction: TradeAction = {
      detailId: marketDetail.id,
      optionId: marketDetail.outcomes[0]?.id || 'default',
      actionType,
      label: optionLabel,
      price: price || 0.5,
      marketType: marketDetail.outcomes.length === 1 ? 'binary' : 'multi-outcome'
    };

    setTradeMeta(tradeAction);
    sheetRef.current?.present();
  }, [marketDetail]);

  const handleShare = useCallback(async () => {
    if (!marketDetail) return;

    const marketUrl = `https://tradex.app/market/${marketDetail.id}`;
    const shareContent = {
      title: marketDetail.title,
      message: `Check out this prediction market: ${marketDetail.title}\n\nVolume: ${marketDetail.totalVolume}\n\n${marketUrl}`,
      url: marketUrl
    };

    try {
      if (Platform.OS === 'ios') {
        await Share.share({
          title: shareContent.title,
          message: shareContent.message,
          url: shareContent.url
        });
      } else {
        await Share.share({
          title: shareContent.title,
          message: shareContent.message
        });
      }
    } catch (error) {
      // Fallback to clipboard if share fails
      try {
        Clipboard.setString(`${shareContent.message}`);
        Alert.alert("Link Copied", "Market link has been copied to clipboard");
      } catch (clipboardError) {
        Alert.alert("Share Error", "Unable to share this market");
      }
    }
  }, [marketDetail]);

  const handleBookmark = useCallback(() => {
    if (!marketDetail) return;
    toggleBookmark(marketDetail);
  }, [marketDetail, toggleBookmark]);

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const toggleOutcomeExpansion = useCallback((outcomeId: string) => {
    setExpandedOutcomeId(prev => prev === outcomeId ? null : outcomeId);
  }, []);

  // Render Loading State
  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <ExpoStatusBar style={colorScheme === 'dark' ? "light" : "dark"} />
        <LoadingState message="Loading market details..." />
      </SafeAreaView>
    );
  }

  // Render Error State
  if (error || !marketDetail) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <ExpoStatusBar style={colorScheme === 'dark' ? "light" : "dark"} />
        <ErrorState 
          message={error || "Market not found"} 
          onRetry={refresh}
          onBack={handleBackPress}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ExpoStatusBar style={colorScheme === 'dark' ? "light" : "dark"} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <MarketDetailHeader
          title={marketDetail.title}
          icon={marketDetail.icon}
          volume={marketDetail.totalVolume}
          endDate={marketDetail.endDate}
          onShare={handleShare}
          onBookmark={handleBookmark}
          onBack={handleBackPress}
          isBookmarked={isBookmarked(marketDetail.id)}
        />

        {/* Market Statistics */}
        <MarketDetailStats
          marketDetail={marketDetail}
          timeRemaining={formatTimeRemaining(marketDetail.endDate)}
        />

        {/* Outcomes Section */}
        <View style={styles.outcomesSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {marketDetail.outcomes.length === 1 ? 'Market Options' : 'Market Outcomes'}
          </Text>
          
          {/* Handle Binary Markets */}
          {marketDetail.outcomes.length === 1 ? (
            <MarketOutcomeCard
              key={marketDetail.outcomes[0].id}
              outcome={marketDetail.outcomes[0]}
              isExpanded={expandedOutcomeId === marketDetail.outcomes[0].id}
              onToggleExpansion={() => toggleOutcomeExpansion(marketDetail.outcomes[0].id)}
              onTradePress={handleTradePress}
              isLast={true}
              isBinaryMarket={true}
              totalOutcomes={1}
            />
          ) : (
            /* Handle Multi-outcome Markets */
            marketDetail.outcomes.map((outcome, index) => (
              <MarketOutcomeCard
                key={outcome.id}
                outcome={outcome}
                isExpanded={expandedOutcomeId === outcome.id}
                onToggleExpansion={() => toggleOutcomeExpansion(outcome.id)}
                onTradePress={handleTradePress}
                isLast={index === marketDetail.outcomes.length - 1}
                isBinaryMarket={false}
                totalOutcomes={marketDetail.outcomes.length}
              />
            ))
          )}
        </View>

        {/* About Section */}
        <MarketAboutSection marketDetail={marketDetail} />

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Trade Bottom Sheet */}
      {tradeMeta && (
        <TradeBottomSheet
          ref={sheetRef}
          detailId={tradeMeta.detailId}
          optionLabel={tradeMeta.label}
          actionType={tradeMeta.actionType}
          onClose={() => setTradeMeta(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  outcomesSection: {
    marginTop: 8,
  },
  bottomSpacer: {
    height: 32,
  },
});
