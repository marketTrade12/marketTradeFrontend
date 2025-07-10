# Theme System Documentation

This document explains how to use the comprehensive theme system based on your Figma design specifications.

## 🎨 Color Palette

### Primary Colors (Purple)

- `primary`: #8B5CF6 - Main brand color
- `primaryDark`: #5B2C87 - Darker variant
- `primaryLight`: #F3E8FF - Light variant

### Secondary Colors (Green)

- `secondary`: #90EE90 - Light green
- `secondaryDark`: #4F8A10 - Dark green
- `secondaryLight`: #F0FDF4 - Very light green

### Grey Scale

- `black`: #000000
- `darkGrey`: #696969
- `grey`: #B0B0B0
- `lightGrey`: #F5F5F5
- `white`: #FFFFFF

## 🔤 Inter Font Configuration

The app uses the **Inter font family** as specified in your Figma design system. The following font files are included:

### Font Files

- `Inter-Regular.ttf` - Font weight 400
- `Inter-Medium.ttf` - Font weight 500
- `Inter-SemiBold.ttf` - Font weight 600
- `Inter-Bold.ttf` - Font weight 700

### Font Loading

Fonts are automatically loaded in the root layout (`app/_layout.tsx`) using Expo's `useFonts` hook:

```tsx
const [loaded] = useFonts({
  "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
  "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
});
```

### Platform Configuration

- **iOS**: Fonts are declared in `app.json` under `ios.infoPlist.UIAppFonts`
- **Android**: Fonts are automatically bundled via `assetBundlePatterns`
- **Web**: System fonts are used as fallback

## 📝 Typography

Based on Inter font family with specific weights and sizes:

- **Heading**: Inter-SemiBold, 18px
- **Sub-Heading**: Inter-Medium, 14px
- **Body 1**: Inter-Regular, 14px
- **Body 2**: Inter-Regular, 12px
- **Caption**: Inter-Regular, 10px

### Typography Usage

The typography system automatically uses the correct Inter font variant:

```tsx
// Correct font family is applied automatically
<ThemedText type="heading">Uses Inter-SemiBold</ThemedText>
<ThemedText type="subHeading">Uses Inter-Medium</ThemedText>
<ThemedText type="body1">Uses Inter-Regular</ThemedText>

// Manual typography access
const theme = useTheme();
<Text style={theme.typography.heading}>Manual styling</Text>
```

## 🚀 Usage Examples

### Using the Theme Hook

```tsx
import { useTheme } from "@/hooks/useThemeColor";

function MyComponent() {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.medium,
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.heading.fontSize,
          fontWeight: theme.typography.heading.fontWeight,
          fontFamily: theme.typography.heading.fontFamily, // Inter-SemiBold
        }}
      >
        Hello World
      </Text>
    </View>
  );
}
```

### Using ThemedText Component

```tsx
import { ThemedText } from "@/components/ThemedText";

function MyComponent() {
  return (
    <>
      <ThemedText type="heading">Main Title</ThemedText>
      <ThemedText type="subHeading">Subtitle</ThemedText>
      <ThemedText type="body1">Regular body text</ThemedText>
      <ThemedText type="caption">Small caption text</ThemedText>
    </>
  );
}
```

### Using ThemedView Component

```tsx
import { ThemedView } from "@/components/ThemedView";

function MyComponent() {
  return (
    <ThemedView type="card">
      <ThemedView type="surface">Content here</ThemedView>
    </ThemedView>
  );
}
```

### Using Gradients

```tsx
import { LinearGradient } from "expo-linear-gradient";
import { createGradient } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

function GradientComponent() {
  const colorScheme = useColorScheme() ?? "light";
  const purpleGradient = createGradient(colorScheme, "purple");

  return (
    <LinearGradient colors={purpleGradient} style={{ flex: 1 }}>
      Content
    </LinearGradient>
  );
}
```

### Using Specific Color Hooks

```tsx
import { useColors, useTypography, useSpacing } from "@/hooks/useThemeColor";

function OptimizedComponent() {
  const colors = useColors();
  const typography = useTypography();
  const spacing = useSpacing();

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        padding: spacing.lg,
      }}
    >
      <Text style={typography.heading}>Optimized Component</Text>
    </View>
  );
}
```

## 🎯 Theme Structure

### Colors

- Light and dark mode support
- Semantic color names (primary, secondary, success, error, etc.)
- Interactive states (hover, pressed, focus, disabled)
- Gradient definitions

### Typography

- **Inter font family** with proper font files
- Predefined text styles with correct font variants
- Font weights and sizes matching Figma specs
- Automatic fallbacks for web platform

### Spacing

- Consistent spacing scale (xs: 4, sm: 8, md: 16, etc.)

### Border Radius

- Consistent border radius scale

### Shadows

- Platform-appropriate shadows
- Light and dark mode variants

## 🔄 Migration Guide

To migrate existing components:

1. Replace hardcoded colors with theme colors
2. Replace hardcoded font sizes with typography styles
3. Use ThemedText for automatic Inter font application
4. Replace hardcoded spacing with theme spacing

### Before:

```tsx
<Text
  style={{
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 16,
  }}
>
  Title
</Text>
```

### After:

```tsx
<ThemedText type="heading" style={{ marginBottom: theme.spacing.md }}>
  Title
</ThemedText>
```

## 🎨 Gradient Types Available

- **Purple**: Light purple → Purple → Dark purple
- **Green**: Light green → Green → Dark green
- **Orange**: Light orange → Orange → Dark orange

## 📱 Dark Mode

All theme elements automatically adapt to dark mode. The theme hook provides `isDark` and `isLight` boolean flags for conditional styling.

## ✅ Best Practices

1. Always use theme colors instead of hardcoded hex values
2. Use typography styles for consistent Inter font rendering
3. Use spacing values for consistent layouts
4. Leverage ThemedText and ThemedView components
5. Use the gradient helper for consistent gradient implementations
6. Test components in both light and dark modes
7. **Use ThemedText** instead of manual Text styling for automatic Inter font application
