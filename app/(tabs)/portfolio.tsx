import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MainTab = 'active' | 'history';
type SubTab = 'open' | 'executed';

export default function Portfolio() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('active');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('open');

  const renderTabButton = (
    tab: MainTab,
    labelKey: string,
    isActive: boolean,
    onPress: () => void
  ) => (
    <Pressable
      style={[
        styles.mainTabButton,
        isActive && [styles.activeMainTab, { backgroundColor: theme.primary }]
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.mainTabText,
          { color: isActive ? '#FFFFFF' : theme.textSecondary }
        ]}
      >
        {t(labelKey)}
      </Text>
    </Pressable>
  );

  const renderSubTabButton = (
    tab: SubTab,
    label: string,
    isActive: boolean,
    onPress: () => void
  ) => (
    <Pressable
      style={[
        styles.subTabButton,
        isActive && [styles.activeSubTab, { borderBottomColor: theme.primary }]
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.subTabText,
          { color: isActive ? theme.primary : theme.textSecondary }
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  const renderInvestmentSummary = () => (
    <View style={[styles.summaryContainer, { backgroundColor: theme.surface }]}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>£ Invested</Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>£1,200</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>£ Current Value</Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>£1,350</Text>
        </View>
      </View>
      <View style={styles.gainsContainer}>
        <Text style={[styles.gainsLabel, { color: theme.textSecondary }]}>
          {t('gains', 'Gains (+)/(-)')}
        </Text>
        <View style={styles.gainsRow}>
          <Text style={[styles.gainsValue, { color: theme.success }]}>£150</Text>
          <Icon name="trending-up" set="feather" size={16} color={theme.success} />
          <Text style={[styles.gainsPercentage, { color: theme.success }]}>12.5%</Text>
        </View>
      </View>
    </View>
  );

  const renderOpenOrder = () => (
    <View style={[styles.orderCard, { backgroundColor: theme.surface }]}>
      <View style={styles.orderHeader}>
        <View style={styles.unmatched}>
          <Text style={styles.unmatchedText}>Unmatched</Text>
        </View>
        <Pressable style={styles.userIcon}>
          <Icon name="user" set="feather" size={16} color={theme.textSecondary} />
        </Pressable>
      </View>
      
      <Text style={[styles.orderTitle, { color: theme.text }]}>
        Will Bhedani win against Jkal Mewati?
      </Text>
      
      <View style={styles.priceRow}>
        <View style={[styles.priceBox, { backgroundColor: theme.success }]}>
          <Text style={styles.priceBoxText}>Ordered Price</Text>
          <Text style={styles.priceBoxValue}>Yes £2</Text>
        </View>
        <View style={[styles.priceBox, { backgroundColor: theme.success }]}>
          <Text style={styles.priceBoxText}>Current Price</Text>
          <Text style={styles.priceBoxValue}>Yes £2</Text>
        </View>
      </View>
    </View>
  );

  const renderExecutedOrder = () => (
    <View style={[styles.orderCard, { backgroundColor: theme.surface }]}>
      <View style={styles.orderHeader}>
        <View style={[styles.matched, { backgroundColor: theme.success }]}>
          <Text style={styles.matchedText}>Matched</Text>
        </View>
        <Text style={[styles.executedTime, { color: theme.textSecondary }]}>2 hours ago</Text>
      </View>
      
      <Text style={[styles.orderTitle, { color: theme.text }]}>
        Will ETH outperform BTC in 2025?
      </Text>
      
      <View style={styles.executedDetails}>
        <Text style={[styles.executedLabel, { color: theme.textSecondary }]}>Executed: Yes £1.50</Text>
        <Text style={[styles.executedResult, { color: theme.success }]}>+£0.30 (20%)</Text>
      </View>
    </View>
  );

  const renderHistoryOrder = () => (
    <View style={[styles.orderCard, { backgroundColor: theme.surface }]}>
      <View style={styles.historyHeader}>
        <Text style={[styles.historyDate, { color: theme.textSecondary }]}>Dec 15, 2024</Text>
        <View style={[styles.historyStatus, { backgroundColor: theme.success }]}>
          <Text style={styles.historyStatusText}>Completed</Text>
        </View>
      </View>
      
      <Text style={[styles.orderTitle, { color: theme.text }]}>
        Will India win ICC T20 World Cup 2025?
      </Text>
      
      <View style={styles.historyDetails}>
        <Text style={[styles.historyLabel, { color: theme.textSecondary }]}>
          Order: Yes £3.00 → Sold: £3.90
        </Text>
        <Text style={[styles.historyResult, { color: theme.success }]}>+£0.90 (30%)</Text>
      </View>
    </View>
  );

  const renderActiveContent = () => (
    <View style={styles.activeContent}>
      {renderInvestmentSummary()}
      
      {/* Sub Tabs */}
      <View style={[styles.subTabContainer, { borderBottomColor: theme.border }]}>
        {renderSubTabButton('open', 'Open', activeSubTab === 'open', () => setActiveSubTab('open'))}
        {renderSubTabButton('executed', 'Executed', activeSubTab === 'executed', () => setActiveSubTab('executed'))}
      </View>
      
      {/* Sub Tab Content */}
      <ScrollView 
        style={styles.subTabContent} 
        contentContainerStyle={styles.subTabContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeSubTab === 'open' ? (
          <View>
            {renderOpenOrder()}
            {renderOpenOrder()}
            {renderOpenOrder()}
            {renderOpenOrder()}
            {renderOpenOrder()}
          </View>
        ) : (
          <View>
            {renderExecutedOrder()}
            {renderExecutedOrder()}
            {renderExecutedOrder()}
            {renderExecutedOrder()}
            {renderExecutedOrder()}
          </View>
        )}
      </ScrollView>
    </View>
  );

  const renderHistoryContent = () => (
    <ScrollView style={styles.historyContent} showsVerticalScrollIndicator={false}>
      {renderHistoryOrder()}
      {renderHistoryOrder()}
      {renderHistoryOrder()}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {t('portfolio', 'Portfolio')}
        </Text>
      </View>
      
      {/* Main Tabs */}
      <View style={[styles.mainTabContainer, { backgroundColor: theme.surface }]}>
        {renderTabButton('active', 'active', activeMainTab === 'active', () => setActiveMainTab('active'))}
        {renderTabButton('history', 'history', activeMainTab === 'history', () => setActiveMainTab('history'))}
      </View>
      
      {/* Tab Content */}
      {activeMainTab === 'active' ? renderActiveContent() : renderHistoryContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  mainTabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeMainTab: {
    // backgroundColor will be set dynamically
  },
  mainTabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeContent: {
    flex: 1,
  },
  summaryContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gainsContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  gainsLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  gainsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gainsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gainsPercentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  subTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  subTabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeSubTab: {
    // borderBottomColor will be set dynamically
  },
  subTabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  subTabContent: {
    flex: 1,
    padding: 16,
  },
  subTabContentContainer: {
    gap: 12,
  },
  orderCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  unmatched: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unmatchedText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '600',
  },
  matched: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 22,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  priceBox: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
  },
  priceBoxText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 2,
  },
  priceBoxValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  executedTime: {
    fontSize: 12,
  },
  executedDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  executedLabel: {
    fontSize: 14,
  },
  executedResult: {
    fontSize: 14,
    fontWeight: '600',
  },
  historyContent: {
    flex: 1,
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 12,
  },
  historyStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historyStatusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyLabel: {
    fontSize: 14,
    flex: 1,
  },
  historyResult: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 