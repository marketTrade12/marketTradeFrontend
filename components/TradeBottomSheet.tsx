// components/TradeBottomSheet.tsx
import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { marketData } from "@/constants/data";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  detailId: string;
  optionLabel: string;
  actionType: "buy" | "sell";
  onClose: () => void;
};

const TradeBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ detailId, optionLabel, actionType, onClose }, ref) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];
    const router = useRouter();

    const internalRef = useRef<BottomSheetModal>(null);
    useImperativeHandle(ref, () => internalRef.current!);

    const snapPoints = useMemo(() => ["70%"], []);

    // Add bottom inset for Android navigation bar
    const bottomInset = useMemo(() => 0, []);

    // Add state for showing deposit view
    const [showDepositView, setShowDepositView] = useState(false);
    const [depositAmount] = useState("200");

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.5}
        />
      ),
      []
    );

    const onSheetChange = useCallback(
      (index: number) => {
        if (index === -1) {
          onClose();
          setShowDepositView(false);
        }
      },
      [onClose]
    );

    // State for Yes/No selection and amount
    const [selectedOption, setSelectedOption] = useState<"Yes" | "No">("No");
    const [price, setPrice] = useState(4.5);
    const [quantity, setQuantity] = useState(1);

    // Get market data
    const getMarketInfo = () => {
      const market = marketData.find((m) => m.id === detailId);
      if (market && market.type === "binary") {
        return {
          title: market.title,
          icon: market.icon,
          yesPrice: 5.5,
          noPrice: 4.5,
          imageUrl: market.imageUrl,
        };
      }
      return {
        title:
          'Will "Sitare zameen par" cross ₹100 crore at the box office in its first week?',
        icon: { name: "film", set: "feather" as const },
        yesPrice: 5.5,
        noPrice: 4.5,
        imageUrl:
          "https://i.postimg.cc/8zMy85fQ/Screenshot-2024-07-20-at-10-53-15-AM.png",
      };
    };

    const marketInfo = getMarketInfo();

    useEffect(() => {
      if (selectedOption === "Yes") {
        setPrice(marketInfo.yesPrice);
      } else {
        setPrice(marketInfo.noPrice);
      }
    }, [selectedOption, marketInfo.yesPrice, marketInfo.noPrice]);

    const totalAmount = price * quantity;
    const potentialReturn = 2500; // Fixed for now as shown in design
    const availableBalance = 300;
    const isDepositMode = totalAmount > availableBalance;

    const handlePriceChange = (increment: boolean) => {
      setPrice((prev) => {
        const newPrice = prev + (increment ? 0.1 : -0.1);
        if (newPrice >= 0.5 && newPrice <= 9.5) {
          return parseFloat(newPrice.toFixed(2));
        }
        return prev;
      });
    };

    const handleQuantityChange = (increment: boolean) => {
      setQuantity((prev) => {
        const newQuantity = prev + (increment ? 1 : -1);
        if (newQuantity >= 1 && newQuantity <= 10) {
          return newQuantity;
        }
        return prev;
      });
    };

    const handleBuyPress = () => {
      setShowDepositView(true);
    };

    const renderDepositView = () => (
      <View style={styles.depositContainer}>
        <View style={styles.depositHeader}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedOption === "Yes"
                ? styles.yesTabActive
                : styles.tabInactive,
            ]}
            disabled
          >
            <Text
              style={[
                styles.tabText,
                selectedOption === "Yes"
                  ? styles.yesTabTextActive
                  : styles.tabTextInactive,
              ]}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedOption === "No" ? styles.noTabActive : styles.tabInactive,
            ]}
            disabled
          >
            <Text
              style={[
                styles.tabText,
                selectedOption === "No"
                  ? styles.noTabTextActive
                  : styles.tabTextInactive,
              ]}
            >
              No
            </Text>
          </TouchableOpacity>

          <View style={styles.marketInfoContainer}>
            <Icon name="info" set="material" size={16} color={theme.text} />
            <Text style={styles.marketText}>Market ↓</Text>
          </View>
        </View>

        <View style={styles.marketSection}>
          <Text style={styles.marketTitle}>{marketInfo.title}</Text>
          <Image
            source={{ uri: marketInfo.imageUrl }}
            style={styles.marketImage}
          />
        </View>

        <View style={styles.priceInfoContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>
              Yes Current Price: ₹ {marketInfo.yesPrice}
            </Text>
            <Text style={styles.getAmountText}>Get ₹ 10</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>
              No Current Price: ₹ {marketInfo.noPrice}
            </Text>
            <Text style={styles.getAmountText}>Get ₹ 10</Text>
          </View>
        </View>

        <View style={styles.addAmountContainer}>
          <Text style={styles.addAmountLabel}>Add Amount</Text>
          <Text style={styles.amountText}>₹ {depositAmount}</Text>
          <Text style={styles.returnText}>Get 💰 ₹2500</Text>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Available Balance: ₹ 000</Text>
          <Icon name="info" set="material" size={16} color="#9CA3AF" />
        </View>

        <TouchableOpacity
          style={styles.depositButton}
          onPress={() => router.push("/wallet")}
        >
          <Text style={styles.depositButtonText}>Deposit</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By proceeding, you agree to the{" "}
          <Text style={styles.termsLink}>Terms & Condition</Text>.
        </Text>
      </View>
    );

    return (
      <BottomSheetModal
        ref={internalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onChange={onSheetChange}
        bottomInset={bottomInset}
        android_keyboardInputMode="adjustResize"
        handleIndicatorStyle={{
          backgroundColor: "#000",
          width: 40,
        }}
        backgroundStyle={{
          backgroundColor: "#E8E8E8",
        }}
      >
        <BottomSheetView
          style={[styles.container, { backgroundColor: "#E8E8E8" }]}
        >
          {showDepositView ? (
            renderDepositView()
          ) : (
            <>
              {/* Header with Yes/No tabs and Limit dropdown */}
              <View style={styles.header}>
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      selectedOption === "Yes"
                        ? styles.yesTabActive
                        : styles.tabInactive,
                    ]}
                    onPress={() => setSelectedOption("Yes")}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        selectedOption === "Yes"
                          ? styles.yesTabTextActive
                          : styles.tabTextInactive,
                      ]}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      selectedOption === "No"
                        ? styles.noTabActive
                        : styles.tabInactive,
                    ]}
                    onPress={() => setSelectedOption("No")}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        selectedOption === "No"
                          ? styles.noTabTextActive
                          : styles.tabTextInactive,
                      ]}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.limitContainer}>
                  <Icon
                    name="info"
                    set="material"
                    size={16}
                    color={theme.text}
                  />
                  <Text style={styles.limitText}>Limit</Text>
                  <Icon
                    name="unfold-more"
                    set="material"
                    size={16}
                    color={theme.text}
                  />
                </View>
              </View>

              {/* Market Title with Image */}
              <View style={styles.marketSection}>
                <Text style={styles.marketTitle}>{marketInfo.title}</Text>
                <Image
                  source={{ uri: marketInfo.imageUrl }}
                  style={styles.marketImage}
                />
              </View>

              {/* Current Price */}
              <View style={styles.currentPriceSection}>
                <Text style={styles.currentPriceText}>
                  Yes Current Price: ₹ {marketInfo.yesPrice}
                </Text>
                <Text style={styles.currentPriceText}>
                  No Current Price: ₹ {marketInfo.noPrice}
                </Text>
              </View>

              {/* Price Input */}
              <View style={styles.priceInputContainer}>
                <View style={styles.inputRow}>
                  <View style={styles.inputHeader}>
                    <Text style={styles.minMaxText}>Min: ₹0.5</Text>
                    <Text style={styles.inputLabel}>Price</Text>
                    <Text style={styles.minMaxText}>Max: ₹9.5</Text>
                  </View>
                  <View style={styles.inputControl}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={() => handlePriceChange(false)}
                    >
                      <Text style={styles.controlButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.inputValue}>{price.toFixed(2)}</Text>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={() => handlePriceChange(true)}
                    >
                      <Text style={styles.controlButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Quantity Input */}
                <View style={styles.inputRow}>
                  <View style={styles.inputHeader}>
                    <Text style={styles.minMaxText}>Min: 1</Text>
                    <Text style={styles.inputLabel}>Quantity</Text>
                    <Text style={styles.minMaxText}>Max: 10</Text>
                  </View>
                  <View style={styles.inputControl}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={() => handleQuantityChange(false)}
                    >
                      <Text style={styles.controlButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.inputValue}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={() => handleQuantityChange(true)}
                    >
                      <Text style={styles.controlButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Total Amount */}
                <View style={styles.totalAmountSection}>
                  <Text style={styles.totalAmountLabel}>Total Amount</Text>
                  <Text style={styles.totalAmountValue}>
                    ₹ {totalAmount.toFixed(2)}
                  </Text>
                </View>

                {/* Potential Return */}
                <View style={styles.returnSection}>
                  <Text style={styles.returnLabel}>
                    Get 💰 ₹{potentialReturn}
                  </Text>
                </View>

                {/* Available Balance */}
                <View style={styles.balanceSection}>
                  <Text style={styles.balanceText}>
                    Available Balance: ₹{availableBalance}
                  </Text>
                  <Icon name="info" set="material" size={16} color="#9CA3AF" />
                </View>

                {/* CTA Button or Deposit */}
                <TouchableOpacity onPress={handleBuyPress}>
                  <LinearGradient
                    colors={
                      selectedOption === "Yes"
                        ? ["#C4B5FD", "#8B5CF6"]
                        : ["#86EFAC", "#22C55E"]
                    }
                    style={styles.buyButton}
                  >
                    <Text style={styles.buyButtonText}>
                      Buy {selectedOption}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Terms */}
                <Text style={styles.termsText}>
                  By proceeding, you agree to the{" "}
                  <Text style={styles.termsLink}>Terms & Condition</Text>.
                </Text>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

