import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type SortOption = 'volume' | 'newest' | 'ending_soon' | 'price_change';

interface SortFilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortFilter({ currentSort, onSortChange }: SortFilterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const sortOptions: { key: SortOption; label: string; icon: string }[] = [
    { key: 'volume', label: 'Highest Volume', icon: 'trending-up' },
    { key: 'newest', label: 'Newest First', icon: 'clock' },
    { key: 'ending_soon', label: 'Ending Soon', icon: 'zap' },
    { key: 'price_change', label: 'Most Active', icon: 'activity' },
  ];

  const currentSortLabel = sortOptions.find(option => option.key === currentSort)?.label || 'Sort';

  const handleSortSelect = (sort: SortOption) => {
    onSortChange(sort);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.sortButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.7}
      >
        <Feather name="bar-chart-2" size={16} color={theme.textSecondary} />
        <Text style={[styles.sortButtonText, { color: theme.text }]} numberOfLines={1}>
          {currentSortLabel}
        </Text>
        <Feather name="chevron-down" size={16} color={theme.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setIsVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Sort Markets</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Feather name="x" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortOption,
                  currentSort === option.key && { backgroundColor: theme.primary + '15' }
                ]}
                onPress={() => handleSortSelect(option.key)}
              >
                <Feather 
                  name={option.icon as any} 
                  size={18} 
                  color={currentSort === option.key ? theme.primary : theme.textSecondary} 
                />
                <Text style={[
                  styles.sortOptionText,
                  { color: currentSort === option.key ? theme.primary : theme.text }
                ]}>
                  {option.label}
                </Text>
                {currentSort === option.key && (
                  <Feather name="check" size={18} color={theme.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    minWidth: 120,
    maxWidth: 150,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 12,
    padding: 0,
    width: '100%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  sortOptionText: {
    fontSize: 16,
    flex: 1,
  },
}); 