import Icon from "@/components/ui/Icon";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
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

import { Colors } from "@/constants/Colors";
import { marketData } from "@/constants/data";
import { MarketItem, TradeAction } from "@/constants/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatTimeRemaining } from "@/utils/marketUtils";

// --- TYPES ---
// Re-defined here to support the new UI. Ideally, centralize these.
type OrderBookEntry = { price: number; amount: number };
type OrderBook = { bids: OrderBookEntry[]; asks: OrderBookEntry[] };
type EventDetails = {
  endingIn: string;
  settlementBy: string;
  listedOn: string;
  tradingVolume: string;
};
type Outcome = {
  id: string;
  label: string;
  volume: number;
  chance: number;
  yesPrice: number;
  noPrice: number;
  orderBook: OrderBook;
  description?: string;
  imageUrl?: string;
};
type MarketDetail = {
  id: string;
  title: string;
  icon: { name: string; set: string };
  category: string;
  totalVolume: string;
  endDate: string;
  resolver: { name: string; address: string };
  tags: string[];
  outcomes: Outcome[];
  type: "binary" | "multi-outcome";
  description?: string;
  eventDetails?: EventDetails;
  rules?: string;
  imageUrl?: string;
};

// --- DATA ADAPTER ---
class MarketDataAdapter {
  private static instance: MarketDataAdapter;
  static getInstance(): MarketDataAdapter {
    if (!MarketDataAdapter.instance) {
      MarketDataAdapter.instance = new MarketDataAdapter();
    }
    return MarketDataAdapter.instance;
  }

  private generateOrderBook(price: number) {
    return {
      bids: [
        { price: 2.0, amount: 900 },
        { price: 2.5, amount: 450 },
        { price: 3.0, amount: 2 },
        { price: 3.5, amount: 3 },
        { price: 4.0, amount: 1 },
      ],
      asks: [
        { price: 2.0, amount: 900 },
        { price: 2.5, amount: 450 },
        { price: 3.0, amount: 2 },
        { price: 3.5, amount: 3 },
        { price: 4.0, amount: 1 },
      ],
    };
  }

  transformToUIData(item: MarketItem): MarketDetail | null {
    try {
      const isBinary = item.type === "binary";
      const outcomes: Outcome[] = isBinary
        ? [
            {
              id: item.yesOption.id,
              label: item.yesOption.label,
              volume: parseFloat(item.yesOption.volume24h) || 0,
              chance: item.yesOption.price * 100,
              yesPrice: item.yesOption.price,
              noPrice: item.noOption.price,
              orderBook: this.generateOrderBook(item.yesOption.price),
            },
          ]
        : item.options.map((opt) => ({
            id: opt.id,
            label: opt.label,
            volume: parseFloat(opt.volume24h) || 0,
            chance: opt.price * 100,
            yesPrice: opt.price,
            noPrice: 1 - opt.price,
            orderBook: this.generateOrderBook(opt.price),
            description: `Overview In the 2019 Lok Sabha elections, the BJP secured a massive 303 seats on its own, while the Congress was youth participation, and shifting alliances—like the rise of the INDIA bloc—are likely to play`,
            imageUrl:
              item.imageUrl || "https://picsum.photos/64/64?random=" + opt.id,
          }));

      return {
        id: item.id,
        title: item.title,
        icon: item.icon,
        category: item.category,
        totalVolume: item.totalVolume,
        endDate: item.endDate,
        resolver: {
          name: item.resolutionSource,
          address: `https://${item.resolutionSource
            .toLowerCase()
            .replace(/\s+/g, "")}.com`,
        },
        tags: item.tags,
        outcomes,
        type: item.type,
        description:
          item.description ||
          "Aamir Khan's Dangal (2016) remains his highest-grossing film, earning over ₹2,000 crore globally. Before that, 3 Idiots and PK set new domestic box office records with ₹200+ crore and ₹300+ crore respectively. However, Thugs of Hindostan and Laal Singh Chaddha underperformed",
        eventDetails: {
          endingIn: formatTimeRemaining(item.endDate),
          settlementBy: "3 August, 2025, 11:59 PM",
          listedOn: "8 July, 2025, 11:59 PM",
          tradingVolume: `₹${(parseFloat(item.totalVolume) / 1000).toFixed(
            0
          )}k`,
        },
        rules:
          "If the resolution source is unavailable, another credible source will be used. The market will be settled within 24 hours of the event's conclusion. Any disputes will be resolved by the platform.",
        imageUrl: item.imageUrl,
      };
    } catch (error) {
      console.error("Error transforming market data:", error);
      return null;
    }
  }

