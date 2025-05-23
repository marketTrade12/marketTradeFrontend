import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../utils/authStore';

type IconSet = "feather" | "material" | "fontawesome" | "ionicons";

export default function Profile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { t, currentLanguage } = useLanguage();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const handleLanguagePress = () => {
    router.push('/(tabs)/language-selection');
  };

  const renderMenuItem = (iconName: string, iconSet: IconSet, titleKey: string, onPress?: () => void, showChevron = true) => (
    <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.border }]} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIconContainer, { backgroundColor: theme.primary + '20' }]}>
          <Icon name={iconName} set={iconSet} size={20} color={theme.primary} />
        </View>
        <Text style={[styles.menuText, { color: theme.text }]}>{t(titleKey)}</Text>
      </View>
      {showChevron && (
        <Icon name="chevron-right" set="feather" size={20} color={theme.textSecondary} />
      )}
    </TouchableOpacity>
  );

  const renderSocialIcon = (iconName: string, iconSet: IconSet) => (
    <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.surface }]}>
      <Icon name={iconName} set={iconSet} size={20} color={theme.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t('profile', 'Profile')}</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.surface }]}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                <Text style={styles.avatarText}>
                  {user?.phoneNumber ? user.phoneNumber.substring(0, 2) : 'BS'}
                </Text>
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.text }]}>Baba Sehgal</Text>
              <Text style={[styles.profilePhone, { color: theme.textSecondary }]}>
                +91 {user?.phoneNumber || '4816543211'}
              </Text>
              <Text style={[styles.profileBalance, { color: theme.textSecondary }]}>
                Bal - ₹222
              </Text>
            </View>
            
            <TouchableOpacity style={[styles.manageButton, { backgroundColor: theme.primary }]}>
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Section */}
        <View style={[styles.menuSection, { backgroundColor: theme.surface }]}>
          {renderMenuItem('credit-card', 'feather', 'add_fund')}
          {renderMenuItem('globe', 'feather', 'language', handleLanguagePress)}
          {renderMenuItem('settings', 'feather', 'settings')}
          {renderMenuItem('finger-print', 'ionicons', 'biometric_passcode')}
          {renderMenuItem('book-open', 'feather', 'learning_material')}
        </View>

        {/* Rewards Section */}
        <View style={[styles.menuSection, { backgroundColor: theme.surface }]}>
          {renderMenuItem('gift', 'feather', 'rewards')}
          {renderMenuItem('users', 'feather', 'invites_earn')}
          {renderMenuItem('star', 'feather', 'rate_app')}
        </View>

        {/* Legal Section */}
        <View style={[styles.menuSection, { backgroundColor: theme.surface }]}>
          {renderMenuItem('shield', 'feather', 'privacy_policy')}
          {renderMenuItem('file-text', 'feather', 'terms_conditions')}
          {renderMenuItem('log-out', 'feather', 'log_out', handleLogout)}
        </View>

        {/* Language Info */}
        <View style={[styles.languageInfo, { backgroundColor: theme.surface }]}>
          <View style={styles.languageInfoContent}>
            <Text style={[styles.languageInfoLabel, { color: theme.textSecondary }]}>
              {t('current_language', 'Current Language')}
            </Text>
            <View style={styles.currentLanguageDisplay}>
              <Text style={styles.languageFlag}>{currentLanguage.flag}</Text>
              <Text style={[styles.languageName, { color: theme.text }]}>
                {currentLanguage.nativeName}
              </Text>
            </View>
          </View>
        </View>

        {/* App Info & Social Links */}
        <View style={styles.footerSection}>
          <Text style={[styles.appVersion, { color: theme.textSecondary }]}>
            {t('app_version', 'App version')} 1.2.3
          </Text>
          
          <View style={styles.socialContainer}>
            {renderSocialIcon('send', 'feather')}
            {renderSocialIcon('twitter', 'feather')}
            {renderSocialIcon('message-circle', 'feather')}
            {renderSocialIcon('instagram', 'feather')}
          </View>
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
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    marginBottom: 2,
  },
  profileBalance: {
    fontSize: 14,
  },
  manageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  manageButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageInfo: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  languageInfoContent: {
    alignItems: 'center',
  },
  languageInfoLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  currentLanguageDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageFlag: {
    fontSize: 20,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  appVersion: {
    fontSize: 14,
    marginBottom: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 