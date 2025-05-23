import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { MarketDetail } from '@/constants/marketDetails';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MarketDetailStatsProps {
  marketDetail: MarketDetail;
  timeRemaining: string;
}

export default function MarketDetailStats({ marketDetail, timeRemaining }: MarketDetailStatsProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const formatVolume = (volume: string): string => {
    // Extract number from volume string and format
    const match = volume.match(/[\d.,]+/);
    if (match) {
      const num = parseFloat(match[0].replace(/,/g, ''));
      if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
      } else if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
      }
    }
    return volume;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22C55E';
      case 'closed': return '#6B7280';
      case 'resolved': return '#3B82F6';
      default: return theme.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'closed': return 'Closed';
      case 'resolved': return 'Resolved';
      default: return 'Unknown';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* Market Status and Time */}
      <View style={styles.topRow}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor('active') }]} />
          <Text style={[styles.statusText, { color: theme.text }]}>
            {getStatusText('active')}
          </Text>
        </View>
        <Text style={[styles.timeRemaining, { color: theme.textSecondary }]}>
          {timeRemaining} remaining
        </Text>
      </View>

      {/* Market Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="bar-chart-2" set="feather" size={14} color={theme.textSecondary} />
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Volume
            </Text>
          </View>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {formatVolume(marketDetail.totalVolume)}
          </Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="users" set="feather" size={14} color={theme.textSecondary} />
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Outcomes
            </Text>
          </View>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {marketDetail.outcomes.length}
          </Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="calendar" set="feather" size={14} color={theme.textSecondary} />
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Ends
            </Text>
          </View>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {new Date(marketDetail.endDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Icon name="shield" set="feather" size={14} color={theme.textSecondary} />
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Resolver
            </Text>
          </View>
          <Text style={[styles.statValue, { color: theme.primary }]} numberOfLines={1}>
            {marketDetail.resolver.name}
          </Text>
        </View>
      </View>

      {/* Tags */}
      {marketDetail.tags && marketDetail.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {marketDetail.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.primary + '15' }]}>
              <Text style={[styles.tagText, { color: theme.primary }]}>
                #{tag}
              </Text>
            </View>
          ))}
          {marketDetail.tags.length > 3 && (
            <Text style={[styles.moreText, { color: theme.textSecondary }]}>
              +{marketDetail.tags.length - 3} more
            </Text>
          )}
        </View>
      )}
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeRemaining: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  moreText: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 