import Icon from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isSelected: boolean;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    isSelected: true,
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    isSelected: false,
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    isSelected: false,
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    isSelected: false,
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    isSelected: false,
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    isSelected: false,
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    isSelected: false,
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    isSelected: false,
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    isSelected: false,
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    isSelected: false,
  },
];

export default function LanguageSelectionScreen() {
  const [selectedLanguages, setSelectedLanguages] = useState(languages);
  const router = useRouter();
  const theme = useTheme();

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguages((prev) =>
      prev.map((lang) => ({
        ...lang,
        isSelected: lang.code === code ? !lang.isSelected : lang.isSelected,
      }))
    );
  };

  const selectedCount = selectedLanguages.filter(
    (lang) => lang.isSelected
  ).length;

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
        },
        headerLeft: {
          flexDirection: "row",
          alignItems: "center",
        },
        backButton: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.surface,
          alignItems: "center",
          justifyContent: "center",
          marginRight: theme.spacing.sm,
        },
        headerTitle: {
          fontSize: theme.typography.h2.fontSize,
          fontWeight: theme.typography.h2.fontWeight,
          fontFamily: theme.typography.h2.fontFamily,
          color: theme.colors.text,
        },
        languageItem: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        flagContainer: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.surface,
          alignItems: "center",
          justifyContent: "center",
          marginRight: theme.spacing.md,
        },
        flag: {
          fontSize: theme.typography.h3.fontSize,
        },
        languageInfo: {
          flex: 1,
        },
        languageName: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        },
        nativeName: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
        },
        checkbox: {
          width: 24,
          height: 24,
          borderRadius: theme.borderRadius.sm,
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
        },
        checkboxSelected: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        checkboxUnselected: {
          backgroundColor: "transparent",
          borderColor: theme.colors.border,
        },
        sectionHeader: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.surface,
        },
        sectionTitle: {
          fontSize: theme.typography.subHeading.fontSize,
          fontWeight: theme.typography.subHeading.fontWeight,
          fontFamily: theme.typography.subHeading.fontFamily,
          color: theme.colors.textSecondary,
        },
        selectedSection: {
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.borderRadius.md,
          marginHorizontal: theme.spacing.md,
          marginVertical: theme.spacing.sm,
          ...theme.shadows.small,
        },
        selectedSectionHeader: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          gap: theme.spacing.sm,
        },
        selectedTitle: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
        },
        selectedBadge: {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.borderRadius.full,
          width: 20,
          height: 20,
          alignItems: "center",
          justifyContent: "center",
        },
        selectedBadgeText: {
          fontSize: theme.typography.caption.fontSize,
          fontWeight: theme.typography.caption.fontWeight,
          fontFamily: theme.typography.caption.fontFamily,
          color: theme.colors.textInverse,
        },
        selectedLanguages: {
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.md,
          gap: theme.spacing.sm,
        },
        selectedChip: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.primaryLight,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.md,
          gap: theme.spacing.xs,
        },
        selectedChipText: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.primary,
        },
        removeButton: {
          width: 16,
          height: 16,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
        },
        emptyState: {
          paddingVertical: theme.spacing.xl,
          alignItems: "center",
        },
        emptyText: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
          textAlign: "center",
        },
      }),
    [theme]
  );

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={dynamicStyles.languageItem}
      onPress={() => handleLanguageSelect(item.code)}
      activeOpacity={0.7}
    >
      <View style={dynamicStyles.flagContainer}>
        <Text style={dynamicStyles.flag}>{item.flag}</Text>
      </View>
      <View style={dynamicStyles.languageInfo}>
        <Text style={dynamicStyles.languageName}>{item.name}</Text>
        <Text style={dynamicStyles.nativeName}>{item.nativeName}</Text>
      </View>
      <View
        style={[
          dynamicStyles.checkbox,
          item.isSelected
            ? dynamicStyles.checkboxSelected
            : dynamicStyles.checkboxUnselected,
        ]}
      >
        {item.isSelected && (
          <Icon
            name="check"
            set="feather"
            size={16}
            color={theme.colors.textInverse}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSelectedLanguages = () => {
    const selected = selectedLanguages.filter((lang) => lang.isSelected);

    if (selected.length === 0) {
      return (
        <View style={dynamicStyles.emptyState}>
          <Text style={dynamicStyles.emptyText}>
            No languages selected yet. Choose your preferred languages from the
            list below.
          </Text>
        </View>
      );
    }

    return (
      <View style={dynamicStyles.selectedLanguages}>
        {selected.map((lang) => (
          <View key={lang.code} style={dynamicStyles.selectedChip}>
            <Text>{lang.flag}</Text>
            <Text style={dynamicStyles.selectedChipText}>{lang.name}</Text>
            <TouchableOpacity
              style={dynamicStyles.removeButton}
              onPress={() => handleLanguageSelect(lang.code)}
            >
              <Icon
                name="x"
                set="feather"
                size={12}
                color={theme.colors.textInverse}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar
        style={theme.isLight ? "dark" : "light"}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <View style={dynamicStyles.header}>
        <View style={dynamicStyles.headerLeft}>
          <TouchableOpacity
            style={dynamicStyles.backButton}
            onPress={() => router.back()}
          >
            <Icon
              name="arrow-left"
              set="feather"
              size={20}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          <Text style={dynamicStyles.headerTitle}>Language Settings</Text>
        </View>
      </View>

      {/* Selected Languages Section */}
      {selectedCount > 0 && (
        <View style={dynamicStyles.selectedSection}>
          <View style={dynamicStyles.selectedSectionHeader}>
            <Text style={dynamicStyles.selectedTitle}>Selected Languages</Text>
            <View style={dynamicStyles.selectedBadge}>
              <Text style={dynamicStyles.selectedBadgeText}>
                {selectedCount}
              </Text>
            </View>
          </View>
          {renderSelectedLanguages()}
        </View>
      )}

      {/* Available Languages Section */}
      <View style={dynamicStyles.sectionHeader}>
        <Text style={dynamicStyles.sectionTitle}>AVAILABLE LANGUAGES</Text>
      </View>

      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.code}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
