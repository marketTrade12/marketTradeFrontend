import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
export type MarketItem = {
  id: string;
  title: string;
  options: { label: string; value: string }[];
  volume: string;
  icon: {
    name: string;
    set: "feather" | "ionicons" | "material" | "fontawesome";
  };
  detailId: string;
};

type MarketCardProps = {
  item: MarketItem;
  onVote: (meta: {
    detailId: string;
    actionType: "buy" | "sell";
    label: string;
  }) => void;
};

export default function MarketCard({ item, onVote }: MarketCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Pressable
      style={[styles.card, { backgroundColor: theme.surface }]}
      onPress={() => router.push(`/market/${item.id}`)}
    >
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Icon
            name={item.icon.name}
            set={item.icon.set}
            size={20}
            color={theme.text}
          />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
      </View>

      <ScrollView
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {item.options.map((opt, i) => (
          <View key={i} style={styles.optionRow}>
            <Text style={[styles.optionLabel, { color: theme.textSecondary }]}>
              {opt.label}
            </Text>
            <Text style={[styles.optionValue, { color: theme.primary }]}>
              {opt.value}
            </Text>
            {/* <View style={styles.voteActions}>
              <TouchableOpacity
                style={[styles.voteBtn, { backgroundColor: "#22C55E20" }]}
                onPress={() =>
                  onVote({
                    detailId: item.detailId,
                    actionType: "buy",
                    label: opt.label,
                  })
                }
              >
                <Text style={[styles.voteText, { color: "#22C55E" }]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.voteBtn, { backgroundColor: "#DC262620" }]}
                onPress={() =>
                  onVote({
                    detailId: item.detailId,
                    actionType: "sell",
                    label: opt.label,
                  })
                }
              >
                <Text style={[styles.voteText, { color: "#DC2626" }]}>No</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        ))}
      </ScrollView>

      <Text style={[styles.volume, { color: theme.icon }]}>
        {item.volume} Vol.
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 8,
    maxHeight: 180,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  optionsContainer: {
    maxHeight: 120,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    gap: 8,
  },
  optionLabel: {
    fontSize: 14,
    flex: 1,
  },
  optionValue: {
    fontWeight: "bold",
    fontSize: 14,
    minWidth: 40,
    textAlign: "right",
  },
  voteActions: {
    flexDirection: "row",
    gap: 6,
  },
  voteBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  voteText: {
    fontWeight: "600",
    fontSize: 13,
  },
  volume: {
    fontSize: 13,
    marginTop: 8,
  },
});
