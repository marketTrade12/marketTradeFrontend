// components/TradeBottomSheet.tsx
import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
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
    const snapPoints = useMemo(() => ["50%"], []);
    const renderBackdrop = useCallback(
      (props) => (
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

    // purchase quantity state
    const [quantity, setQuantity] = useState(0);

    // market detail + pricing logic
    const detail = marketBuySheetDetails[detailId];
    const pricing = detail.buyOptions[actionType === "buy" ? "yes" : "no"];
    const total = (pricing.pricePerShare ?? 0) * quantity;
    const potential = Math.min(pricing.maxPayout ?? 0, total * 2);

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
                {actionType === "buy" ? "Buy" : "Sell"} ▾
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
              name={detail.icon.name}
              set={detail.icon.set}
              size={28}
              color={theme.primary}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.marketTitle, { color: theme.text }]}>
                {detail.question}
              </Text>
              <View style={styles.subHeader}>
                <Text
                  style={[styles.subHeaderText, { color: theme.textSecondary }]}
                >
                  {optionLabel}
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

          {/* 3) Amount selector */}
          <View style={styles.inputRow}>
            <TouchableOpacity
              style={[styles.qtyControl, { backgroundColor: theme.muted }]}
              onPress={() => setQuantity((q) => Math.max(0, q - 1))}
            >
              <Icon
                name="minus"
                set="feather"
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>

            <Text style={[styles.amount, { color: theme.text }]}>
              ${quantity}
            </Text>

            <TouchableOpacity
              style={[styles.qtyControl, { backgroundColor: theme.muted }]}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Icon
                name="plus"
                set="feather"
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* 4) Preset buttons */}
          <View style={styles.presetRow}>
            {["+$1", "+$20", "+$100", "Max"].map((label) => (
              <TouchableOpacity
                key={label}
                style={[styles.presetBtn, { backgroundColor: theme.muted }]}
                onPress={() => {
                  if (label === "Max") setQuantity(pricing.maxPayout);
                  else
                    setQuantity(
                      (q) => q + Number(label.replace(/[^0-9]/g, ""))
                    );
                }}
              >
                <Text
                  style={[styles.presetText, { color: theme.textSecondary }]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 5) CTA */}
          <TouchableOpacity
            style={[
              styles.cta,
              {
                backgroundColor:
                  actionType === "buy" ? theme.success : theme.danger,
              },
            ]}
          >
            <Text style={[styles.ctaText, { color: theme.surface }]}>
              {actionType === "buy" ? "Buy" : "Sell"} {optionLabel}
            </Text>
            <Text style={[styles.payout, { color: theme.surface }]}>
              {quantity === 0
                ? "Login to Trade"
                : `Total: $${total.toFixed(2)} • Win $${potential.toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

TradeBottomSheet.displayName = "TradeBottomSheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  topBarText: {
    fontSize: 14,
    fontWeight: "600",
  },
  marketHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  marketTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  subHeaderText: {
    fontSize: 14,
    marginRight: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  qtyControl: {
    padding: 12,
    borderRadius: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: "700",
    marginHorizontal: 20,
  },
  presetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  presetBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  presetText: {
    fontSize: 14,
    fontWeight: "600",
  },
  cta: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "700",
  },
  payout: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default TradeBottomSheet;
