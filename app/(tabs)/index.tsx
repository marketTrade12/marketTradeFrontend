// pages/index.tsx
import CategoryFilter from "@/components/CategoryFilter";
import MarketCard from "@/components/MarketCard";
import SortFilter from "@/components/SortFilter";
import TradeBottomSheet from "@/components/TradeBottomSheet";
import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { marketData } from "@/constants/data";
import { MarketCategory, TradeAction } from "@/constants/types";
import { useBanners } from "@/hooks/useBanners";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type CategoryType = "all" | MarketCategory;

const AVAILABLE_CATEGORIES: CategoryType[] = [
  "all",
  "sports",
  "politics",
  "crypto",
  "economics",
  "technology",
  "entertainment",
  "business",
  "science",
  "news",
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const banners = useBanners();
  const theme = Colors[colorScheme ?? "light"];
  const sheetRef = useRef<BottomSheetModal>(null);
  const [tradeMeta, setTradeMeta] = useState<TradeAction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [sortBy, setSortBy] = useState<
    "volume" | "newest" | "ending_soon" | "price_change"
  >("volume");

  useEffect(() => {
    if (tradeMeta) {
      sheetRef.current?.present();
    }
  }, [tradeMeta]);

  const router = useRouter();

  // Filter markets based on category
  const filteredMarkets = marketData.filter(
    (market) =>
      selectedCategory === "all" || market.category === selectedCategory
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
        No markets found
      </Text>
      <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
        Try adjusting your filters
      </Text>
      <Pressable
        style={[styles.clearButton, { backgroundColor: theme.primary }]}
        onPress={() => setSelectedCategory("all")}
      >
        <Text style={styles.clearButtonText}>Clear Filters</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#B565FD" }}>
      <StatusBar style="light" backgroundColor="#B565FD" translucent={true} />
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        {/* Banner Section (market_3 image, logo, how to play, wallet, trade now) */}
        {selectedCategory === "all" && banners.length > 0 && (
          <View style={{ marginBottom: 0 }}>
            {banners
              .filter((b) => String(b.id) === "market_3")
              .map((banner) => (
                <View
                  key={banner.id}
                  style={{
                    position: "relative",
                    minHeight: 220,
                    justifyContent: "flex-end",
                  }}
                >
                  {/* Banner image as background, no overlays */}
                  <ImageBackground
                    source={{ uri: banner.src }}
                    style={{
                      width: SCREEN_WIDTH,
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                  {/* Logo top left (smaller) */}
                  <View
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 16,
                      zIndex: 2,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/logo/logo.png")}
                      style={{ width: 70, height: 24, resizeMode: "contain" }}
                    />
                  </View>
                  {/* How to play button and wallet icon top right (smaller) */}
                  <View
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 16,
                        padding: 4,
                        marginRight: 6,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 2,
                        elevation: 1,
                      }}
                      onPress={() => router.push("/wallet")}
                    >
                      <Icon
                        name="wallet"
                        set="ionicons"
                        size={18}
                        color="#5f2c82"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 2,
                        elevation: 1,
                      }}
                      onPress={() => router.push("/how-to-play")}
                    >
                      <Text
                        style={{
                          color: "#5f2c82",
                          fontWeight: "600",
                          fontSize: 13,
                        }}
                      >
                        How to play
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Trade now button (smaller, at top center below logo/buttons) */}
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: -7,
                      alignSelf: "center",
                      backgroundColor: "#b6ff6a",
                      borderRadius: 16,
                      paddingHorizontal: 18,
                      paddingVertical: 7,
                      flexDirection: "row",
                      alignItems: "center",
                      shadowColor: "#000",
                      shadowOpacity: 0.08,
                      shadowRadius: 2,
                      elevation: 1,
                      zIndex: 2,
                    }}
                    onPress={() => router.push("/market/market_3")}
                  >
                    <Text
                      style={{ color: "#222", fontWeight: "700", fontSize: 15 }}
                    >
                      Trade now
                    </Text>
                    <View style={{ marginLeft: 4 }}>
                      <Icon
                        name="arrow-right"
                        set="feather"
                        size={16}
                        color="#222"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}

        {/* Sticky Header */}

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Categories Header */}
          <View style={styles.categoriesHeader}>
            <Text style={[styles.categoriesTitle, { color: theme.text }]}>
              Categories
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[styles.seeAllText, { color: "#7C3AED" }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {/* Category Filter Chips */}
          <View
            style={[
              styles.categoryWrapper,
              { backgroundColor: theme.background },
            ]}
          >
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={[
                  styles.stickyAllCategory,
                  { backgroundColor: theme.background },
                ]}
                onPress={() => setSelectedCategory("all")}
              >
                <Icon
                  name="grid"
                  set="feather"
                  size={24}
                  color={selectedCategory === "all" ? theme.primary : "#9CA3AF"}
                />
                <Text
                  style={[
                    styles.stickyAllCategoryText,
                    {
                      color:
                        selectedCategory === "all" ? theme.text : "#6B7280",
                      fontWeight: selectedCategory === "all" ? "600" : "500",
                    },
                  ]}
                >
                  All
                </Text>
                {selectedCategory === "all" && (
                  <View
                    style={[
                      styles.selectedIndicator,
                      { backgroundColor: theme.primary },
                    ]}
                  />
                )}
              </TouchableOpacity>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                <CategoryFilter
                  categories={AVAILABLE_CATEGORIES.filter(
                    (cat) => cat !== "all"
                  )}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </ScrollView>
            </View>
          </View>

          {/* Controls Header - Results count only */}
          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsText, { color: theme.textSecondary }]}>
              {selectedCategory !== "all"
                ? `${filteredMarkets.length} markets in ${selectedCategory}`
                : `${filteredMarkets.length} markets available`}
            </Text>
            <SortFilter currentSort={sortBy} onSortChange={setSortBy} />
          </View>

          {/* Markets list */}
          <View style={styles.marketsContainer}>
            {filteredMarkets.map((item) => (
              <MarketCard
                key={item.id}
                item={item}
                onVote={(meta) => setTradeMeta(meta)}
              />
            ))}
            {filteredMarkets.length === 0 && renderEmptyState()}
          </View>
        </ScrollView>

        {/* Trade bottom sheet */}
        {tradeMeta && (
          <TradeBottomSheet
            ref={sheetRef}
            detailId={tradeMeta.detailId}
            actionType={tradeMeta.actionType}
            optionLabel={tradeMeta.label}
            onClose={() => setTradeMeta(null)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  categoryWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  controlsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  resultsInfo: {
    flex: 1,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: "500",
  },
  bannerContainer: {
    paddingVertical: 12,
  },
  bannerWrapper: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    height: 200,
    borderRadius: 12,
  },
  marketsContainer: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  clearButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stickyAllCategory: {
    alignItems: "center",
    marginHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 4,
  },
  stickyAllCategoryText: {
    fontSize: 12,
    marginTop: 4,
  },
  selectedIndicator: {
    height: 2,
    width: 24,
    borderRadius: 1,
    marginTop: 4,
  },
  categoryScroll: {
    flexGrow: 0,
  },
});
