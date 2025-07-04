import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { MarketItem, TradeAction } from "@/constants/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  item: MarketItem;
  onVote?: (meta: TradeAction) => void;
  hideVoting?: boolean;
};

export default function MarketCard({ item, onVote, hideVoting }: Props) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const router = useRouter();

  const formatTimeRemaining = (endDate: string) => {
    const diffMs = new Date(endDate).getTime() - Date.now();
    const days = Math.ceil(diffMs / 86_400_000);
    if (days < 0) return "Ended";
    if (days === 0) return "Today";
    if (days === 1) return "1 day";
    if (days < 30) return `${days} days`;
    const m = Math.floor(days / 30);
    return m === 1 ? "1 month" : `${m} months`;
  };

  const yesPct =
    item.type === "binary" ? Math.round(item.yesOption.price * 100) : 0;
  const noPct = item.type === "binary" ? 100 - yesPct : 0;
  const multiPct = (price: number) => Math.round(price * 100);

  const handleShare = async () => {
    try {
      let shareMessage = `Check out this market on TradeX:\n\n${item.title}\n\n`;
      if (item.type === "binary") {
        shareMessage += `Yes: ${item.yesOption.priceDisplay}\nNo: ${item.noOption.priceDisplay}`;
      } else {
        shareMessage += item.options
          .map((opt) => `${opt.label}: ${opt.priceDisplay}`)
          .join("\n");
      }
      shareMessage += `\n\nVolume: ${item.totalVolume}`;
      await Share.share({ message: shareMessage, title: item.title });
    } catch (e) {
      console.error("Error sharing:", e);
    }
  };

  return (
    <Pressable
      onPress={() => router.push(`/market/${item.detailId}`)}
      style={styles.wrapper}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {item.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
          )}

          <Text style={[styles.title, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.subText, { color: theme.textSecondary }]}>
            {item.category.toUpperCase()} • {formatTimeRemaining(item.endDate)}
          </Text>

          {!hideVoting && item.type === "binary" && (
            <View style={styles.binaryRow}>
              <TouchableOpacity
                style={[styles.binaryBtn, { backgroundColor: "#EDEBFF" }]}
                onPress={() =>
                  onVote?.({
                    detailId: item.detailId,
                    optionId: item.yesOption.id,
                    actionType: "buy",
                    label: item.yesOption.label,
                    price: item.yesOption.price,
                    marketType: "binary",
                  })
                }
              >
                <Text style={[styles.binaryBtnText, { color: "#7C3AED" }]}>
                  Yes ₹ {(item.yesOption.price * 10).toFixed(1)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.binaryBtn, { backgroundColor: "#ECFDF5" }]}
                onPress={() =>
                  onVote?.({
                    detailId: item.detailId,
                    optionId: item.noOption.id,
                    actionType: "buy",
                    label: item.noOption.label,
                    price: item.noOption.price,
                    marketType: "binary",
                  })
                }
              >
                <Text style={[styles.binaryBtnText, { color: "#22C55E" }]}>
                  No ₹ {(item.noOption.price * 10).toFixed(1)}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!hideVoting && item.type === "multi-outcome" && (
            <View style={styles.multiContainer}>
              {item.options.map((opt) => (
                <View key={opt.id} style={styles.multiRow}>
                  <Text style={[styles.multiLabel, { color: theme.text }]}>
                    {opt.label}
                  </Text>
                  <View style={styles.multiRightGroup}>
                    <Text
                      style={[styles.multiPct, { color: theme.textSecondary }]}
                    >
                      {multiPct(opt.price)}%
                    </Text>
                    <TouchableOpacity
                      style={[styles.multiBtn, { backgroundColor: "#EDEBFF" }]}
                      onPress={() =>
                        onVote?.({
                          detailId: item.detailId,
                          optionId: opt.id,
                          actionType: "buy",
                          label: opt.label,
                          price: opt.price,
                          marketType: "multi-outcome",
                        })
                      }
                    >
                      <Text style={[styles.multiBtnText, { color: "#7C3AED" }]}>
                        Yes ₹ {(opt.price * 10).toFixed(1)}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.multiBtn, { backgroundColor: "#ECFDF5" }]}
                      onPress={() =>
                        onVote?.({
                          detailId: item.detailId,
                          optionId: opt.id,
                          actionType: "buy",
                          label: opt.label,
                          price: opt.price,
                          marketType: "multi-outcome",
                        })
                      }
                    >
                      <Text style={[styles.multiBtnText, { color: "#22C55E" }]}>
                        No ₹ {(10 - multiPct(opt.price)).toFixed(1)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.tradersRow}>
            {item.type === "binary" ? (
              <>
                <View style={styles.traderInfo}>
                  <View
                    style={[styles.traderDot, { backgroundColor: "#7C3AED" }]}
                  />
                  <Icon
                    name="people"
                    set="ionicons"
                    size={14}
                    color="#6B7280"
                  />
                  <Text
                    style={[styles.traderText, { color: theme.textSecondary }]}
                  >
                    {" "}
                    {yesPct}% traders
                  </Text>
                </View>
                <View style={styles.traderInfo}>
                  <View
                    style={[styles.traderDot, { backgroundColor: "#22C55E" }]}
                  />
                  <Icon
                    name="people"
                    set="ionicons"
                    size={14}
                    color="#6B7280"
                  />
                  <Text
                    style={[styles.traderText, { color: theme.textSecondary }]}
                  >
                    {" "}
                    {noPct}% traders
                  </Text>
                </View>
              </>
            ) : (
              <Text style={[styles.volume, { color: theme.textSecondary }]}>
                Vol: {item.totalVolume}
              </Text>
            )}
            <View style={styles.footerActions}>
              <TouchableOpacity onPress={handleShare} style={styles.actionIcon}>
                <Icon
                  name="share"
                  set="feather"
                  size={20}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleBookmark(item)}
                style={styles.actionIcon}
              >
                <Icon
                  name={isBookmarked(item.id) ? "bookmark" : "bookmark-outline"}
                  set="material"
                  size={20}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {item.description && (
          <LinearGradient
            colors={["#F8FAFC", "#E2E8F0"]}
            style={styles.readMoreFooter}
          >
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {item.description.substring(0, 60)}…{" "}
              <Text style={{ color: "#7C3AED", fontWeight: "600" }}>
                read more
              </Text>
            </Text>
          </LinearGradient>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
    position: "relative",
  },
  thumbnail: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    marginRight: 64,
  },
  subText: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  binaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  binaryBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  binaryBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  multiContainer: {
    marginBottom: 12,
  },
  multiRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  multiLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  multiRightGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  multiPct: {
    width: 40,
    fontSize: 12,
    textAlign: "center",
  },
  multiBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 8,
  },
  multiBtnText: {
    fontSize: 12,
    fontWeight: "600",
  },
  tradersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  traderInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  traderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  traderText: {
    fontSize: 12,
    marginLeft: 4,
  },
  volume: {
    fontSize: 12,
  },
  footerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionIcon: {
    marginLeft: 12,
  },
  readMoreFooter: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
});
