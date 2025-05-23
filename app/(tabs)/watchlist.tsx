import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import MarketCard from '@/components/MarketCard';
import LoadingState from '@/components/common/LoadingState';

// Hooks & Constants
import { Colors } from '@/constants/Colors';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function WatchlistScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { bookmarkedMarkets, loading, toggleBookmark } = useBookmarks();

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <LoadingState message="Loading your watchlist..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Watchlist</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {bookmarkedMarkets.length} saved markets
        </Text>
      </View>

      <FlatList
        data={bookmarkedMarkets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MarketCard 
            item={item}
            hideVoting={true}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No bookmarked markets
            </Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Markets you bookmark will appear here
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
