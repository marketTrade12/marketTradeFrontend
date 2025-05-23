import { MarketCategory, MarketItem } from '@/constants/types';
import { getMarketCategories, sortMarkets } from '@/utils/marketUtils';
import { useMemo, useState } from 'react';

export type SortOption = 'volume' | 'newest' | 'ending_soon' | 'price_change';

export interface UseMarketSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: MarketCategory | 'all';
  setSelectedCategory: (category: MarketCategory | 'all') => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  availableCategories: (MarketCategory | 'all')[];
  filteredMarkets: MarketItem[];
  clearFilters: () => void;
}

export const useMarketSearch = (markets: MarketItem[]): UseMarketSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('volume');

  // Get available categories from markets and add 'all'
  const availableCategories = useMemo(() => {
    const categories = getMarketCategories(markets);
    return ['all' as const, ...categories];
  }, [markets]);

  // Filter and search markets
  const filteredMarkets = useMemo(() => {
    let filtered = [...markets];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(market => market.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(market => {
        // Search in title
        if (market.title.toLowerCase().includes(query)) return true;
        
        // Search in description
        if (market.description.toLowerCase().includes(query)) return true;
        
        // Search in tags
        if (market.tags.some(tag => tag.toLowerCase().includes(query))) return true;
        
        // Search in creator
        if (market.creator.toLowerCase().includes(query)) return true;
        
        // For binary markets, search in option labels
        if (market.type === 'binary') {
          if (market.yesOption.label.toLowerCase().includes(query) ||
              market.noOption.label.toLowerCase().includes(query)) return true;
        }
        
        // For multi-outcome markets, search in option labels
        if (market.type === 'multi-outcome') {
          if (market.options.some(option => 
            option.label.toLowerCase().includes(query)
          )) return true;
        }
        
        return false;
      });
    }

    // Apply sorting
    return sortMarkets(filtered, sortBy);
  }, [markets, selectedCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('volume');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    availableCategories,
    filteredMarkets,
    clearFilters,
  };
}; 