// Theme based on Figma Design System
// Color Palette and Typography specifications

export const Colors = {
  light: {
    // Primary Colors (Purple)
    primary: "#8B5CF6", // Primary purple
    primaryDark: "#5B2C87", // Frame 254 (darker purple)
    primaryLight: "#F3E8FF", // Frame 255 (light purple)

    // Secondary Colors (Green)
    secondary: "#90EE90", // Light green
    secondaryDark: "#4F8A10", // Dark green
    secondaryLight: "#F0FDF4", // Very light green

    // Grey Scale
    black: "#000000",
    darkGrey: "#696969", // Frame 269
    grey: "#B0B0B0", // Frame 266
    lightGrey: "#F5F5F5", // Frame 267
    white: "#FFFFFF", // Frame 271

    // Background & Surface
    background: "#FFFFFF",
    surface: "#F9FAFB",
    surfaceElevated: "#FFFFFF",

    // Text Colors
    text: "#000000",
    textSecondary: "#696969",
    textMuted: "#B0B0B0",
    textInverse: "#FFFFFF",

    // Border & Divider
    border: "#E5E7EB",
    divider: "#F0F0F0",

    // Status Colors
    success: "#4F8A10",
    error: "#DC2626",
    warning: "#F59E0B",
    info: "#3B82F6",

    // Gradient Colors
    gradientPurple: {
      start: "#F3E8FF", // Frame 250
      middle: "#8B5CF6", // Frame 251
      end: "#5B2C87",
    },
    gradientGreen: {
      start: "#F0FDF4", // Frame 258
      middle: "#90EE90", // Frame 261
      end: "#4F8A10",
    },
    gradientOrange: {
      start: "#FED7AA", // Frame 253
      middle: "#FB923C", // Frame 252
      end: "#EA580C",
    },

    // Interactive States
    hover: "#F3F4F6",
    pressed: "#E5E7EB",
    focus: "#8B5CF6",
    disabled: "#F9FAFB",

    // Tab & Navigation
    tabIconDefault: "#B0B0B0",
    tabIconSelected: "#8B5CF6",
    tabBackground: "#FFFFFF",

    // Card & Components
    cardBackground: "#FFFFFF",
    cardShadow: "rgba(0, 0, 0, 0.1)",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  dark: {
    // Primary Colors (Purple)
    primary: "#8B5CF6",
    primaryDark: "#5B2C87",
    primaryLight: "#3730A3",

    // Secondary Colors (Green)
    secondary: "#4ADE80",
    secondaryDark: "#16A34A",
    secondaryLight: "#15803D",

    // Grey Scale
    black: "#FFFFFF", // Inverted for dark theme
    darkGrey: "#E5E7EB",
    grey: "#6B7280",
    lightGrey: "#374151",
    white: "#111827", // Dark background

    // Background & Surface
    background: "#111827",
    surface: "#1F2937",
    surfaceElevated: "#374151",

    // Text Colors
    text: "#F9FAFB",
    textSecondary: "#D1D5DB",
    textMuted: "#9CA3AF",
    textInverse: "#111827",

    // Border & Divider
    border: "#374151",
    divider: "#4B5563",

    // Status Colors
    success: "#22C55E",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",

    // Gradient Colors (adjusted for dark theme)
    gradientPurple: {
      start: "#3730A3",
      middle: "#8B5CF6",
      end: "#A855F7",
    },
    gradientGreen: {
      start: "#15803D",
      middle: "#22C55E",
      end: "#4ADE80",
    },
    gradientOrange: {
      start: "#EA580C",
      middle: "#FB923C",
      end: "#FCD34D",
    },

    // Interactive States
    hover: "#374151",
    pressed: "#4B5563",
    focus: "#8B5CF6",
    disabled: "#1F2937",

    // Tab & Navigation
    tabIconDefault: "#9CA3AF",
    tabIconSelected: "#8B5CF6",
    tabBackground: "#1F2937",

    // Card & Components
    cardBackground: "#1F2937",
    cardShadow: "rgba(0, 0, 0, 0.3)",
    overlay: "rgba(0, 0, 0, 0.7)",
  },
};

// Typography System based on Figma specs
export const Typography = {
  // Font Family
  fontFamily: {
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
    bold: "Inter-Bold",
    fallback: "system-ui, -apple-system, sans-serif",
  },

  // Font Weights (numeric values for React Native)
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semiBold: "600" as const,
    bold: "700" as const,
  },

  // Font Sizes & Line Heights
  heading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600" as const, // semi-bold
    fontFamily: "Inter-SemiBold",
  },

  subHeading: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500" as const, // medium
    fontFamily: "Inter-Medium",
  },

  body1: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const, // regular
    fontFamily: "Inter-Regular",
  },

  body2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400" as const, // regular
    fontFamily: "Inter-Regular",
  },

  caption: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "400" as const, // regular
    fontFamily: "Inter-Regular",
  },

  // Additional Typography Variants
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
    fontFamily: "Inter-Bold",
  },

  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600" as const,
    fontFamily: "Inter-SemiBold",
  },

  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
    fontFamily: "Inter-SemiBold",
  },

  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500" as const,
    fontFamily: "Inter-Medium",
  },

  buttonSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500" as const,
    fontFamily: "Inter-Medium",
  },
};

// Spacing System
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border Radius
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Shadows
export const Shadows = {
  light: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
  dark: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

// Export default theme object
export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
};

// Helper function to create gradients
export const createGradient = (
  colorScheme: "light" | "dark",
  type: "purple" | "green" | "orange"
) => {
  const gradients = Colors[colorScheme];

  switch (type) {
    case "purple":
      return [
        gradients.gradientPurple.start,
        gradients.gradientPurple.middle,
        gradients.gradientPurple.end,
      ];
    case "green":
      return [
        gradients.gradientGreen.start,
        gradients.gradientGreen.middle,
        gradients.gradientGreen.end,
      ];
    case "orange":
      return [
        gradients.gradientOrange.start,
        gradients.gradientOrange.middle,
        gradients.gradientOrange.end,
      ];
    default:
      return [
        gradients.gradientPurple.start,
        gradients.gradientPurple.middle,
        gradients.gradientPurple.end,
      ];
  }
};
