// components/TradeBottomSheet.tsx
import Icon from "@/components/ui/Icon";
import { marketData } from "@/constants/data";
import { useTheme } from "@/hooks/useThemeColor";
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
    const theme = useTheme();
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

    const handleContinuePressed = () => {
      router.push("/wallet");
    };

    // Add dynamic styles here to use theme
    const dynamicStyles = useMemo(
      () =>
        StyleSheet.create({
          container: {
            backgroundColor: theme.colors.background,
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: theme.spacing.xl + bottomInset,
          },
          header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: theme.spacing.lg,
          },
          questionContainer: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            marginRight: theme.spacing.md,
          },
          questionText: {
            fontSize: theme.typography.body1.fontSize,
            fontFamily: theme.typography.body1.fontFamily,
            color: theme.colors.text,
            flex: 1,
            marginLeft: theme.spacing.sm,
          },
          closeButton: {
            padding: theme.spacing.xs,
          },
          selectionContainer: {
            marginBottom: theme.spacing.lg,
          },
          selectionTitle: {
            fontSize: theme.typography.subHeading.fontSize,
            fontFamily: theme.typography.subHeading.fontFamily,
            fontWeight: theme.typography.subHeading.fontWeight,
            color: theme.colors.text,
            marginBottom: theme.spacing.md,
            textAlign: "center",
          },
          optionButtons: {
            flexDirection: "row",
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.xs,
          },
          optionButton: {
            flex: 1,
            paddingVertical: theme.spacing.md,
            alignItems: "center",
            borderRadius: theme.borderRadius.md,
          },
          selectedOption: {
            backgroundColor: theme.colors.cardBackground,
            ...theme.shadows.small,
          },
          optionText: {
            fontSize: theme.typography.body1.fontSize,
            fontFamily: theme.typography.body1.fontFamily,
            color: theme.colors.text,
            fontWeight: "500",
          },
          selectedOptionText: {
            color: theme.colors.primary,
            fontWeight: "600",
          },
          priceContainer: {
            marginBottom: theme.spacing.lg,
          },
          priceHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.md,
          },
          priceTitle: {
            fontSize: theme.typography.subHeading.fontSize,
            fontFamily: theme.typography.subHeading.fontFamily,
            fontWeight: theme.typography.subHeading.fontWeight,
            color: theme.colors.text,
          },
          infoIcon: {
            marginLeft: theme.spacing.xs,
          },
          priceControls: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.md,
          },
          priceButton: {
            width: 40,
            height: 40,
            borderRadius: theme.borderRadius.sm,
            backgroundColor: theme.colors.cardBackground,
            alignItems: "center",
            justifyContent: "center",
            ...theme.shadows.small,
          },
          priceValue: {
            fontSize: theme.typography.h3.fontSize,
            fontFamily: theme.typography.h3.fontFamily,
            fontWeight: theme.typography.h3.fontWeight,
            color: theme.colors.text,
          },
          quantityContainer: {
            marginBottom: theme.spacing.lg,
          },
          quantityHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.md,
          },
          quantityTitle: {
            fontSize: theme.typography.subHeading.fontSize,
            fontFamily: theme.typography.subHeading.fontFamily,
            fontWeight: theme.typography.subHeading.fontWeight,
            color: theme.colors.text,
          },
          quantityControls: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.md,
          },
          quantityButton: {
            width: 40,
            height: 40,
            borderRadius: theme.borderRadius.sm,
            backgroundColor: theme.colors.cardBackground,
            alignItems: "center",
            justifyContent: "center",
            ...theme.shadows.small,
          },
          quantityValue: {
            fontSize: theme.typography.h3.fontSize,
            fontFamily: theme.typography.h3.fontFamily,
            fontWeight: theme.typography.h3.fontWeight,
            color: theme.colors.text,
          },
          summaryContainer: {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.lg,
            marginBottom: theme.spacing.lg,
          },
          summaryRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: theme.spacing.sm,
          },
          summaryLabel: {
            fontSize: theme.typography.body1.fontSize,
            fontFamily: theme.typography.body1.fontFamily,
            color: theme.colors.textSecondary,
          },
          summaryValue: {
            fontSize: theme.typography.body1.fontSize,
            fontFamily: theme.typography.body1.fontFamily,
            color: theme.colors.text,
            fontWeight: "500",
          },
          totalRow: {
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
          },
          totalLabel: {
            fontSize: theme.typography.subHeading.fontSize,
            fontFamily: theme.typography.subHeading.fontFamily,
            fontWeight: theme.typography.subHeading.fontWeight,
            color: theme.colors.text,
          },
          totalValue: {
            fontSize: theme.typography.subHeading.fontSize,
            fontFamily: theme.typography.subHeading.fontFamily,
            fontWeight: theme.typography.subHeading.fontWeight,
            color: theme.colors.success,
          },
          buyButton: {
            borderRadius: theme.borderRadius.md,
            paddingVertical: theme.spacing.md,
            alignItems: "center",
            marginBottom: theme.spacing.md,
          },
          buyButtonText: {
            fontSize: theme.typography.button.fontSize,
            fontFamily: theme.typography.button.fontFamily,
            fontWeight: theme.typography.button.fontWeight,
            color: theme.colors.textInverse,
          },
          termsText: {
            fontSize: theme.typography.body2.fontSize,
            fontFamily: theme.typography.body2.fontFamily,
            color: theme.colors.textSecondary,
            textAlign: "center",
            lineHeight: 20,
          },
          termsLink: {
            color: theme.colors.primary,
            textDecorationLine: "underline",
          },
          // Deposit view styles
          depositContainer: {
            backgroundColor: theme.colors.background,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
          },
          depositHeader: {
            alignItems: "center",
            marginBottom: theme.spacing.xl,
          },
          depositTitle: {
            fontSize: theme.typography.h3.fontSize,
            fontFamily: theme.typography.h3.fontFamily,
            fontWeight: theme.typography.h3.fontWeight,
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
          },
          depositSubtitle: {
            fontSize: theme.typography.body1.fontSize,
            fontFamily: theme.typography.body1.fontFamily,
            color: theme.colors.textSecondary,
            textAlign: "center",
          },
          depositAmountContainer: {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.lg,
            alignItems: "center",
            marginBottom: theme.spacing.xl,
          },
          depositAmount: {
            fontSize: theme.typography.h2.fontSize,
            fontFamily: theme.typography.h2.fontFamily,
            fontWeight: theme.typography.h2.fontWeight,
            color: theme.colors.primary,
            marginBottom: theme.spacing.sm,
          },
          depositLabel: {
            fontSize: theme.typography.body2.fontSize,
            fontFamily: theme.typography.body2.fontFamily,
            color: theme.colors.textSecondary,
          },
          continueButton: {
            backgroundColor: theme.colors.warning,
            borderRadius: theme.borderRadius.md,
            paddingVertical: theme.spacing.md,
            alignItems: "center",
            marginBottom: theme.spacing.md,
          },
          continueButtonText: {
            fontSize: theme.typography.button.fontSize,
            fontFamily: theme.typography.button.fontFamily,
            fontWeight: theme.typography.button.fontWeight,
            color: theme.colors.textInverse,
          },
        }),
      [theme, bottomInset]
    );

    return (
      <BottomSheetModal
        ref={internalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={onSheetChange}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.border }}
      >
        <BottomSheetView style={dynamicStyles.container}>
          {!showDepositView ? (
            <>
              {/* Header */}
              <View style={dynamicStyles.header}>
                <View style={dynamicStyles.questionContainer}>
                  <Image
                    source={{ uri: marketInfo.imageUrl }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: theme.borderRadius.sm,
                    }}
                  />
                  <Text style={dynamicStyles.questionText} numberOfLines={2}>
                    {marketInfo.title}
                  </Text>
                </View>
                <TouchableOpacity
                  style={dynamicStyles.closeButton}
                  onPress={() => internalRef.current?.close()}
                >
                  <Icon
                    name="x"
                    set="feather"
                    size={24}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              {/* Option Selection */}
              <View style={dynamicStyles.selectionContainer}>
                <Text style={dynamicStyles.selectionTitle}>
                  Choose your prediction
                </Text>
                <View style={dynamicStyles.optionButtons}>
                  <TouchableOpacity
                    style={[
                      dynamicStyles.optionButton,
                      selectedOption === "Yes" && dynamicStyles.selectedOption,
                    ]}
                    onPress={() => setSelectedOption("Yes")}
                  >
                    <Text
                      style={[
                        dynamicStyles.optionText,
                        selectedOption === "Yes" &&
                          dynamicStyles.selectedOptionText,
                      ]}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      dynamicStyles.optionButton,
                      selectedOption === "No" && dynamicStyles.selectedOption,
                    ]}
                    onPress={() => setSelectedOption("No")}
                  >
                    <Text
                      style={[
                        dynamicStyles.optionText,
                        selectedOption === "No" &&
                          dynamicStyles.selectedOptionText,
                      ]}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Price */}
              <View style={dynamicStyles.priceContainer}>
                <View style={dynamicStyles.priceHeader}>
                  <Text style={dynamicStyles.priceTitle}>Price per share</Text>
                  <Icon
                    name="info"
                    set="material"
                    size={16}
                    color={theme.colors.textSecondary}
                  />
                </View>
                <View style={dynamicStyles.priceControls}>
                  <TouchableOpacity
                    style={dynamicStyles.priceButton}
                    onPress={() => handlePriceChange(false)}
                  >
                    <Icon
                      name="minus"
                      set="feather"
                      size={20}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                  <Text style={dynamicStyles.priceValue}>
                    ₹{price.toFixed(1)}
                  </Text>
                  <TouchableOpacity
                    style={dynamicStyles.priceButton}
                    onPress={() => handlePriceChange(true)}
                  >
                    <Icon
                      name="plus"
                      set="feather"
                      size={20}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Quantity */}
              <View style={dynamicStyles.quantityContainer}>
                <View style={dynamicStyles.quantityHeader}>
                  <Text style={dynamicStyles.quantityTitle}>Quantity</Text>
                </View>
                <View style={dynamicStyles.quantityControls}>
                  <TouchableOpacity
                    style={dynamicStyles.quantityButton}
                    onPress={() => handleQuantityChange(false)}
                  >
                    <Icon
                      name="minus"
                      set="feather"
                      size={20}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                  <Text style={dynamicStyles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity
                    style={dynamicStyles.quantityButton}
                    onPress={() => handleQuantityChange(true)}
                  >
                    <Icon
                      name="plus"
                      set="feather"
                      size={20}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Summary */}
              <View style={dynamicStyles.summaryContainer}>
                <View style={dynamicStyles.summaryRow}>
                  <Text style={dynamicStyles.summaryLabel}>Total shares</Text>
                  <Text style={dynamicStyles.summaryValue}>{quantity}</Text>
                </View>
                <View style={dynamicStyles.summaryRow}>
                  <Text style={dynamicStyles.summaryLabel}>
                    Price per share
                  </Text>
                  <Text style={dynamicStyles.summaryValue}>
                    ₹{price.toFixed(1)}
                  </Text>
                </View>
                <View style={dynamicStyles.summaryRow}>
                  <Text style={dynamicStyles.summaryLabel}>Total amount</Text>
                  <Text style={dynamicStyles.summaryValue}>
                    ₹{totalAmount.toFixed(1)}
                  </Text>
                </View>
                <View
                  style={[dynamicStyles.summaryRow, dynamicStyles.totalRow]}
                >
                  <Text style={dynamicStyles.totalLabel}>Potential return</Text>
                  <Text style={dynamicStyles.totalValue}>
                    ₹{potentialReturn}
                  </Text>
                </View>
              </View>

              {/* CTA Button or Deposit */}
              <TouchableOpacity onPress={handleBuyPress}>
                <LinearGradient
                  colors={
                    selectedOption === "Yes"
                      ? [theme.colors.success + "CC", theme.colors.success]
                      : [theme.colors.error + "CC", theme.colors.error]
                  }
                  style={dynamicStyles.buyButton}
                >
                  <Text style={dynamicStyles.buyButtonText}>
                    Buy {selectedOption}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Terms */}
              <Text style={dynamicStyles.termsText}>
                By proceeding, you agree to the{" "}
                <Text style={dynamicStyles.termsLink}>Terms & Condition</Text>.
              </Text>
            </>
          ) : (
            <>
              {/* Deposit View */}
              <View style={dynamicStyles.depositContainer}>
                <View style={dynamicStyles.depositHeader}>
                  <Text style={dynamicStyles.depositTitle}>
                    Deposit Required
                  </Text>
                  <Text style={dynamicStyles.depositSubtitle}>
                    You need to add funds to complete this trade
                  </Text>
                </View>

                <View style={dynamicStyles.depositAmountContainer}>
                  <Text style={dynamicStyles.depositAmount}>
                    ₹{depositAmount}
                  </Text>
                  <Text style={dynamicStyles.depositLabel}>
                    Minimum deposit required
                  </Text>
                </View>

                <TouchableOpacity
                  style={dynamicStyles.continueButton}
                  onPress={handleContinuePressed}
                >
                  <Text style={dynamicStyles.continueButtonText}>
                    Continue to Deposit
                  </Text>
                </TouchableOpacity>

                <Text style={dynamicStyles.termsText}>
                  Secure payment powered by Razorpay
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

export default TradeBottomSheet;
