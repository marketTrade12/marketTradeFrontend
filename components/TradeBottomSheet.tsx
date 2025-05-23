// components/TradeBottomSheet.tsx
import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { marketData } from "@/constants/data";
import { marketBuySheetDetails } from "@/constants/marketBuySheetDetails";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  detailId: string;
  optionLabel: string;
  actionType: "buy" | "sell";
  onClose: () => void;
};

const TradeBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ detailId, optionLabel, actionType, onClose }, ref) => {
    // theme setup
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

    // internal ref for the sheet
    const internalRef = useRef<BottomSheetModal>(null);
    useImperativeHandle(ref, () => internalRef.current!);

    // only one snap point (feel free to add others)
    const snapPoints = useMemo(() => ["60%"], []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.3}
        />
      ),
      []
    );
    const onSheetChange = useCallback(
      (index: number) => {
        if (index === -1) onClose();
      },
      [onClose]
    );

    // State for Buy/Sell toggle and quantity
    const [selectedAction, setSelectedAction] = useState<"buy" | "sell">(actionType);
    const [quantity, setQuantity] = useState(0);

    // Get market data - try new data first, then fallback to legacy
    const getMarketInfo = () => {
      // Check new data structure first
      const newMarket = marketData.find(m => m.id === detailId);
      if (newMarket) {
        // Parse option label to extract the specific option and Yes/No choice
        let optionTitle = optionLabel;
        let specificPrice = 0.5;
        
        // Check if this is a multi-outcome option with "- Yes" or "- No" suffix
        if (optionLabel.includes(' - Yes') || optionLabel.includes(' - No')) {
          const parts = optionLabel.split(' - ');
          const optionName = parts[0];
          const yesNo = parts[1]; // "Yes" or "No"
          
          if (newMarket.type === 'multi-outcome') {
            const option = newMarket.options.find(opt => opt.label === optionName);
            if (option) {
              // For Buy: use option price for Yes, (1-option.price) for No
              // For Sell: use (1-option.price) for Yes, option.price for No
              if (selectedAction === 'buy') {
                specificPrice = yesNo === 'Yes' ? option.price : (1 - option.price);
              } else {
                specificPrice = yesNo === 'Yes' ? (1 - option.price) : option.price;
              }
              optionTitle = `${optionName} - ${yesNo}`;
            }
          }
        } else if (newMarket.type === 'binary') {
          // For binary markets, use the yes/no option pricing
          if (optionLabel.toLowerCase().includes('yes')) {
            specificPrice = selectedAction === 'buy' ? newMarket.yesOption.price : newMarket.noOption.price;
          } else {
            specificPrice = selectedAction === 'buy' ? newMarket.noOption.price : newMarket.yesOption.price;
          }
        }

        return {
          question: optionTitle, // Show the specific option, not main market title
          marketTitle: newMarket.title, // Keep main title for reference
          icon: newMarket.icon,
          pricing: {
            pricePerShare: specificPrice,
            maxPayout: 500
          }
        };
      }

      // Fallback to legacy data
      const legacyDetail = marketBuySheetDetails[detailId];
      if (legacyDetail && legacyDetail.buyOptions) {
        const pricing = legacyDetail.buyOptions[selectedAction === "buy" ? "yes" : "no"];
        return {
          question: legacyDetail.question,
          marketTitle: legacyDetail.question,
          icon: legacyDetail.icon,
          pricing
        };
      }

      // Default fallback
      return {
        question: optionLabel || "Market",
        marketTitle: "Market",
        icon: { name: "activity", set: "feather" as const },
        pricing: { pricePerShare: 0.5, maxPayout: 500 }
      };
    };

    const marketInfo = getMarketInfo();
    const total = marketInfo.pricing.pricePerShare * quantity;
    const potential = Math.min(marketInfo.pricing.maxPayout, total * 2);

    return (
      <BottomSheetModal
        ref={internalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onChange={onSheetChange}
      >
        <BottomSheetView
          style={[styles.container, { backgroundColor: theme.surface }]}
        >
          {/* 1) Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity>
              <Text style={[styles.topBarText, { color: theme.textSecondary }]}>
                {selectedAction === "buy" ? "Buy" : "Sell"} ▾
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Icon
                name="x"
                set="feather"
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* 2) Market title + selected option */}
          <View style={styles.marketHeader}>
            <Icon
              name={marketInfo.icon.name}
              set={marketInfo.icon.set}
              size={28}
              color={theme.primary}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.marketTitle, { color: theme.text }]}>
                {marketInfo.marketTitle}
              </Text>
              <View style={styles.subHeader}>
                <Text
                  style={[styles.subHeaderText, { color: theme.textSecondary }]}
                >
                  {marketInfo.question}
                </Text>
                <Icon
                  name="repeat"
                  set="feather"
                  size={14}
                  color={theme.primary}
                />
              </View>
            </View>
          </View>

          {/* 3) Buy/Sell Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedAction === "buy" && styles.activeTab,
                { 
                  backgroundColor: selectedAction === "buy" ? theme.success + '15' : theme.background,
                  borderColor: selectedAction === "buy" ? theme.success : theme.border
                }
              ]}
              onPress={() => setSelectedAction("buy")}
            >
              <Text style={[
                styles.tabText,
                { color: selectedAction === "buy" ? theme.success : theme.textSecondary }
              ]}>
                Buy
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                selectedAction === "sell" && styles.activeTab,
                { 
                  backgroundColor: selectedAction === "sell" ? theme.danger + '15' : theme.background,
                  borderColor: selectedAction === "sell" ? theme.danger : theme.border
                }
              ]}
              onPress={() => setSelectedAction("sell")}
            >
              <Text style={[
                styles.tabText,
                { color: selectedAction === "sell" ? theme.danger : theme.textSecondary }
              ]}>
                Sell
              </Text>
            </TouchableOpacity>
          </View>

          {/* 4) Amount selector */}
          <View style={styles.amountSection}>
            <Text style={[styles.amountLabel, { color: theme.text }]}>
              Amount
            </Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={[
                  styles.quantityBtn,
                  { backgroundColor: theme.background, borderColor: theme.border },
                ]}
                onPress={() => setQuantity(Math.max(0, quantity - 1))}
              >
                <Text style={[styles.quantityBtnText, { color: theme.text }]}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={[styles.quantityValue, { color: theme.text }]}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={[
                  styles.quantityBtn,
                  { backgroundColor: theme.background, borderColor: theme.border },
                ]}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={[styles.quantityBtnText, { color: theme.text }]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 5) Price info */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>
                Price per share
              </Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>
                ${marketInfo.pricing.pricePerShare.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>
                Potential return
              </Text>
              <Text style={[styles.priceValue, { color: theme.success }]}>
                ${potential.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* 6) CTA button */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={[
                styles.cta,
                {
                  backgroundColor:
                    selectedAction === "buy" ? theme.success : theme.danger,
                },
              ]}
            >
              <Text style={[styles.ctaText, { color: theme.surface }]}>
                {selectedAction === "buy" ? "Buy" : "Sell"} {marketInfo.question}
              </Text>
              <Text style={[styles.payout, { color: theme.surface }]}>
                {quantity === 0
                  ? "Login to Trade"
                  : `Total: $${total.toFixed(2)} • Win $${potential.toFixed(2)}`}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

TradeBottomSheet.displayName = "TradeBottomSheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 16,
  },
  topBarText: {
    fontSize: 16,
    fontWeight: "600",
  },
  marketHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  marketTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  subHeaderText: {
    fontSize: 14,
    marginRight: 8,
  },
  amountSection: {
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityBtnText: {
    fontSize: 18,
    fontWeight: "600",
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 24,
    minWidth: 50,
    textAlign: "center",
  },
  priceSection: {
    marginBottom: 32,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  ctaContainer: {
    marginBottom: 24,
  },
  cta: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  payout: {
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.9,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderColor: "currentColor",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TradeBottomSheet;
