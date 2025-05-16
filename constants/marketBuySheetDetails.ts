// constants/marketBuySheetDetails.ts

export type BuyOption = {
  pricePerShare: number; // in dollars, e.g. 0.45 for 45¢
  maxPayout: number; // your maximum payout cap
};

export type BuySheetDetail = {
  id: string;
  question: string;
  icon: {
    name: string;
    set: "feather" | "ionicons" | "material" | "fontawesome";
  };
  buyOptions: {
    yes: BuyOption;
    no: BuyOption;
  };
  sliderRange: [number, number];
};

export const marketBuySheetDetails: Record<string, BuySheetDetail> = {
  market_1: {
    id: "market_1",
    question: "NBA Champion",
    icon: { name: "activity", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.45, maxPayout: 500 },
      no: { pricePerShare: 0.56, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_2: {
    id: "market_2",
    question: "Fed decision in May?",
    icon: { name: "dollar-sign", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.01, maxPayout: 500 },
      no: { pricePerShare: 0.99, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_3: {
    id: "market_3",
    question: "Next US President?",
    icon: { name: "flag", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.44, maxPayout: 500 },
      no: { pricePerShare: 0.56, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_4: {
    id: "market_4",
    question: "Will ETH outperform BTC this year?",
    icon: { name: "trending-up", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.21, maxPayout: 500 },
      no: { pricePerShare: 0.79, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_5: {
    id: "market_5",
    question: "Will the iPhone 16 have USB-C?",
    icon: { name: "smartphone", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.93, maxPayout: 500 },
      no: { pricePerShare: 0.07, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_6: {
    id: "market_6",
    question: "India to win ICC T20 2025?",
    icon: { name: "award", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.61, maxPayout: 500 },
      no: { pricePerShare: 0.39, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_7: {
    id: "market_7",
    question: "Crude oil to exceed $100?",
    icon: { name: "droplet", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.38, maxPayout: 500 },
      no: { pricePerShare: 0.62, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_8: {
    id: "market_8",
    question: "New Marvel movie release in 2025?",
    icon: { name: "film", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.85, maxPayout: 500 },
      no: { pricePerShare: 0.15, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_9: {
    id: "market_9",
    question: "Tesla to beat Q2 earnings?",
    icon: { name: "bar-chart-2", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.57, maxPayout: 500 },
      no: { pricePerShare: 0.43, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_10: {
    id: "market_10",
    question: "Ethereum 2.0 full launch by EOY?",
    icon: { name: "zap", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.46, maxPayout: 500 },
      no: { pricePerShare: 0.54, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_11: {
    id: "market_11",
    question: "Will Apple stock close green on Friday?",
    icon: { name: "activity", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.51, maxPayout: 500 },
      no: { pricePerShare: 0.49, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_12: {
    id: "market_12",
    question: "Google to launch AI browser?",
    icon: { name: "cpu", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.29, maxPayout: 500 },
      no: { pricePerShare: 0.71, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_13: {
    id: "market_13",
    question: "Gold price to rise above $2000?",
    icon: { name: "sun", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.62, maxPayout: 500 },
      no: { pricePerShare: 0.38, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_14: {
    id: "market_14",
    question: "Netflix to add live sports in 2025?",
    icon: { name: "tv", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.74, maxPayout: 500 },
      no: { pricePerShare: 0.26, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
  market_15: {
    id: "market_15",
    question: "Recession to hit US in 2025?",
    icon: { name: "trending-down", set: "feather" },
    buyOptions: {
      yes: { pricePerShare: 0.67, maxPayout: 500 },
      no: { pricePerShare: 0.33, maxPayout: 500 },
    },
    sliderRange: [1, 100],
  },
};
