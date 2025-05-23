import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HowToPlayScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>How to Play</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Welcome to TradeX!
          </Text>
          <Text style={[styles.sectionText, { color: theme.textSecondary }]}>
            TradeX is a prediction market platform where you can trade on the outcome of future events.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Getting Started
          </Text>
          <Text style={[styles.sectionText, { color: theme.textSecondary }]}>
            1. Browse available markets{'\n'}
            2. Select a market you're interested in{'\n'}
            3. Choose your prediction (Yes/No or select an option){'\n'}
            4. Enter your trade amount{'\n'}
            5. Confirm your trade
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Market Types
          </Text>
          <Text style={[styles.sectionText, { color: theme.textSecondary }]}>
            Binary Markets: These have two possible outcomes - Yes or No{'\n\n'}
            Multiple Choice Markets: These have several possible outcomes to choose from
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Rewards
          </Text>
          <Text style={[styles.sectionText, { color: theme.textSecondary }]}>
            If your prediction is correct, you'll earn rewards based on the odds at the time of your trade.
          </Text>
        </View>
      </ScrollView>
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
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 