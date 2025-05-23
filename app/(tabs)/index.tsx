// pages/index.tsx
import CategoryFilter from "@/components/CategoryFilter";
import Header from "@/components/Home/Header";
import MarketCard from "@/components/MarketCard";
import SortFilter from "@/components/SortFilter";
import TradeBottomSheet from "@/components/TradeBottomSheet";
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
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type CategoryType = 'all' | MarketCategory;

const AVAILABLE_CATEGORIES: CategoryType[] = [
  'all',
  'sports',
  'politics',
  'crypto',
  'economics',
  'technology',
  'entertainment',
  'business',
  'science',
  'news'
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const banners = useBanners();
  const theme = Colors[colorScheme ?? "light"];
  const sheetRef = useRef<BottomSheetModal>(null);
  const [tradeMeta, setTradeMeta] = useState<TradeAction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [sortBy, setSortBy] = useState<'volume' | 'newest' | 'ending_soon' | 'price_change'>('volume');

  useEffect(() => {
    if (tradeMeta) {
      sheetRef.current?.present();
    }
  }, [tradeMeta]);

  const router = useRouter();

  // Filter markets based on category
  const filteredMarkets = marketData.filter(market => 
    selectedCategory === 'all' || market.category === selectedCategory
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
        onPress={() => setSelectedCategory('all')}
      >
        <Text style={styles.clearButtonText}>Clear Filters</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? "light" : "dark"} />
      
      {/* Sticky Header */}
      <Header />

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Filter Chips */}
        <View style={[styles.categoryWrapper, { backgroundColor: theme.background }]}>
          <CategoryFilter
            categories={AVAILABLE_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {/* Controls Header - Sort and Results */}
          <View style={styles.controlsHeader}>
            <View style={styles.resultsInfo}>
              <Text style={[styles.resultsText, { color: theme.textSecondary }]}>
                {selectedCategory !== 'all' 
                  ? `${filteredMarkets.length} markets in ${selectedCategory}`
                  : `${filteredMarkets.length} markets available`
                }
              </Text>
            </View>
            <SortFilter
              currentSort={sortBy}
              onSortChange={setSortBy}
            />
          </View>
        </View>

        {/* Banner carousel (only show when no active filters) */}
        {selectedCategory === 'all' && (
          <View style={styles.bannerContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {banners.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.bannerWrapper}
                  onPress={() => router.push(`/market/${item.id}`)}
                >
                  <Image
                    source={{ uri: item.src }}
                    style={[styles.bannerImage, { width: SCREEN_WIDTH - 32 }]}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

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
    borderBottomColor: '#E5E7EB',
  },
  controlsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  resultsInfo: {
    flex: 1,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '500',
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
    paddingBottom: 22,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  clearButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
