import { useTheme } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "surface" | "surfaceElevated" | "card";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();

  let backgroundColor: string;

  if (lightColor && darkColor) {
    backgroundColor = theme.isLight ? lightColor : darkColor;
  } else {
    switch (type) {
      case "surface":
        backgroundColor = theme.colors.surface;
        break;
      case "surfaceElevated":
        backgroundColor = theme.colors.surfaceElevated;
        break;
      case "card":
        backgroundColor = theme.colors.cardBackground;
        break;
      default:
        backgroundColor = theme.colors.background;
    }
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
