// constants/marketDetails.ts

export interface Order {
  price: number; // price per share (in cents or % as your model)
  amount: number; // quantity
}

export interface Outcome {
  id: string;
  label: string;
  volume: string;
  chance: number;
  yesPrice: number;
  noPrice: number;
  icon?: {
    name: string;
    set: "feather" | "ionicons" | "material" | "fontawesome";
  };
  orderBook: {
    bids: Order[]; // buy orders sorted descending by price
    asks: Order[]; // sell orders sorted ascending by price
  };
}

export interface ResolverInfo {
  name: string;
  address: string;
}

export interface MarketDetail {
  id: string;
  title: string;
  icon: {
    name: string;
    set: "feather" | "ionicons" | "material" | "fontawesome";
  };
  outcomes: Outcome[];
  totalVolume: string;
  endDate: string;
  resolver: ResolverInfo;
  tags: string[];
}

const makeOrderBook = (mid: number): { bids: Order[]; asks: Order[] } => ({
  bids: [
    { price: Number((mid - 1).toFixed(2)), amount: 10 },
    { price: Number((mid - 2).toFixed(2)), amount: 5 },
    { price: Number((mid - 3).toFixed(2)), amount: 2 },
  ],
  asks: [
    { price: Number((mid + 1).toFixed(2)), amount: 8 },
    { price: Number((mid + 2).toFixed(2)), amount: 4 },
    { price: Number((mid + 3).toFixed(2)), amount: 1 },
  ],
});