  getMarketData(id: string): MarketDetail | null {
    const marketItem = marketData.find((market) => market.id === id);
    return marketItem ? this.transformToUIData(marketItem) : null;
  }
}

// --- DATA HOOK ---
const useMarketData = (marketId: string) => {
  const [marketDetail, setMarketDetail] = useState<MarketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const adapter = MarketDataAdapter.getInstance();

  const loadMarketData = useCallback(async () => {
    try {
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const data = adapter.getMarketData(marketId);
      if (data) setMarketDetail(data);
      else setError("Market not found");
    } catch (err) {
      setError("Failed to load market data");
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

// --- UI COMPONENTS ---
const CollapsibleSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useColorScheme();
  return (
    <View style={styles.collapsibleContainer}>
      <TouchableOpacity
        style={styles.collapsibleHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.collapsibleTitle}>{title}</Text>
        <Icon
          name={isExpanded ? "chevron-up" : "chevron-down"}
          set="feather"
          size={24}
          color={Colors[theme ?? "light"].text}
        />
      </TouchableOpacity>
      {isExpanded && <View style={styles.collapsibleContent}>{children}</View>}
    </View>
  );
};

const EventDetailsSection = ({ details }: { details: EventDetails }) => {
  const theme = useColorScheme();
  const detailItems = [
    { label: "Ending in", value: details.endingIn },
    { label: "Settlement by", value: details.settlementBy },
    { label: "Listed on", value: details.listedOn },
    { label: "Trading volume", value: details.tradingVolume },
  ];
  return (
    <View>
      {detailItems.map((item, index) => (
        <View key={item.label} style={styles.eventDetailRow}>
          <Text
            style={[
              styles.eventDetailLabel,
              { color: Colors[theme ?? "light"].textSecondary },
            ]}
          >
            {item.label}
          </Text>
          <Text
            style={[
              styles.eventDetailValue,
              { color: Colors[theme ?? "light"].text },
            ]}
          >
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

const OrderBookSection = ({ orderBook }: { orderBook: OrderBook }) => {
  const theme = useColorScheme();
  return (
    <View style={styles.orderBookContainer}>
      <View style={styles.orderBookHeader}>
        <Text style={styles.orderBookTitleYes}>Yes Price</Text>
        <Text style={styles.orderBookTitle}>Qty.</Text>
        <Text style={styles.orderBookTitleNo}>No Price</Text>
        <Text style={styles.orderBookTitle}>Qty.</Text>
      </View>
      {orderBook.bids.map((bid, index) => (
        <View key={index} style={styles.orderBookRow}>
          <Text style={styles.orderBookPrice}>{bid.price.toFixed(1)}</Text>
          <Text
            style={[
              styles.orderBookQty,
              { backgroundColor: "rgba(196, 181, 253, 0.5)" },
            ]}
          >
            {bid.amount}
          </Text>
          <Text style={styles.orderBookPrice}>
            {orderBook.asks[index]?.price.toFixed(1)}
          </Text>
          <Text
            style={[
              styles.orderBookQty,
              { backgroundColor: "rgba(134, 239, 172, 0.5)" },
            ]}
          >
            {orderBook.asks[index]?.amount}
          </Text>
        </View>
      ))}
    </View>
  );
};

// --- MAIN COMPONENT ---
export default function MarketDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const { marketDetail, loading, error, refreshing, refresh } =
    useMarketData(id);
  const [tradeMeta, setTradeMeta] = useState<TradeAction | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const sheetRef = useRef<BottomSheetModal>(null);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const categories = [
    "Economics",
    "Politics",
    "Entertainment",
    "Sports",
    "Technology",
    "Finance",
    "Crypto",
  ];

  const handleTradePress = useCallback(
    (label: string, price: number, optionId?: string) => {
      if (!marketDetail) return;
      setTradeMeta({
        detailId: marketDetail.id,
        optionId: optionId || marketDetail.outcomes[0].id,
        actionType: "buy",
        label,
        price,
        marketType: marketDetail.type,
      });
      sheetRef.current?.present();
    },
    [marketDetail]
  );

  const handleShare = useCallback(async () => {
    /* ... existing share logic ... */
  }, [marketDetail]);
  const handleBookmark = useCallback(() => {
    /* ... existing bookmark logic ... */
  }, [marketDetail, toggleBookmark]);
  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const handleCategoryPress = () => {
    setIsCategoryModalVisible(true);
  };

  if (loading)
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
      >
        <LoadingState message="Loading market..." />
      </SafeAreaView>
    );
  if (error || !marketDetail)
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
      >
        <ErrorState
          message={error || "Market not found"}
          onRetry={refresh}
          onBack={handleBackPress}
        />
      </SafeAreaView>
    );

  const renderBinaryMarket = () => (
    <>
      <View style={styles.contentContainer}>
        <View style={styles.binaryHeader}>
          <Text style={styles.title}>{marketDetail.title}</Text>
          {marketDetail.imageUrl && (
            <Image
              source={{ uri: marketDetail.imageUrl }}
              style={styles.marketImage}
            />
          )}
        </View>
        <View style={styles.binaryTradeOptions}>
          <TouchableOpacity
            style={styles.yesButton}
            onPress={() =>
              handleTradePress("Yes", marketDetail.outcomes[0].yesPrice)
            }
          >
            <Text style={styles.tradeButtonText}>
              Yes ₹{(marketDetail.outcomes[0].yesPrice * 10).toFixed(1)}
            </Text>
          </TouchableOpacity>
          <Text style={styles.getAmount}>Get ₹ 10</Text>
        </View>
        <View style={styles.binaryTradeOptions}>
          <TouchableOpacity
            style={styles.noButton}
            onPress={() =>
              handleTradePress("No", marketDetail.outcomes[0].noPrice)
            }
          >
            <Text style={styles.noButtonText}>
              No ₹{(marketDetail.outcomes[0].noPrice * 10).toFixed(1)}
            </Text>
          </TouchableOpacity>
          <Text style={styles.getAmount}>Get ₹ 10</Text>
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>
            {marketDetail.description}{" "}
            <Text style={styles.readMore}>read more</Text>
          </Text>
        </View>
      </View>
    </>
  );

  const renderMultiOutcomeMarket = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{marketDetail.title}</Text>
      {marketDetail.outcomes.map((outcome) => (
        <View key={outcome.id} style={styles.multiOutcomeCard}>
          <View style={styles.multiOutcomeHeader}>
            <Image
              source={{ uri: outcome.imageUrl }}
              style={styles.multiOutcomeImage}
            />
            <Text style={styles.multiOutcomeLabel}>{outcome.label}</Text>
            <View style={styles.multiOutcomeChance}>
              <Text>{outcome.chance}%</Text>
            </View>
          </View>
          <View style={styles.binaryTradeOptions}>
            <TouchableOpacity
              style={styles.yesButton}
              onPress={() =>
                handleTradePress("Yes", outcome.yesPrice, outcome.id)
              }
            >
              <Text style={styles.tradeButtonText}>
                Yes ₹{(outcome.yesPrice * 10).toFixed(1)}
              </Text>
            </TouchableOpacity>
            <Text style={styles.getAmount}>Get ₹ 10</Text>
          </View>
          <View style={styles.binaryTradeOptions}>
            <TouchableOpacity
              style={styles.noButton}
              onPress={() =>
                handleTradePress("No", outcome.noPrice, outcome.id)
              }
            >
              <Text style={styles.tradeButtonText}>
                No ₹{(outcome.noPrice * 10).toFixed(1)}
              </Text>
            </TouchableOpacity>
            <Text style={styles.getAmount}>Get ₹ 10</Text>
          </View>
          <Text style={styles.overviewText} numberOfLines={2}>
            {outcome.description} <Text style={styles.readMore}>read more</Text>
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: "#F3F4F6" }]}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar backgroundColor="#8B5CF6" barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: "#8B5CF6" }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="arrow-left" set="feather" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/images/logo/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.subHeader}>
        <TouchableOpacity
          style={styles.categoryPill}
          onPress={handleCategoryPress}
        >
          <Text style={styles.categoryText}>{marketDetail.category}</Text>
          <Icon name="chevron-down" set="feather" size={16} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.eventText}>
          Event ID: {marketDetail.id.slice(0, 5)}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleShare} style={{ marginRight: 16 }}>
            <Icon name="share" set="feather" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmark}>
            <Icon
              name={isBookmarked(marketDetail.id) ? "bookmark" : "bookmark"}
              set="feather"
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {marketDetail.type === "binary"
          ? renderBinaryMarket()
          : renderMultiOutcomeMarket()}

        <View style={styles.collapsiblesContainer}>
          <CollapsibleSection title="Event Details">
            {marketDetail.eventDetails && (
              <EventDetailsSection details={marketDetail.eventDetails} />
            )}
          </CollapsibleSection>
          <CollapsibleSection title="Charts">
            <Text style={styles.comingSoon}>Coming Soon</Text>
          </CollapsibleSection>
          <CollapsibleSection title="Order Book">
            <OrderBookSection orderBook={marketDetail.outcomes[0].orderBook} />
          </CollapsibleSection>
          <CollapsibleSection title="Rules">
            <Text style={styles.rulesText}>{marketDetail.rules}</Text>
          </CollapsibleSection>
          <CollapsibleSection title="Source Of Truth">
            <Text style={styles.sourceText}>
              The resolution source for this market is{" "}
              <Text style={{ color: theme.primary }}>
                {marketDetail.resolver.name}
              </Text>
              .
            </Text>
          </CollapsibleSection>
        </View>
        <View style={{ height: marketDetail.type === "binary" ? 100 : 32 }} />
      </ScrollView>

      {marketDetail.type === "binary" && (
        <View style={styles.stickyFooter}>
          <TouchableOpacity
            style={styles.footerYesButton}
            onPress={() =>
              handleTradePress("Yes", marketDetail.outcomes[0].yesPrice)
            }
          >
            <Text style={styles.footerButtonText}>
              Yes ₹{(marketDetail.outcomes[0].yesPrice * 10).toFixed(1)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerNoButton}
            onPress={() =>
              handleTradePress("No", marketDetail.outcomes[0].noPrice)
            }
          >
            <Text style={styles.footerButtonText}>
              No ₹{(marketDetail.outcomes[0].noPrice * 10).toFixed(1)}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {tradeMeta && (
        <TradeBottomSheet
          ref={sheetRef}
          detailId={tradeMeta.detailId}
          optionLabel={tradeMeta.label}
          actionType={tradeMeta.actionType}
          onClose={() => setTradeMeta(null)}
        />
      )}

      <Modal
        visible={isCategoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCategoryModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsCategoryModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryItem}
                onPress={() => {
                  // Here you would typically update the market category
                  setIsCategoryModalVisible(false);
                }}
              >
                <Text style={styles.categoryItemText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 110,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 10 : 16,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 40,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F3F4F6",
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryText: {
    color: "#374151",
    fontWeight: "500",
    marginRight: 4,
    fontSize: 14,
  },
  eventText: { color: "#6B7280", fontSize: 14 },
  scrollView: { flex: 1 },
  contentContainer: {
    padding: 16,
    backgroundColor: "#FFF",
    margin: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#111827",
    lineHeight: 22,
  },
  binaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  marketImage: { width: 48, height: 48, borderRadius: 8 },
  binaryTradeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  tradeButtonText: { fontSize: 14, fontWeight: "600", color: "#7C3AED" },
  yesButton: {
    flex: 1,
    backgroundColor: "#EDEBFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  noButton: {
    flex: 1,
    backgroundColor: "#ECFDF5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  getAmount: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "right",
    minWidth: 60,
  },
  overviewContainer: { marginTop: 16 },
  overviewTitle: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 16,
    color: "#111827",
  },
  overviewText: { color: "#6B7280", lineHeight: 20, fontSize: 14 },
  readMore: { color: "#7C3AED", fontWeight: "600" },
  collapsiblesContainer: { marginHorizontal: 16, gap: 12 },
  collapsibleContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
  },
  collapsibleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  collapsibleTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  collapsibleContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  comingSoon: { padding: 16, color: "#6B7280" },
  rulesText: { lineHeight: 20, color: "#374151" },
  sourceText: { lineHeight: 20, color: "#374151" },
  eventDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  eventDetailLabel: { color: "#6B7280", fontSize: 14 },
  eventDetailValue: { fontWeight: "600", color: "#111827", fontSize: 14 },
  orderBookContainer: {},
  orderBookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  orderBookTitle: {
    color: "#6B7280",
    flex: 1,
    textAlign: "center",
    fontSize: 12,
  },
  orderBookTitleYes: {
    color: "#7C3AED",
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    fontSize: 12,
  },
  orderBookTitleNo: {
    color: "#16A34A",
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    fontSize: 12,
  },
  orderBookRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  orderBookPrice: {
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
  },
  orderBookQty: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 4,
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 4,
    fontSize: 14,
  },
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 16,
    gap: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
  },
  footerYesButton: {
    flex: 1,
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  footerNoButton: {
    flex: 1,
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  footerButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  multiOutcomeCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  multiOutcomeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  multiOutcomeImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  multiOutcomeLabel: { flex: 1, fontSize: 16, fontWeight: "600" },
  multiOutcomeChance: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  modalContent: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  categoryItemText: {
    fontSize: 16,
    color: "#374151",
  },
  noButtonText: {
    color: "#16A34A",
    fontWeight: "600",
    fontSize: 14,
  },
});
