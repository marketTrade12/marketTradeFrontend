import { MarketDetail } from '@/constants/marketDetails';
import { MarketItem } from '@/constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const BOOKMARKS_STORAGE_KEY = '@tradex_bookmarks';

// Convert MarketDetail to MarketItem
const convertToMarketItem = (detail: MarketDetail): MarketItem => {
  if (detail.outcomes.length === 1) {
    // Binary market
    return {
      type: 'binary',
      id: detail.id,
      title: detail.title,
      description: detail.title,
      detailId: detail.id,
      category: 'news',
      status: 'active',
      icon: detail.icon,
      endDate: detail.endDate,
      createdDate: new Date().toISOString(),
      totalVolume: detail.totalVolume,
      volume24h: "$0",
      volumeChange24h: 0,
      totalShares: 0,
      liquidity: "$0",
      yesOption: {
        id: detail.outcomes[0].id + "_yes",
        label: "Yes",
        price: detail.outcomes[0].yesPrice / 100,
        priceDisplay: `${detail.outcomes[0].yesPrice}¢`,
        shares: 0,
        volume24h: detail.outcomes[0].volume,
        priceChange24h: 0,
        liquidity: "$0"
      },
      noOption: {
        id: detail.outcomes[0].id + "_no",
        label: "No",
        price: detail.outcomes[0].noPrice / 100,
        priceDisplay: `${detail.outcomes[0].noPrice}¢`,
        shares: 0,
        volume24h: detail.outcomes[0].volume,
        priceChange24h: 0,
        liquidity: "$0"
      },
      creator: detail.resolver.name,
      resolutionSource: detail.resolver.name,
      fee: 2.0,
      tags: detail.tags || [],
      participants: 0,
      comments: 0,
      bookmarks: 0
    };
  } else {
    // Multi-outcome market
    return {
      type: 'multi-outcome',
      id: detail.id,
      title: detail.title,
      description: detail.title,
      detailId: detail.id,
      category: 'news',
      status: 'active',
      icon: detail.icon,
      endDate: detail.endDate,
      createdDate: new Date().toISOString(),
      totalVolume: detail.totalVolume,
      volume24h: "$0",
      volumeChange24h: 0,
      totalShares: 0,
      liquidity: "$0",
      options: detail.outcomes.map(outcome => ({
        id: outcome.id,
        label: outcome.label,
        price: outcome.yesPrice / 100,
        priceDisplay: `${outcome.yesPrice}¢`,
        shares: 0,
        volume24h: outcome.volume,
        priceChange24h: 0,
        liquidity: "$0"
      })),
      creator: detail.resolver.name,
      resolutionSource: detail.resolver.name,
      fee: 2.0,
      tags: detail.tags || [],
      participants: 0,
      comments: 0,
      bookmarks: 0
    };
  }
};

export const useBookmarks = () => {
  const [bookmarkedMarkets, setBookmarkedMarkets] = useState<MarketItem[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load bookmarks from storage
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (storedBookmarks) {
        const markets = JSON.parse(storedBookmarks) as MarketItem[];
        setBookmarkedMarkets(markets);
        setBookmarkedIds(new Set(markets.map(m => m.id)));
      } else {
        // Initialize with empty arrays if no bookmarks exist
        setBookmarkedMarkets([]);
        setBookmarkedIds(new Set());
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      // Initialize with empty arrays on error
      setBookmarkedMarkets([]);
      setBookmarkedIds(new Set());
    } finally {
      setLoading(false);
    }
  };

  const saveBookmarks = async (markets: MarketItem[]) => {
    try {
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(markets));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const toggleBookmark = useCallback(async (market: MarketDetail | MarketItem) => {
    const marketId = market.id;
    setBookmarkedMarkets(prev => {
      const isCurrentlyBookmarked = bookmarkedIds.has(marketId);
      let newMarkets: MarketItem[];

      if (isCurrentlyBookmarked) {
        newMarkets = prev.filter(m => m.id !== marketId);
        bookmarkedIds.delete(marketId);
      } else {
        const marketItem = 'type' in market ? market : convertToMarketItem(market as MarketDetail);
        newMarkets = [...prev, marketItem];
        bookmarkedIds.add(marketId);
      }

      // Save to storage
      saveBookmarks(newMarkets);
      return newMarkets;
    });
  }, [bookmarkedIds]);

  const isBookmarked = useCallback((marketId: string) => {
    return bookmarkedIds.has(marketId);
  }, [bookmarkedIds]);

  return {
    bookmarkedMarkets,
    loading,
    toggleBookmark,
    isBookmarked,
  };
}; 