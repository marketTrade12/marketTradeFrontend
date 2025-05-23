import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { MarketCategory } from '@/constants/types';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CategoryType = 'all' | MarketCategory;

interface CategoryFilterProps {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onCategorySelect: (category: CategoryType) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'all':
      return { name: 'grid', set: 'feather' };
    case 'sports':
      return { name: 'activity', set: 'feather' };
    case 'politics':
      return { name: 'flag', set: 'feather' };
    case 'crypto':
      return { name: 'trending-up', set: 'feather' };
    case 'economics':
      return { name: 'bar-chart', set: 'feather' };
    case 'technology':
      return { name: 'smartphone', set: 'feather' };
    case 'entertainment':
      return { name: 'film', set: 'feather' };
    case 'business':
      return { name: 'briefcase', set: 'feather' };
    case 'science':
      return { name: 'zap', set: 'feather' };
    case 'news':
      return { name: 'globe', set: 'feather' };
    default:
      return { name: 'circle', set: 'feather' };
  }
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'All Markets';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        style={styles.scrollView}
      >
        <View style={styles.tabContainer}>
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category;
            const icon = getCategoryIcon(category);
            const isFirst = index === 0;
            const isLast = index === categories.length - 1;
            
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.surface,
                    borderTopLeftRadius: isFirst ? 12 : 0,
                    borderBottomLeftRadius: isFirst ? 12 : 0,
                    borderTopRightRadius: isLast ? 12 : 0,
                    borderBottomRightRadius: isLast ? 12 : 0,
                  },
                ]}
                onPress={() => onCategorySelect(category)}
              >
                <Icon
                  name={icon.name}
                  set={icon.set as any}
                  size={16}
                  color={isSelected ? '#FFFFFF' : theme.text}
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isSelected ? '#FFFFFF' : theme.text,
                    },
                  ]}
                >
                  {formatCategoryName(category)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    paddingVertical: 8,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 44,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
}); 