TradeBottomSheet.displayName = "TradeBottomSheet";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#E8E8E8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  tabInactive: {
    backgroundColor: "transparent",
  },
  yesTabActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#7C3AED",
  },
  noTabActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#22C55E",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  yesTabTextActive: {
    color: "#7C3AED",
  },
  noTabTextActive: {
    color: "#22C55E",
  },
  tabTextInactive: {
    color: "#6B7280",
  },
  limitContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  limitText: {
    fontSize: 14,
    fontWeight: "500",
  },
  marketSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    padding: 12,
  },
  marketTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
  marketImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginLeft: 12,
  },
  currentPriceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  currentPriceText: {
    fontSize: 14,
    color: "#374151",
  },
  priceInputContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
  },
  inputRow: {
    marginBottom: 20,
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  minMaxText: {
    fontSize: 12,
    color: "#6B7280",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  inputControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButtonText: {
    fontSize: 24,
    fontWeight: "300",
    color: "#1F2937",
    lineHeight: 28,
  },
  inputValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
  },
  totalAmountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 8,
  },
  totalAmountLabel: {
    fontSize: 14,
    color: "#374151",
  },
  totalAmountValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  returnSection: {
    alignItems: "center",
    marginBottom: 12,
  },
  returnLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#16A34A",
  },
  balanceSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 4,
  },
  balanceText: {
    fontSize: 12,
    color: "#6B7280",
  },
  buyButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  termsText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  termsLink: {
    color: "#6D28D9",
    textDecorationLine: "underline",
  },
  depositContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  depositHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  marketInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  marketText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  priceInfoContainer: {
    marginVertical: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceText: {
    fontSize: 14,
    color: "#374151",
  },
  getAmountText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  addAmountContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  addAmountLabel: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 16,
  },
  amountText: {
    fontSize: 48,
    fontWeight: "300",
    color: "#111827",
    marginBottom: 16,
  },
  returnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#16A34A",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 24,
  },
  depositButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  depositButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default TradeBottomSheet;
