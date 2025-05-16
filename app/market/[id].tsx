// pages/market/[id].tsx
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TradeBottomSheet from "@/components/TradeBottomSheet";
import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { marketDetails } from "@/constants/marketDetails";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function MarketDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const scheme = useColorScheme() ?? "light";
  const theme = Colors[scheme];

  const data = marketDetails[id];
  const sheetRef = useRef<BottomSheetModal>(null);
  const [tradeMeta, setTradeMeta] = useState<{
    detailId: string;
    optionLabel: string;
    actionType: "buy" | "sell";
  } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const openSheet = useCallback(
    (optionLabel: string, actionType: "buy" | "sell") => {
      setTradeMeta({ detailId: data.id, optionLabel, actionType });
      sheetRef.current?.present();
    },
    [data]
  );

  if (!data) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Market not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name={data.icon.name}
            set={data.icon.set}
            size={40}
            color={theme.primary}
          />
          <Text style={[styles.title, { color: theme.text }]}>
            {data.title}
          </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Icon name="link" set="feather" size={20} color={theme.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Icon
                name="bookmark"
                set="feather"
                size={20}
                color={theme.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Volume */}
        <View style={styles.volumeRow}>
          <Icon name="bar-chart-2" set="feather" size={16} color={theme.icon} />
          <Text style={[styles.volumeText, { color: theme.textSecondary }]}>
            {data.totalVolume} Vol.
          </Text>
        </View>

        {/* Outcomes */}
        {data.outcomes.map((o) => {
          const isExpanded = expandedId === o.id;
          return (
            <View
              key={o.id}
              style={[
                styles.outcomeBlock,
                { borderColor: theme.border, backgroundColor: theme.surface },
              ]}
            >
              {/* Basic Info */}
              <View style={styles.outcomeInfo}>
                <Icon
                  name={o.icon?.name ?? "circle"}
                  set={o.icon?.set ?? "feather"}
                  size={24}
                  color={theme.icon}
                />
                <View style={styles.outcomeText}>
                  <Text style={[styles.outcomeLabel, { color: theme.text }]}>
                    {o.label}
                  </Text>
                  <Text
                    style={[
                      styles.outcomeVolume,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {o.volume}
                  </Text>
                </View>
                <Text style={[styles.outcomeChance, { color: theme.text }]}>
                  {o.chance}%
                </Text>
              </View>

              {/* Buy / Sell */}
              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={[styles.btnYes, { backgroundColor: theme.success }]}
                  onPress={() => openSheet(o.label, "buy")}
                >
                  <Text style={[styles.btnText, { color: theme.surface }]}>
                    Buy Yes {o.yesPrice}¢
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnNo, { backgroundColor: theme.danger }]}
                  onPress={() => openSheet(o.label, "sell")}
                >
                  <Text style={[styles.btnText, { color: theme.surface }]}>
                    Buy No {o.noPrice}¢
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Order-Book Toggle */}
              <TouchableOpacity
                style={styles.orderToggle}
                onPress={() => setExpandedId(isExpanded ? null : o.id)}
              >
                <Text
                  style={[styles.orderToggleText, { color: theme.primary }]}
                >
                  Order Book
                </Text>
                <Icon
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  set="feather"
                  size={20}
                  color={theme.primary}
                />
              </TouchableOpacity>

              {/* Collapsible Order-Book */}
              {isExpanded && (
                <View style={[styles.orderBook, { borderColor: theme.border }]}>
                  {/* Bids */}
                  <Text
                    style={[styles.orderSectionTitle, { color: theme.text }]}
                  >
                    Bids
                  </Text>
                  <View style={styles.orderRowHeader}>
                    <Text
                      style={[
                        styles.orderColHeader,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Price
                    </Text>
                    <Text
                      style={[
                        styles.orderColHeader,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Amount
                    </Text>
                  </View>
                  {(o.orderBook?.bids ?? []).map((b, i) => (
                    <View key={i} style={styles.orderRow}>
                      <Text style={[styles.orderCol, { color: theme.text }]}>
                        {b.price}
                      </Text>
                      <Text style={[styles.orderCol, { color: theme.text }]}>
                        {b.amount}
                      </Text>
                    </View>
                  ))}

                  {/* Asks */}
                  <Text
                    style={[
                      styles.orderSectionTitle,
                      { color: theme.text, marginTop: 12 },
                    ]}
                  >
                    Asks
                  </Text>
                  <View style={styles.orderRowHeader}>
                    <Text
                      style={[
                        styles.orderColHeader,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Price
                    </Text>
                    <Text
                      style={[
                        styles.orderColHeader,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Amount
                    </Text>
                  </View>
                  {(o.orderBook?.asks ?? []).map((a, i) => (
                    <View key={i} style={styles.orderRow}>
                      <Text style={[styles.orderCol, { color: theme.text }]}>
                        {a.price}
                      </Text>
                      <Text style={[styles.orderCol, { color: theme.text }]}>
                        {a.amount}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {/* About */}
        <View style={styles.about}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            About
          </Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Volume
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {data.totalVolume}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              End Date
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {new Date(data.endDate).toDateString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Resolver
            </Text>
            <Text style={[styles.infoValue, { color: theme.primary }]}>
              {data.resolver.name}
            </Text>
          </View>
        </View>

        {/* Back */}
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.primary }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.backText, { color: theme.surface }]}>Back</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Trade Sheet */}
      {tradeMeta && (
        <TradeBottomSheet
          ref={sheetRef}
          detailId={tradeMeta.detailId}
          optionLabel={tradeMeta.optionLabel}
          actionType={tradeMeta.actionType}
          onClose={() => {
            sheetRef.current?.dismiss();
            setTradeMeta(null);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 12,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconBtn: {
    marginLeft: 12,
  },
  volumeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  volumeText: {
    marginLeft: 6,
    fontSize: 14,
  },
  outcomeBlock: {
    borderBottomWidth: 1,
    padding: 16,
  },
  outcomeInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  outcomeText: {
    flex: 1,
    marginHorizontal: 12,
  },
  outcomeLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  outcomeVolume: {
    fontSize: 12,
    marginTop: 2,
  },
  outcomeChance: {
    fontSize: 18,
    fontWeight: "700",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  btnYes: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    borderRadius: 6,
  },
  btnNo: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
  },
  btnText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  orderToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  orderToggleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  orderBook: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  orderSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  orderRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
    borderBottomWidth: 1,
  },
  orderColHeader: {
    width: "50%",
    fontSize: 12,
    fontWeight: "600",
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  orderCol: {
    width: "50%",
    fontSize: 12,
  },
  about: {
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  backBtn: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
