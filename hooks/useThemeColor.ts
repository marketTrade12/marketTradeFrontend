/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import {
  BorderRadius,
  Colors,
  Shadows,
  Spacing,
  Typography,
} from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

// New comprehensive theme hook
export function useTheme() {
  const colorScheme = useColorScheme() ?? "light";

  return {
    colors: Colors[colorScheme],
    typography: Typography,
    spacing: Spacing,
    borderRadius: BorderRadius,
    shadows: Shadows[colorScheme],
    isDark: colorScheme === "dark",
    isLight: colorScheme === "light",
  };
}

// Specific hooks for common theme elements
export function useColors() {
  const colorScheme = useColorScheme() ?? "light";
  return Colors[colorScheme];
}

export function useTypography() {
  return Typography;
}

export function useSpacing() {
  return Spacing;
}
