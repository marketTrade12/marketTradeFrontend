import { Colors } from '@/constants/Colors';
import { marketData } from '@/constants/data';
import { MarketDetail } from '@/constants/marketDetails';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MarketAboutSectionProps {
  marketDetail: MarketDetail;
}

export default function MarketAboutSection({ marketDetail }: MarketAboutSectionProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  // Get description from the new data structure if available
  const getMarketDescription = (): string => {
    const newMarket = marketData.find(m => m.id === marketDetail.id);
    if (newMarket) {
      return newMarket.description;
    }
    return `This is a prediction market about ${marketDetail.title.toLowerCase()}. Trade on the outcome by buying shares in different options.`;
  };

  const description = getMarketDescription();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        About this market
      </Text>
      
      <Text style={[styles.description, { color: theme.text }]}>
        {description}
      </Text>
      
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
            Resolution Source
          </Text>
          <Text style={[styles.infoValue, { color: theme.primary }]}>
            {marketDetail.resolver.name}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
            Market Close Date
          </Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {new Date(marketDetail.endDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
            Total Volume
          </Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {marketDetail.totalVolume}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    fontWeight: '400',
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
}); 