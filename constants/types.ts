// constants/types.ts
export type MarketCategory =
  | "sports"
  | "politics"
  | "crypto"
  | "entertainment"
  | "economics"
  | "technology"
  | "weather"
  | "business"
  | "science"
  | "news";

export type MarketStatus = "active" | "closed" | "resolved" | "paused";

export type IconSet = "feather" | "ionicons" | "material" | "fontawesome";

export interface MarketIcon {
  name: string;
  set: IconSet;
}

// Base option structure for all market types
export interface BaseOption {
  id: string;
  label: string;
  price: number; // Current price (0-1, represents probability)
  priceDisplay: string; // Formatted price display (e.g., "0.45¢", "45%")
  shares: number; // Shares outstanding
  volume24h: string; // 24h volume
  priceChange24h: number; // Price change in last 24h (-1 to 1)
  liquidity: string; // Available liquidity
}

// Binary market (Yes/No only)
export interface BinaryMarket {
  type: "binary";
  id: string;
  title: string;
  description: string;
  detailId: string;
  category: MarketCategory;
  status: MarketStatus;
  icon: MarketIcon;
  imageUrl?: string; // Optional thumbnail image

  // Market timing
  endDate: string; // ISO date string
  createdDate: string;

  // Market data
  totalVolume: string;
  volume24h: string;
  volumeChange24h: number; // Percentage change
  totalShares: number;
  liquidity: string;

  // Yes/No options
  yesOption: BaseOption;
  noOption: BaseOption;

  // Market metadata
  creator: string;
  resolutionSource: string;
  fee: number; // Platform fee percentage
  tags: string[];

  // Social data
  participants: number;
  comments: number;
  bookmarks: number;
}

// Multi-outcome market (multiple options)
export interface MultiOutcomeMarket {
  type: "multi-outcome";
  id: string;
  title: string;
  description: string;
  detailId: string;
  category: MarketCategory;
  status: MarketStatus;
  icon: MarketIcon;
  imageUrl?: string; // Optional thumbnail image

  // Market timing
  endDate: string;
  createdDate: string;

  // Market data
  totalVolume: string;
  volume24h: string;
  volumeChange24h: number;
  totalShares: number;
  liquidity: string;

  // Multiple options (each can be bought/sold)
  options: BaseOption[];

  // Market metadata
  creator: string;
  resolutionSource: string;
  fee: number;
  tags: string[];

  // Social data
  participants: number;
  comments: number;
  bookmarks: number;
}

// Union type for all market types
export type MarketItem = BinaryMarket | MultiOutcomeMarket;

// Trading action types
export interface TradeAction {
  detailId: string;
  optionId: string;
  actionType: "buy" | "sell";
  label: string;
  price: number;
  marketType: "binary" | "multi-outcome";
}

// Market filters
export interface MarketFilters {
  category?: MarketCategory;
  status?: MarketStatus;
  sortBy?: "volume" | "newest" | "ending_soon" | "price_change";
  timeRange?: "24h" | "7d" | "30d" | "all";
}

// Banner data for home page
export interface BannerItem {
  id: number;
  src: string;
  title?: string;
  marketId?: string;
}

// User portfolio data
export interface UserPosition {
  marketId: string;
  optionId: string;
  shares: number;
  avgPrice: number;
  currentValue: number;
  pnl: number;
  pnlPercentage: number;
}

// Market statistics
export interface MarketStats {
  totalMarkets: number;
  totalVolume: string;
  activeTraders: number;
  marketsResolved: number;
}

// Wallet and Order Types
export interface Order {
  id: string;
  marketId: string;
  marketTitle: string;
  type: "buy" | "sell";
  status: "open" | "executed" | "cancelled";
  amount: number;
  shares: number;
  orderPrice: number;
  currentPrice: number;
  timestamp: string;
  outcome: string;
  isYes: boolean;
}

export interface ActivePosition {
  marketId: string;
  marketTitle: string;
  invested: number;
  currentValue: number;
  outcome: string;
  shares: number;
  profitLoss: number;
  profitLossPercentage: number;
  isYes: boolean;
}

export interface WalletStats {
  totalBalance: number;
  totalInvested: number;
  totalProfitLoss: number;
  profitLossPercentage: number;
  activePositions: number;
  openOrders: number;
}