export const marketDetails: Record<string, MarketDetail> = {
  market_1: {
    id: "market_1",
    title: "NBA Champion",
    icon: { name: "activity", set: "feather" },
    outcomes: [
      {
        id: "okc",
        label: "Oklahoma City Thunder",
        volume: "$6,219,432",
        chance: 45,
        yesPrice: 45,
        noPrice: 55,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(45),
      },
      {
        id: "bos",
        label: "Boston Celtics",
        volume: "$6,831,756",
        chance: 21,
        yesPrice: 21,
        noPrice: 79,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(21),
      },
      {
        id: "cle",
        label: "Cleveland Cavaliers",
        volume: "$9,140,882",
        chance: 8.1,
        yesPrice: 8.1,
        noPrice: 91.9,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(8.1),
      },
      {
        id: "min",
        label: "Minnesota Timberwolves",
        volume: "$8,963,342",
        chance: 7.5,
        yesPrice: 7.5,
        noPrice: 92.5,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(7.5),
      },
      {
        id: "nyk",
        label: "New York Knicks",
        volume: "$6,431,748",
        chance: 7.3,
        yesPrice: 7.3,
        noPrice: 92.7,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(7.3),
      },
    ],
    totalVolume: "$1,672,472,096",
    endDate: "2025-06-23",
    resolver: { name: "UMA", address: "0x2F5e3684cb…" },
    tags: ["NBA", "Basketball", "Finals"],
  },

  market_2: {
    id: "market_2",
    title: "Fed decision in May?",
    icon: { name: "dollar-sign", set: "feather" },
    outcomes: [
      {
        id: "50_plus",
        label: "50+ bps decrease",
        volume: "—",
        chance: 1,
        yesPrice: 1,
        noPrice: 99,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(1),
      },
      {
        id: "25",
        label: "25 bps decrease",
        volume: "—",
        chance: 2,
        yesPrice: 2,
        noPrice: 98,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(2),
      },
      {
        id: "no_change",
        label: "No change",
        volume: "—",
        chance: 97,
        yesPrice: 97,
        noPrice: 3,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(97),
      },
    ],
    totalVolume: "$72m",
    endDate: "2025-05-15",
    resolver: {
      name: "Federal Reserve",
      address: "https://federalreserve.gov",
    },
    tags: ["Fed", "Interest Rates", "Macro"],
  },

  market_3: {
    id: "market_3",
    title: "Next US President?",
    icon: { name: "flag-outline", set: "ionicons" },
    outcomes: [
      {
        id: "trump",
        label: "Donald Trump",
        volume: "$4.4m",
        chance: 44,
        yesPrice: 44,
        noPrice: 56,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(44),
      },
      {
        id: "biden",
        label: "Joe Biden",
        volume: "$3.9m",
        chance: 41,
        yesPrice: 41,
        noPrice: 59,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(41),
      },
    ],
    totalVolume: "$8.3m",
    endDate: "2025-11-05",
    resolver: { name: "US Elections", address: "https://www.fec.gov" },
    tags: ["US", "Presidential Election"],
  },

  market_4: {
    id: "market_4",
    title: "Will ETH outperform BTC this year?",
    icon: { name: "trending-up", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$980k",
        chance: 21,
        yesPrice: 21,
        noPrice: 79,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(21),
      },
      {
        id: "no",
        label: "No",
        volume: "$980k",
        chance: 79,
        yesPrice: 79,
        noPrice: 21,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(79),
      },
    ],
    totalVolume: "$980k",
    endDate: "2025-12-31",
    resolver: { name: "Etherscan", address: "https://etherscan.io" },
    tags: ["Ethereum", "Bitcoin", "Performance"],
  },

  market_5: {
    id: "market_5",
    title: "Will the iPhone 16 have USB-C?",
    icon: { name: "smartphone", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$410k",
        chance: 93,
        yesPrice: 93,
        noPrice: 7,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(93),
      },
      {
        id: "no",
        label: "No",
        volume: "$410k",
        chance: 7,
        yesPrice: 7,
        noPrice: 93,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(7),
      },
    ],
    totalVolume: "$410k",
    endDate: "2025-09-15",
    resolver: { name: "Apple", address: "https://apple.com" },
    tags: ["Apple", "iPhone", "USB-C"],
  },

  market_6: {
    id: "market_6",
    title: "India to win ICC T20 2025?",
    icon: { name: "award", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$2.1m",
        chance: 61,
        yesPrice: 61,
        noPrice: 39,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(61),
      },
      {
        id: "no",
        label: "No",
        volume: "$2.1m",
        chance: 39,
        yesPrice: 39,
        noPrice: 61,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(39),
      },
    ],
    totalVolume: "$2.1m",
    endDate: "2025-06-30",
    resolver: { name: "ICC", address: "https://icc-cricket.com" },
    tags: ["Cricket", "ICC T20", "India"],
  },

  market_7: {
    id: "market_7",
    title: "Crude oil to exceed $100?",
    icon: { name: "droplet", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$1.8m",
        chance: 38,
        yesPrice: 38,
        noPrice: 62,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(38),
      },
      {
        id: "no",
        label: "No",
        volume: "$1.8m",
        chance: 62,
        yesPrice: 62,
        noPrice: 38,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(62),
      },
    ],
    totalVolume: "$1.8m",
    endDate: "2025-12-31",
    resolver: { name: "OPEC", address: "https://opec.org" },
    tags: ["Oil", "Brent", "Commodities"],
  },

  market_8: {
    id: "market_8",
    title: "New Marvel movie release in 2025?",
    icon: { name: "film", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$1.1m",
        chance: 85,
        yesPrice: 85,
        noPrice: 15,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(85),
      },
      {
        id: "no",
        label: "No",
        volume: "$1.1m",
        chance: 15,
        yesPrice: 15,
        noPrice: 85,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(15),
      },
    ],
    totalVolume: "$1.1m",
    endDate: "2025-12-31",
    resolver: { name: "Marvel", address: "https://marvel.com" },
    tags: ["Marvel", "Movies", "Entertainment"],
  },

  market_9: {
    id: "market_9",
    title: "Tesla to beat Q2 earnings?",
    icon: { name: "bar-chart-2", set: "feather" },
    outcomes: [
      {
        id: "beat",
        label: "Beat",
        volume: "$2.7m",
        chance: 57,
        yesPrice: 57,
        noPrice: 43,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(57),
      },
      {
        id: "miss",
        label: "Miss",
        volume: "$2.7m",
        chance: 43,
        yesPrice: 43,
        noPrice: 57,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(43),
      },
    ],
    totalVolume: "$2.7m",
    endDate: "2025-08-01",
    resolver: { name: "SEC", address: "https://sec.gov" },
    tags: ["Tesla", "Earnings", "Stocks"],
  },

  market_10: {
    id: "market_10",
    title: "Ethereum 2.0 full launch by EOY?",
    icon: { name: "hexagon", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$1.6m",
        chance: 46,
        yesPrice: 46,
        noPrice: 54,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(46),
      },
      {
        id: "no",
        label: "No",
        volume: "$1.6m",
        chance: 54,
        yesPrice: 54,
        noPrice: 46,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(54),
      },
    ],
    totalVolume: "$1.6m",
    endDate: "2025-12-31",
    resolver: { name: "Ethereum Foundation", address: "https://ethereum.org" },
    tags: ["Ethereum", "Eth2", "Blockchain"],
  },

  market_11: {
    id: "market_11",
    title: "Will Apple stock close green on Friday?",
    icon: { name: "activity", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$3.9m",
        chance: 51,
        yesPrice: 51,
        noPrice: 49,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(51),
      },
      {
        id: "no",
        label: "No",
        volume: "$3.9m",
        chance: 49,
        yesPrice: 49,
        noPrice: 51,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(49),
      },
    ],
    totalVolume: "$3.9m",
    endDate: "2025-05-09",
    resolver: { name: "NYSE", address: "https://nyse.com" },
    tags: ["Apple", "Stocks", "Weekly"],
  },

  market_12: {
    id: "market_12",
    title: "Google to launch AI browser?",
    icon: { name: "cpu", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$620k",
        chance: 29,
        yesPrice: 29,
        noPrice: 71,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(29),
      },
      {
        id: "no",
        label: "No",
        volume: "$620k",
        chance: 71,
        yesPrice: 71,
        noPrice: 29,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(71),
      },
    ],
    totalVolume: "$620k",
    endDate: "2025-12-31",
    resolver: { name: "Google", address: "https://google.com" },
    tags: ["Google", "AI", "Browser"],
  },

  market_13: {
    id: "market_13",
    title: "Gold price to rise above $2000?",
    icon: { name: "sun", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$2.2m",
        chance: 62,
        yesPrice: 62,
        noPrice: 38,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(62),
      },
      {
        id: "no",
        label: "No",
        volume: "$2.2m",
        chance: 38,
        yesPrice: 38,
        noPrice: 62,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(38),
      },
    ],
    totalVolume: "$2.2m",
    endDate: "2025-12-31",
    resolver: { name: "LBMA", address: "https://lbma.org.uk" },
    tags: ["Gold", "Commodities", "Metals"],
  },

  market_14: {
    id: "market_14",
    title: "Netflix to add live sports in 2025?",
    icon: { name: "tv", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$880k",
        chance: 74,
        yesPrice: 74,
        noPrice: 26,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(74),
      },
      {
        id: "no",
        label: "No",
        volume: "$880k",
        chance: 26,
        yesPrice: 26,
        noPrice: 74,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(26),
      },
    ],
    totalVolume: "$880k",
    endDate: "2025-12-31",
    resolver: { name: "Netflix", address: "https://netflix.com" },
    tags: ["Netflix", "Sports", "Streaming"],
  },

  market_15: {
    id: "market_15",
    title: "Recession to hit US in 2025?",
    icon: { name: "trending-down", set: "feather" },
    outcomes: [
      {
        id: "yes",
        label: "Yes",
        volume: "$4.4m",
        chance: 67,
        yesPrice: 67,
        noPrice: 33,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(67),
      },
      {
        id: "no",
        label: "No",
        volume: "$4.4m",
        chance: 33,
        yesPrice: 33,
        noPrice: 67,
        icon: { name: "keyboard-option", set: "material" },
        orderBook: makeOrderBook(33),
      },
    ],
    totalVolume: "$4.4m",
    endDate: "2025-12-31",
    resolver: { name: "BEA", address: "https://bea.gov" },
    tags: ["Economy", "Recession", "GDP"],
  },
};
