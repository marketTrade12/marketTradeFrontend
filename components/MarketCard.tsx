import Icon from "@/components/ui/Icon";
import { MarketItem, TradeAction } from "@/constants/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useTheme } from "@/hooks/useThemeColor";
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
  onVote?: (action: TradeAction) => void;
  hideVoting?: boolean;
};

export default function MarketCard({ item, onVote, hideVoting }: Props) {
  const theme = useTheme();
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

  const styles = StyleSheet.create({
    wrapper: {
      marginHorizontal: theme.spacing.md,
      marginVertical: theme.spacing.sm,
    },
    card: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: "hidden",
      ...theme.shadows.small,
    },
    cardContent: {
      padding: theme.spacing.lg,
      position: "relative",
    },
    thumbnail: {
      position: "absolute",
      top: theme.spacing.lg,
      right: theme.spacing.lg,
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.sm,
    },
    title: {
      fontSize: theme.typography.subHeading.fontSize,
      fontFamily: theme.typography.subHeading.fontFamily,
      fontWeight: theme.typography.subHeading.fontWeight,
      lineHeight: 22,
      marginRight: 64,
      color: theme.colors.text,
    },
    subText: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
      marginBottom: theme.spacing.md,
    },
    binaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: theme.spacing.md,
    },
    binaryBtn: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      alignItems: "center",
      borderRadius: theme.borderRadius.md,
      marginHorizontal: theme.spacing.xs,
      backgroundColor: theme.colors.primaryLight,
    },
    binaryBtnText: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      fontWeight: "600",
      color: theme.colors.primary,
    },
    multiContainer: {
      marginBottom: theme.spacing.md,
    },
    multiRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: theme.spacing.xs,
    },
    multiLabel: {
      flex: 1,
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      fontWeight: "500",
      color: theme.colors.text,
    },
    multiRightGroup: {
      flexDirection: "row",
      alignItems: "center",
    },
    multiPct: {
      width: 40,
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      textAlign: "center",
      color: theme.colors.textSecondary,
    },
    multiBtn: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      marginLeft: theme.spacing.sm,
      backgroundColor: theme.colors.primaryLight,
    },
    multiBtnText: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      fontWeight: "600",
      color: theme.colors.primary,
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
      marginRight: theme.spacing.xs,
      backgroundColor: theme.colors.success,
    },
    traderText: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      marginLeft: theme.spacing.xs,
      color: theme.colors.textSecondary,
    },
    volume: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.textSecondary,
    },
    footerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    actionIcon: {
      marginLeft: theme.spacing.md,
    },
  });

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

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subText}>
            {item.category.toUpperCase()} • {formatTimeRemaining(item.endDate)}
          </Text>

          {!hideVoting && item.type === "binary" && (
            <View style={styles.binaryRow}>
              <TouchableOpacity
                style={styles.binaryBtn}
                onPress={() =>
                  onVote?.({
                    detailId: item.detailId,
                    optionId: item.yesOption.id,
                    actionType: "buy",
                    label: item.yesOption.label,
                    price: item.yesOption.price,
                    priceDisplay: item.yesOption.priceDisplay,
                    marketType: "binary",
                  })
                }
              >
                <Text style={styles.binaryBtnText}>
                  Yes ₹ {(item.yesOption.price * 10).toFixed(1)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.binaryBtn,
                  { backgroundColor: theme.colors.secondaryLight },
                ]}
                onPress={() =>
                  onVote?.({
                    detailId: item.detailId,
                    optionId: item.noOption.id,
                    actionType: "sell",
                    label: item.noOption.label,
                    price: item.noOption.price,
                    priceDisplay: item.noOption.priceDisplay,
                    marketType: "binary",
                  })
                }
              >
                <Text
                  style={[
                    styles.binaryBtnText,
                    { color: theme.colors.secondary },
                  ]}
                >
                  No ₹ {(item.noOption.price * 10).toFixed(1)}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!hideVoting && item.type === "multi-outcome" && (
            <View style={styles.multiContainer}>
              {item.options.slice(0, 3).map((opt: any, idx: number) => (
                <View key={opt.id} style={styles.multiRow}>
                  <Text style={styles.multiLabel}>{opt.label}</Text>
                  <View style={styles.multiRightGroup}>
                    <Text style={styles.multiPct}>{multiPct(opt.price)}%</Text>
                    <TouchableOpacity
                      style={styles.multiBtn}
                      onPress={() =>
                        onVote?.({
                          detailId: item.detailId,
                          actionType: "buy",
                          optionId: opt.id,
                          label: opt.label,
                          price: opt.price,
                          priceDisplay: opt.priceDisplay,
                          marketType: "multi-outcome",
                        })
                      }
                    >
                      <Text style={styles.multiBtnText}>Buy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.tradersRow}>
            <View style={styles.traderInfo}>
              <View style={styles.traderDot} />
              <Text style={styles.traderText}>{item.participants} traders</Text>
            </View>
            <Text style={styles.volume}>{item.totalVolume}</Text>
            <View style={styles.footerActions}>
              <TouchableOpacity
                onPress={() => toggleBookmark(item)}
                style={styles.actionIcon}
              >
                <Icon
                  name={isBookmarked(item.id) ? "bookmark" : "bookmark-o"}
                  set="fontawesome"
                  size={16}
                  color={
                    isBookmarked(item.id)
                      ? theme.colors.primary
                      : theme.colors.textSecondary
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare} style={styles.actionIcon}>
                <Icon
                  name="share"
                  set="feather"
                  size={16}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
