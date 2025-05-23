import Icon from "@/components/ui/Icon";
import { Colors } from "@/constants/Colors";
import { MarketItem, TradeAction } from "@/constants/types";
import { useBookmarks } from '@/hooks/useBookmarks';
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MarketCardProps = {
  item: MarketItem;
  onVote?: (meta: TradeAction) => void;
  hideVoting?: boolean;
};

export default function MarketCard({ item, onVote, hideVoting }: MarketCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const formatPriceChange = (change: number): { text: string; color: string } => {
    const sign = change >= 0 ? '+' : '';
    const percentage = (change * 100).toFixed(1);
    return {
      text: `${sign}${percentage}%`,
      color: change >= 0 ? '#22C55E' : '#DC2626'
    };
  };

  const formatTimeRemaining = (endDate: string): string => {
    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Ended";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day";
    if (diffDays < 30) return `${diffDays} days`;
    
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "1 month" : `${months} months`;
  };

  const handleShare = async () => {
    try {
      let shareMessage = `Check out this market on TradeX:\n\n${item.title}\n\nCurrent Odds:\n`;
      if (item.type === 'binary') {
        shareMessage = shareMessage + `Yes: ${item.yesOption.priceDisplay}\nNo: ${item.noOption.priceDisplay}`;
      } else {
        shareMessage = shareMessage + item.options.map(opt => `${opt.label}: ${opt.priceDisplay}`).join('\n');
      }
      shareMessage = shareMessage + `\n\nVolume: ${item.totalVolume}`;

      await Share.share({
        message: shareMessage,
        title: item.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handlePress = () => {
    router.push(`/market/${item.detailId}`);
  };

  const renderBinaryMarket = () => {
    const market = item as Extract<MarketItem, { type: 'binary' }>;
    const yesChange = formatPriceChange(market.yesOption.priceChange24h);
    const noChange = formatPriceChange(market.noOption.priceChange24h);

    return (
      <View style={styles.optionsContainer}>
        <View style={styles.binaryContainer}>
          <TouchableOpacity
            style={[styles.binaryOption, { backgroundColor: '#22C55E15' }]}
            onPress={() => onVote?.({
              detailId: market.detailId,
              optionId: market.yesOption.id,
              actionType: 'buy',
              label: market.yesOption.label,
              price: market.yesOption.price,
              marketType: 'binary'
            })}
          >
            <View style={styles.optionHeader}>
              <Text style={[styles.optionLabel, { color: '#22C55E', fontWeight: '600' }]}>
                YES
              </Text>
              <Text style={[styles.priceChange, { color: yesChange.color }]}>
                {yesChange.text}
              </Text>
            </View>
            <Text style={[styles.optionPrice, { color: '#22C55E' }]}>
              {market.yesOption.priceDisplay}
            </Text>
            <Text style={[styles.optionVolume, { color: theme.textSecondary }]}>
              {market.yesOption.volume24h}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.binaryOption, { backgroundColor: '#DC262615' }]}
            onPress={() => onVote?.({
              detailId: market.detailId,
              optionId: market.noOption.id,
              actionType: 'buy',
              label: market.noOption.label,
              price: market.noOption.price,
              marketType: 'binary'
            })}
          >
            <View style={styles.optionHeader}>
              <Text style={[styles.optionLabel, { color: '#DC2626', fontWeight: '600' }]}>
                NO
              </Text>
              <Text style={[styles.priceChange, { color: noChange.color }]}>
                {noChange.text}
              </Text>
            </View>
            <Text style={[styles.optionPrice, { color: '#DC2626' }]}>
              {market.noOption.priceDisplay}
            </Text>
            <Text style={[styles.optionVolume, { color: theme.textSecondary }]}>
              {market.noOption.volume24h}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMultiOutcomeMarket = () => {
    const market = item as Extract<MarketItem, { type: 'multi-outcome' }>;

    return (
      <ScrollView
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {market.options.map((option) => {
          const priceChange = formatPriceChange(option.priceChange24h);
          return (
            <TouchableOpacity
              key={option.id}
              style={styles.multiOptionRow}
              onPress={() => onVote?.({
                detailId: market.detailId,
                optionId: option.id,
                actionType: 'buy',
                label: option.label,
                price: option.price,
                marketType: 'multi-outcome'
              })}
            >
              <View style={styles.multiOptionContent}>
                <Text style={[styles.multiOptionLabel, { color: theme.text }]}>
                  {option.label}
                </Text>
                <View style={styles.multiOptionRight}>
                  <Text style={[styles.multiOptionPrice, { color: theme.primary }]}>
                    {option.priceDisplay}
                  </Text>
                  <Text style={[styles.priceChange, { color: priceChange.color }]}>
                    {priceChange.text}
                  </Text>
                </View>
              </View>
              <Text style={[styles.optionVolume, { color: theme.textSecondary }]}>
                {option.volume24h} • {option.liquidity} liquidity
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const volumeChange = formatPriceChange(item.volumeChange24h / 100);
  const timeRemaining = formatTimeRemaining(item.endDate);

  return (
    <Pressable
      style={[styles.card, { backgroundColor: theme.surface }]}
      onPress={handlePress}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrapper}>
            <Icon
              name={item.icon.name}
              set={item.icon.set}
              size={20}
              color={theme.text}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
            <View style={styles.metadataRow}>
              <Text style={[styles.category, { color: theme.primary }]}>
                {item.category.toUpperCase()}
              </Text>
              <Text style={[styles.timeRemaining, { color: theme.textSecondary }]}>
                • {timeRemaining}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { 
            backgroundColor: item.status === 'active' ? '#22C55E' : theme.textSecondary 
          }]} />
        </View>
      </View>

      {!hideVoting && (item.type === 'binary' ? renderBinaryMarket() : renderMultiOutcomeMarket())}

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={[styles.volume, { color: theme.text }]}>
            {item.totalVolume} Vol.
          </Text>
          <Text style={[styles.volumeChange, { color: volumeChange.color }]}>
            {volumeChange.text}
          </Text>
        </View>
        <View style={styles.footerRight}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.background }]}
            onPress={handleShare}
          >
            <Icon name="share" set="feather" size={16} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              { backgroundColor: isBookmarked(item.id) ? theme.primary + '15' : theme.background }
            ]}
            onPress={() => toggleBookmark(item)}
          >
            <Icon 
              name={isBookmarked(item.id) ? "bookmark" : "bookmark-outline"} 
              set="material" 
              size={16} 
              color={isBookmarked(item.id) ? theme.primary : theme.text} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    margin: 8,
    maxHeight: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 4,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeRemaining: {
    fontSize: 12,
  },
  statusBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  optionsContainer: {
    maxHeight: 160,
    marginBottom: 16,
  },
  binaryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  binaryOption: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    minHeight: 80,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  optionPrice: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  optionVolume: {
    fontSize: 12,
  },
  priceChange: {
    fontSize: 11,
    fontWeight: '600',
  },
  multiOptionRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  multiOptionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  multiOptionLabel: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  multiOptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  multiOptionPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  volume: {
    fontSize: 14,
    fontWeight: '600',
  },
  volumeChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
