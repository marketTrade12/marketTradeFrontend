import { useTheme } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export type SortOption = "volume" | "newest" | "ending_soon" | "price_change";

interface SortFilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortFilter({
  currentSort,
  onSortChange,
}: SortFilterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  const sortOptions: { key: SortOption; label: string; icon: string }[] = [
    { key: "volume", label: "Highest Volume", icon: "trending-up" },
    { key: "newest", label: "Newest First", icon: "clock" },
    { key: "ending_soon", label: "Ending Soon", icon: "zap" },
    { key: "price_change", label: "Most Active", icon: "activity" },
  ];

  const currentSortLabel =
    sortOptions.find((option) => option.key === currentSort)?.label || "Sort";

  const handleSortSelect = (sort: SortOption) => {
    onSortChange(sort);
    setIsVisible(false);
  };

  const styles = StyleSheet.create({
    sortButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.xs,
      minWidth: 120,
      ...theme.shadows.small,
    },
    sortButtonText: {
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.body2.fontFamily,
      color: theme.colors.text,
      flex: 1,
    },
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.xl,
    },
    modal: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      width: "100%",
      maxWidth: 300,
      ...theme.shadows.large,
    },
    modalTitle: {
      fontSize: theme.typography.subHeading.fontSize,
      fontFamily: theme.typography.subHeading.fontFamily,
      fontWeight: theme.typography.subHeading.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      textAlign: "center",
    },
    optionButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.xs,
      gap: theme.spacing.sm,
    },
    selectedOption: {
      backgroundColor: theme.colors.primaryLight,
    },
    optionText: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      color: theme.colors.text,
      flex: 1,
    },
    selectedOptionText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });

  return (
    <>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.7}
      >
        <Feather
          name="bar-chart-2"
          size={16}
          color={theme.colors.textSecondary}
        />
        <Text style={styles.sortButtonText} numberOfLines={1}>
          {currentSortLabel}
        </Text>
        <Feather
          name="chevron-down"
          size={16}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsVisible(false)}>
          <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Sort by</Text>

            {sortOptions.map((option) => {
              const isSelected = option.key === currentSort;
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => handleSortSelect(option.key)}
                  activeOpacity={0.7}
                >
                  <Feather
                    name={option.icon as any}
                    size={16}
                    color={
                      isSelected
                        ? theme.colors.primary
                        : theme.colors.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <Feather
                      name="check"
                      size={16}
                      color={theme.colors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
