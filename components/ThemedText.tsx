import { useTheme } from "@/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "heading"
    | "subHeading"
    | "body1"
    | "body2"
    | "caption"
    | "button";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const color = lightColor
    ? theme.isLight
      ? lightColor
      : darkColor
    : theme.colors.text;

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "heading"
          ? [styles.heading, theme.typography.heading]
          : undefined,
        type === "subHeading"
          ? [styles.subHeading, theme.typography.subHeading]
          : undefined,
        type === "body1" ? [styles.body1, theme.typography.body1] : undefined,
        type === "body2" ? [styles.body2, theme.typography.body2] : undefined,
        type === "caption"
          ? [styles.caption, theme.typography.caption]
          : undefined,
        type === "button"
          ? [styles.button, theme.typography.button]
          : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  heading: {
    // Applied from theme.typography.heading
  },
  subHeading: {
    // Applied from theme.typography.subHeading
  },
  body1: {
    // Applied from theme.typography.body1
  },
  body2: {
    // Applied from theme.typography.body2
  },
  caption: {
    // Applied from theme.typography.caption
  },
  button: {
    // Applied from theme.typography.button
  },
});
