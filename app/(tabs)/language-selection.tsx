import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LanguageSelection() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { currentLanguage, availableLanguages, changeLanguage, t, loading } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageSelect = async (language: Language) => {
    if (language.code === currentLanguage.code) {
      router.back();
      return;
    }

    try {
      setIsChanging(true);
      await changeLanguage(language.code);
      router.back();
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const renderLanguageItem = ({ item }: { item: Language }) => {
    const isSelected = item.code === currentLanguage.code;
    
    return (
      <Pressable
        style={[
          styles.languageItem,
          { 
            backgroundColor: theme.surface,
            borderColor: isSelected ? theme.primary : theme.border
          }
        ]}
        onPress={() => handleLanguageSelect(item)}
        disabled={isChanging}
      >
        <View style={styles.languageContent}>
          <Text style={styles.flag}>{item.flag}</Text>
          <View style={styles.languageInfo}>
            <Text style={[styles.languageName, { color: theme.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.nativeName, { color: theme.textSecondary }]}>
              {item.nativeName}
            </Text>
          </View>
        </View>
        
        <View style={styles.languageActions}>
          {isSelected && (
            <View style={[styles.selectedBadge, { backgroundColor: theme.primary }]}>
              <Icon name="check" set="feather" size={16} color="#FFFFFF" />
            </View>
          )}
          {isChanging && item.code === currentLanguage.code && (
            <ActivityIndicator size="small" color={theme.primary} />
          )}
        </View>
      </Pressable>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t('current_language', 'Current Language')}
      </Text>
      <View style={[styles.currentLanguageCard, { backgroundColor: theme.surface }]}>
        <Text style={styles.currentFlag}>{currentLanguage.flag}</Text>
        <View style={styles.currentLanguageInfo}>
          <Text style={[styles.currentLanguageName, { color: theme.text }]}>
            {currentLanguage.name}
          </Text>
          <Text style={[styles.currentNativeName, { color: theme.textSecondary }]}>
            {currentLanguage.nativeName}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>
        {t('select_language', 'Select Language')}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading languages...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-left" set="feather" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {t('language', 'Language')}
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* Language List */}
      <FlatList
        data={availableLanguages}
        keyExtractor={(item) => item.code}
        renderItem={renderLanguageItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  listContainer: {
    padding: 16,
  },
  headerSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  currentLanguageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  currentFlag: {
    fontSize: 32,
  },
  currentLanguageInfo: {
    flex: 1,
  },
  currentLanguageName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  currentNativeName: {
    fontSize: 14,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  flag: {
    fontSize: 24,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  nativeName: {
    fontSize: 14,
  },
  languageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 8,
  },
}); 