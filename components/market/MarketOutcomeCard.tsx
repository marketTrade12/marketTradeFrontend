import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { Outcome } from '@/constants/marketDetails';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MarketOutcomeCardProps {
  outcome: Outcome;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onTradePress: (optionLabel: string, actionType: "buy" | "sell", price?: number) => void;
  isLast: boolean;
  isBinaryMarket?: boolean;
  totalOutcomes?: number;
}

export default function MarketOutcomeCard({
  outcome,
  isExpanded,
  onToggleExpansion,
  onTradePress,
  isLast,
  isBinaryMarket = false,
  totalOutcomes = 1,
}: MarketOutcomeCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderBinaryMarket = () => (
    <View style={styles.binaryContainer}>
      <TouchableOpacity
        style={[styles.binaryOption, { backgroundColor: '#22C55E15' }]}
        onPress={() => onTradePress("Yes", "buy", outcome.yesPrice / 100)}
        activeOpacity={0.8}
      >
        <View style={styles.binaryHeader}>
          <Text style={[styles.binaryLabel, { color: '#22C55E' }]}>YES</Text>
          <Text style={[styles.binaryChance, { color: '#22C55E' }]}>
            {outcome.chance}%
          </Text>
        </View>
        <Text style={[styles.binaryPrice, { color: '#22C55E' }]}>
          {outcome.yesPrice}¢
        </Text>
        <Text style={[styles.binaryVolume, { color: theme.textSecondary }]}>
          {outcome.volume}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.binaryOption, { backgroundColor: '#DC262615' }]}
        onPress={() => onTradePress("No", "sell", outcome.noPrice / 100)}
        activeOpacity={0.8}
      >
        <View style={styles.binaryHeader}>
          <Text style={[styles.binaryLabel, { color: '#DC2626' }]}>NO</Text>
          <Text style={[styles.binaryChance, { color: '#DC2626' }]}>
            {100 - outcome.chance}%
          </Text>
        </View>
        <Text style={[styles.binaryPrice, { color: '#DC2626' }]}>
          {outcome.noPrice}¢
        </Text>
        <Text style={[styles.binaryVolume, { color: theme.textSecondary }]}>
          {outcome.volume}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderMultiOutcomeOption = () => (
    <View style={[styles.multiContainer, { backgroundColor: theme.surface }]}>
      {/* Option Header */}
      <View style={styles.multiHeader}>
        <Icon
          name={outcome.icon?.name ?? "circle"}
          set={outcome.icon?.set ?? "feather"}
          size={20}
          color={theme.icon}
        />
        <Text style={[styles.multiLabel, { color: theme.text }]}>
          {outcome.label}
        </Text>
        <Text style={[styles.multiChance, { color: theme.text }]}>
          {outcome.chance}%
        </Text>
      </View>

      {/* Volume info */}
      <Text style={[styles.multiVolume, { color: theme.textSecondary }]}>
        Volume: {outcome.volume}
      </Text>

      {/* Yes/No Buttons for Multi-outcome (Polymarket style) */}
      <View style={styles.multiButtonRow}>
        <TouchableOpacity
          style={[styles.multiYesButton, { backgroundColor: '#22C55E15', borderColor: '#22C55E' }]}
          onPress={() => onTradePress(`${outcome.label} - Yes`, "buy", outcome.yesPrice / 100)}
          activeOpacity={0.8}
        >
          <Text style={[styles.multiButtonLabel, { color: '#22C55E' }]}>YES</Text>
          <Text style={[styles.multiButtonPrice, { color: '#22C55E' }]}>
            {outcome.yesPrice}¢
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.multiNoButton, { backgroundColor: '#DC262615', borderColor: '#DC2626' }]}
          onPress={() => onTradePress(`${outcome.label} - No`, "sell", outcome.noPrice / 100)}
          activeOpacity={0.8}
        >
          <Text style={[styles.multiButtonLabel, { color: '#DC2626' }]}>NO</Text>
          <Text style={[styles.multiButtonPrice, { color: '#DC2626' }]}>
            {outcome.noPrice}¢
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[
      styles.container,
      {
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: theme.border,
      }
    ]}>
      {!isBinaryMarket && totalOutcomes > 1 && (
        <View style={styles.titleContainer}>
          <Text style={[styles.outcomeTitle, { color: theme.text }]}>
            {outcome.label}
          </Text>
        </View>
      )}

      {isBinaryMarket ? renderBinaryMarket() : renderMultiOutcomeOption()}

      {!isBinaryMarket && (
        <>
          <TouchableOpacity style={styles.orderToggle} onPress={onToggleExpansion}>
            <Text style={[styles.orderToggleText, { color: theme.primary }]}>
              Order Book
            </Text>
            <Icon
              name={isExpanded ? "chevron-up" : "chevron-down"}
              set="feather"
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>

          {isExpanded && (
            <View style={[styles.orderBook, { borderColor: theme.border }]}>
              <Text style={[styles.orderSectionTitle, { color: theme.text }]}>
                Bids
              </Text>
              {(outcome.orderBook?.bids ?? []).map((bid, i) => (
                <View key={i} style={styles.orderRow}>
                  <Text style={[styles.orderCol, { color: theme.text }]}>
                    {bid.price}¢
                  </Text>
                  <Text style={[styles.orderCol, { color: theme.text }]}>
                    {bid.amount}
                  </Text>
                </View>
              ))}
              
              <Text style={[styles.orderSectionTitle, { color: theme.text, marginTop: 12 }]}>
                Asks
              </Text>
              {(outcome.orderBook?.asks ?? []).map((ask, i) => (
                <View key={i} style={styles.orderRow}>
                  <Text style={[styles.orderCol, { color: theme.text }]}>
                    {ask.price}¢
                  </Text>
                  <Text style={[styles.orderCol, { color: theme.text }]}>
                    {ask.amount}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  outcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  
  binaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  binaryOption: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    minHeight: 100,
  },
  binaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  binaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  binaryChance: {
    fontSize: 12,
    fontWeight: '600',
  },
  binaryPrice: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  binaryVolume: {
    fontSize: 12,
    fontWeight: '500',
  },

  multiContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  multiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  multiLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  multiChance: {
    fontSize: 14,
    fontWeight: '600',
  },
  multiVolume: {
    fontSize: 12,
    fontWeight: '500',
  },

  multiButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  multiYesButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
    borderRadius: 8,
    alignItems: 'center',
  },
  multiNoButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DC2626',
    borderRadius: 8,
    alignItems: 'center',
  },
  multiButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  multiButtonPrice: {
    fontSize: 20,
    fontWeight: '700',
  },

  orderToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  orderToggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderBook: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  orderSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  orderCol: {
    flex: 1,
    fontSize: 12,
  },
}); 