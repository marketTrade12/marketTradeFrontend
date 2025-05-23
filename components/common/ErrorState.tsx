import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
  retryText?: string;
  backText?: string;
}

export default function ErrorState({ 
  message,
  onRetry,
  onBack,
  retryText = "Try Again",
  backText = "Go Back"
}: ErrorStateProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon 
          name="alert-circle" 
          set="feather" 
          size={64} 
          color={theme.textSecondary} 
        />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>
        Oops! Something went wrong
      </Text>
      <Text style={[styles.message, { color: theme.textSecondary }]}>
        {message}
      </Text>
      
      <View style={styles.buttonContainer}>
        {onRetry && (
          <TouchableOpacity
            style={[styles.button, styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={onRetry}
            activeOpacity={0.8}
          >
            <Icon name="refresh-cw" set="feather" size={16} color="#FFFFFF" />
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
              {retryText}
            </Text>
          </TouchableOpacity>
        )}
        
        {onBack && (
          <TouchableOpacity
            style={[styles.button, styles.backButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Icon name="arrow-left" set="feather" size={16} color={theme.text} />
            <Text style={[styles.buttonText, { color: theme.text }]}>
              {backText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  retryButton: {
    // Primary button styling applied via backgroundColor
  },
  backButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 