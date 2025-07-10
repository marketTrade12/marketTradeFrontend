// pages/index.tsx
import Icon from "@/components/ui/Icon";
import { marketData } from "@/constants/data";
import { MarketCategory } from "@/constants/types";
import { useBanners } from "@/hooks/useBanners";
import { useMarketSearch } from "@/hooks/useMarketSearch";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
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
import CategoryFilter from "../../components/CategoryFilter";
import MarketCard from "../../components/MarketCard";
import SearchBar from "../../components/SearchBar";
import SortFilter from "../../components/SortFilter";

const SCREEN_WIDTH = Dimensions.get("window").width;

type CategoryType = "all" | MarketCategory;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [sortOption, setSortOption] = useState<
    "volume" | "newest" | "ending_soon" | "price_change"
  >("volume");
  const router = useRouter();
  const theme = useTheme();

  const banners = useBanners();
  const {
    filteredMarkets,
    setSearchQuery: setMarketSearchQuery,
    setSelectedCategory: setMarketCategory,
    setSortBy,
  } = useMarketSearch(marketData);

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
    setMarketCategory(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setMarketSearchQuery(query);
  };

  const handleSortChange = (
    sort: "volume" | "newest" | "ending_soon" | "price_change"
  ) => {
    setSortOption(sort);
    setSortBy(sort);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortOption("volume");
    setMarketCategory("all");
    setMarketSearchQuery("");
    setSortBy("volume");
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No markets found
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        Try adjusting your search or filters
      </Text>
      <Pressable
        style={[styles.clearButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleClearFilters}
      >
        <Text
          style={[styles.clearButtonText, { color: theme.colors.textInverse }]}
        >
          Clear Filters
        </Text>
      </Pressable>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    bannerButton: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.xs,
      marginRight: theme.spacing.xs,
      ...theme.shadows.small,
    },
    bannerButtonSecondary: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      ...theme.shadows.small,
    },
    bannerButtonText: {
      color: theme.colors.primary,
      fontFamily: theme.typography.button.fontFamily,
      fontWeight: theme.typography.button.fontWeight,
      fontSize: theme.typography.caption.fontSize,
    },
    tradeButton: {
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      ...theme.shadows.small,
    },
    tradeButtonText: {
      color: theme.colors.black,
      fontFamily: theme.typography.button.fontFamily,
      fontWeight: theme.typography.button.fontWeight,
      fontSize: theme.typography.subHeading.fontSize,
    },
    categoriesHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    categoriesTitle: {
      fontFamily: theme.typography.h3.fontFamily,
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.h3.fontWeight,
      color: theme.colors.text,
    },
    seeAllText: {
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight,
      color: theme.colors.primary,
    },
    categoryWrapper: {
      backgroundColor: theme.colors.background,
    },
    categoryContainer: {
      flexDirection: "row",
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    stickyAllCategory: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      marginRight: theme.spacing.sm,
      borderBottomWidth: 2,
      borderBottomColor:
        selectedCategory === "all" ? theme.colors.primary : "transparent",
    },
    stickyAllCategoryText: {
      marginLeft: theme.spacing.xs,
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
    },
    activeIndicator: {
      height: 2,
      width: theme.spacing.lg,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.xs,
      marginTop: theme.spacing.xs,
    },
    searchFilterContainer: {
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    marketsHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingBottom: theme.spacing.sm,
    },
    marketsTitle: {
      fontFamily: theme.typography.h3.fontFamily,
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.h3.fontWeight,
      color: theme.colors.text,
    },
    marketsContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    },
    marketsList: {
      paddingBottom: theme.spacing.xl,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: theme.spacing.xxxl,
    },
    emptyTitle: {
      fontFamily: theme.typography.h3.fontFamily,
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.h3.fontWeight,
      marginBottom: theme.spacing.sm,
    },
    emptySubtitle: {
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      textAlign: "center",
      lineHeight: theme.typography.body1.lineHeight,
      marginBottom: theme.spacing.lg,
    },
    clearButton: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    clearButtonText: {
      fontFamily: theme.typography.button.fontFamily,
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
    },
    scrollContent: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        style="light"
        backgroundColor={theme.colors.primary}
        translucent={true}
      />
      <View style={styles.container}>
        {/* Banner Section (market_3 image, logo, how to play, wallet, trade now) */}
        {selectedCategory === "all" && banners.length > 0 && (
          <View style={{ marginBottom: 0 }}>
            {banners
              .filter((b: any) => String(b.id) === "market_3")
              .map((banner: any) => (
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
                      top: theme.spacing.sm,
                      left: theme.spacing.md,
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
                      top: theme.spacing.sm,
                      right: theme.spacing.md,
                      flexDirection: "row",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.bannerButton}
                      onPress={() => router.push("/wallet")}
                    >
                      <Icon
                        name="wallet"
                        set="ionicons"
                        size={18}
                        color={theme.colors.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bannerButtonSecondary}
                      onPress={() => router.push("/how-to-play")}
                    >
                      <Text style={styles.bannerButtonText}>How to play</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Trade now button (smaller, at top center below logo/buttons) */}
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: -7,
                      alignSelf: "center",
                      ...styles.tradeButton,
                      zIndex: 2,
                    }}
                    onPress={() => router.push("/market/market_3")}
                  >
                    <Text style={styles.tradeButtonText}>Trade now</Text>
                    <View style={{ marginLeft: theme.spacing.xs }}>
                      <Icon
                        name="arrow-right"
                        set="feather"
                        size={16}
                        color={theme.colors.black}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Categories Header */}
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Category Filter Chips */}
          <View style={styles.categoryWrapper}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.stickyAllCategory}
                onPress={() => handleCategorySelect("all")}
              >
                <Icon
                  name="grid"
                  set="feather"
                  size={24}
                  color={
                    selectedCategory === "all"
                      ? theme.colors.primary
                      : theme.colors.grey
                  }
                />
                <Text
                  style={[
                    styles.stickyAllCategoryText,
                    {
                      color:
                        selectedCategory === "all"
                          ? theme.colors.text
                          : theme.colors.textSecondary,
                      fontWeight:
                        selectedCategory === "all"
                          ? theme.typography.body1.fontWeight
                          : theme.typography.body2.fontWeight,
                    },
                  ]}
                >
                  All
                </Text>
                {selectedCategory === "all" && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                categories={[
                  "sports",
                  "politics",
                  "crypto",
                  "entertainment",
                  "technology",
                ]}
              />
            </View>
          </View>

          {/* Search and Sort Section */}
          <View style={styles.searchFilterContainer}>
            <SearchBar value={searchQuery} onChangeText={handleSearchChange} />
          </View>

          {/* Markets Header with Sort */}
          <View style={styles.marketsHeader}>
            <Text style={styles.marketsTitle}>Markets</Text>
            <SortFilter
              currentSort={sortOption}
              onSortChange={handleSortChange}
            />
          </View>

          {/* Markets List */}
          <View style={styles.marketsContainer}>
            {filteredMarkets.length === 0 ? (
              renderEmptyState()
            ) : (
              <FlatList
                data={filteredMarkets}
                renderItem={({ item }) => <MarketCard item={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.marketsList}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
