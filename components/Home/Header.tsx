// components/Header.tsx
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from '../ui/Icon';

export default function Header() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Left - Logo */}
      <TouchableOpacity 
        style={styles.logoContainer}
        onPress={() => router.push('/(tabs)')}
      >
        <Text style={[styles.logoText, { color: theme.primary }]}>TradeX</Text>
      </TouchableOpacity>

      {/* Right - Actions */}
      <View style={styles.actions}>
        {/* Wallet Button */}
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.surface }]}
          onPress={() => router.push('/wallet')}
        >
          <Icon name="wallet" set="ionicons" size={18} color={theme.text} />
          <Text style={[styles.actionText, { color: theme.text }]}>$1,000</Text>
        </TouchableOpacity>

        {/* How to Play Button */}
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.surface }]}
          onPress={() => router.push('/how-to-play')}
        >
          <Icon name="help-circle" set="feather" size={18} color={theme.text} />
          <Text style={[styles.actionText, { color: theme.text }]}>How to Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
