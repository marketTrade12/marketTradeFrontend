import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { MarketIcon } from '@/constants/types';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MarketDetailHeaderProps {
  title: string;
  icon: MarketIcon;
  volume: string;
  endDate: string;
  onShare: () => void;
  onBookmark: () => void;
  onBack: () => void;
  isBookmarked?: boolean;
}

export default function MarketDetailHeader({
  title,
  icon,
  volume,
  endDate,
  onShare,
  onBookmark,
  onBack,
  isBookmarked = false,
}: MarketDetailHeaderProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const formatEndDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'TBD';
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.surface }]}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Icon name="arrow-left" set="feather" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Header Content */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <View style={styles.headerTop}>
          <View style={[styles.iconContainer, { backgroundColor: theme.primary + '15' }]}>
            <Icon
              name={icon.name}
              set={icon.set}
              size={32}
              color={theme.primary}
            />
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.background }]}
              onPress={onShare}
              activeOpacity={0.7}
            >
              <Icon name="share" set="feather" size={18} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                { 
                  backgroundColor: isBookmarked ? theme.primary + '15' : theme.background 
                }
              ]}
              onPress={onBookmark}
              activeOpacity={0.7}
            >
              <Icon 
                name={isBookmarked ? "bookmark" : "bookmark-outline"} 
                set="material" 
                size={18} 
                color={isBookmarked ? theme.primary : theme.text}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          {title}
        </Text>

        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Icon name="bar-chart-2" set="feather" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {volume} Vol.
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="calendar" set="feather" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              Ends {formatEndDate(endDate)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  backButtonContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 