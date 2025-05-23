import { BaseOption, MarketCategory, MarketFilters, MarketItem } from "@/constants/types";

/**
 * Filter markets based on various criteria
 */
export const filterMarkets = (markets: MarketItem[], filters: MarketFilters): MarketItem[] => {
  let filteredMarkets = [...markets];

  // Filter by category
  if (filters.category) {
    filteredMarkets = filteredMarkets.filter(market => market.category === filters.category);
  }

  // Filter by status
  if (filters.status) {
    filteredMarkets = filteredMarkets.filter(market => market.status === filters.status);
  }

  return filteredMarkets;
};

/**
 * Sort markets based on different criteria
 */
export const sortMarkets = (markets: MarketItem[], sortBy: 'volume' | 'newest' | 'ending_soon' | 'price_change'): MarketItem[] => {
  const sortedMarkets = [...markets];

  switch (sortBy) {
    case 'volume':
      return sortedMarkets.sort((a, b) => {
        const aVolume = parseVolumeString(a.totalVolume);
        const bVolume = parseVolumeString(b.totalVolume);
        return bVolume - aVolume;
      });

    case 'newest':
      return sortedMarkets.sort((a, b) => 
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );

    case 'ending_soon':
      return sortedMarkets.sort((a, b) => 
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      );

    case 'price_change':
      return sortedMarkets.sort((a, b) => {
        const aChange = getMarketPriceChange(a);
        const bChange = getMarketPriceChange(b);
        return Math.abs(bChange) - Math.abs(aChange);
      });

    default:
      return sortedMarkets;
  }
};

/**
 * Parse volume string to number for comparison
 */
const parseVolumeString = (volume: string): number => {
  const numStr = volume.replace(/[$,]/g, '');
  const multiplier = volume.toLowerCase().includes('k') ? 1000 : 
                    volume.toLowerCase().includes('m') ? 1000000 : 
                    volume.toLowerCase().includes('b') ? 1000000000 : 1;
  return parseFloat(numStr) * multiplier;
};

/**
 * Get the maximum price change for a market
 */
const getMarketPriceChange = (market: MarketItem): number => {
  if (market.type === 'binary') {
    return Math.max(
      Math.abs(market.yesOption.priceChange24h),
      Math.abs(market.noOption.priceChange24h)
    );
  } else {
    return Math.max(...market.options.map(opt => Math.abs(opt.priceChange24h)));
  }
};

/**
 * Calculate potential profit for a trade
 */
export const calculatePotentialProfit = (
  investmentAmount: number,
  currentPrice: number,
  targetPrice: number = 1
): { profit: number; roi: number } => {
  const shares = investmentAmount / currentPrice;
  const potentialValue = shares * targetPrice;
  const profit = potentialValue - investmentAmount;
  const roi = (profit / investmentAmount) * 100;

  return { profit, roi };
};

/**
 * Format price change for display
 */
export const formatPriceChange = (change: number): { text: string; color: string } => {
  const sign = change >= 0 ? '+' : '';
  const percentage = (change * 100).toFixed(1);
  return {
    text: `${sign}${percentage}%`,
    color: change >= 0 ? '#22C55E' : '#DC2626'
  };
};

/**
 * Format time remaining until market ends
 */
export const formatTimeRemaining = (endDate: string): string => {
  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end.getTime() - now.getTime();
  
  if (diffMs < 0) return "Ended";
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays === 1) return "1 day";
  if (diffDays < 30) return `${diffDays} days`;
  if (diffMonths === 1) return "1 month";
  return `${diffMonths} months`;
};

/**
 * Get all unique categories from markets
 */
export const getMarketCategories = (markets: MarketItem[]): MarketCategory[] => {
  const categories = new Set(markets.map(market => market.category));
  return Array.from(categories).sort();
};

/**
 * Check if market is ending soon (within 24 hours)
 */
export const isMarketEndingSoon = (endDate: string): boolean => {
  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end.getTime() - now.getTime();
  return diffMs > 0 && diffMs <= 24 * 60 * 60 * 1000; // 24 hours
};

/**
 * Get market trend based on recent price changes
 */
export const getMarketTrend = (market: MarketItem): 'bullish' | 'bearish' | 'neutral' => {
  if (market.type === 'binary') {
    const yesChange = market.yesOption.priceChange24h;
    if (Math.abs(yesChange) < 0.01) return 'neutral';
    return yesChange > 0 ? 'bullish' : 'bearish';
  } else {
    const avgChange = market.options.reduce((sum, opt) => sum + opt.priceChange24h, 0) / market.options.length;
    if (Math.abs(avgChange) < 0.01) return 'neutral';
    return avgChange > 0 ? 'bullish' : 'bearish';
  }
};

/**
 * Calculate market liquidity score (0-100)
 */
export const calculateLiquidityScore = (market: MarketItem): number => {
  const liquidityStr = market.liquidity.replace(/[$,]/g, '');
  const liquidityAmount = parseVolumeString(liquidityStr);
  const volumeAmount = parseVolumeString(market.totalVolume);
  
  // Liquidity to volume ratio as a percentage
  const ratio = (liquidityAmount / volumeAmount) * 100;
  return Math.min(Math.max(ratio, 0), 100);
};

/**
 * Get most active option in a multi-outcome market
 */
export const getMostActiveOption = (market: MarketItem): BaseOption | null => {
  if (market.type === 'binary') {
    const yesVolume = parseVolumeString(market.yesOption.volume24h);
    const noVolume = parseVolumeString(market.noOption.volume24h);
    return yesVolume > noVolume ? market.yesOption : market.noOption;
  } else {
    return market.options.reduce((most, current) => {
      const mostVolume = parseVolumeString(most.volume24h);
      const currentVolume = parseVolumeString(current.volume24h);
      return currentVolume > mostVolume ? current : most;
    });
  }
};

/**
 * Format large numbers for display
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}; 