import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

interface OnboardingImageProps {
  type: "welcome" | "analytics" | "security";
}

export default function OnboardingImage({ type }: OnboardingImageProps) {
  const theme = useTheme();

  const renderWelcomeImage = () => (
    <Svg width="200" height="200" viewBox="0 0 200 200">
      <Circle cx="100" cy="100" r="70" fill={theme.colors.primary} />
      <Circle cx="100" cy="100" r="50" fill={theme.colors.primaryLight} />
      <Circle cx="100" cy="80" r="20" fill={theme.colors.textInverse} />
      <Circle cx="80" cy="100" r="15" fill={theme.colors.textInverse} />
      <Circle cx="120" cy="100" r="15" fill={theme.colors.textInverse} />
      <Circle cx="100" cy="120" r="15" fill={theme.colors.textInverse} />
    </Svg>
  );

  const renderAnalyticsImage = () => (
    <Svg width="200" height="200" viewBox="0 0 200 200">
      <Rect x="30" y="120" width="30" height="50" fill={theme.colors.primary} />
      <Rect
        x="70"
        y="90"
        width="30"
        height="80"
        fill={theme.colors.primaryLight}
      />
      <Rect
        x="110"
        y="70"
        width="30"
        height="100"
        fill={theme.colors.primary}
      />
      <Rect
        x="150"
        y="40"
        width="30"
        height="130"
        fill={theme.colors.primaryLight}
      />
      <Path
        d="M30,70 L180,30"
        stroke={theme.colors.textInverse}
        strokeWidth="4"
      />
      <Circle cx="30" cy="70" r="6" fill={theme.colors.textInverse} />
      <Circle cx="70" cy="60" r="6" fill={theme.colors.textInverse} />
      <Circle cx="110" cy="45" r="6" fill={theme.colors.textInverse} />
      <Circle cx="150" cy="35" r="6" fill={theme.colors.textInverse} />
      <Circle cx="180" cy="30" r="6" fill={theme.colors.textInverse} />
    </Svg>
  );

  const renderSecurityImage = () => (
    <Svg width="200" height="200" viewBox="0 0 200 200">
      <Path
        d="M100 40 L80 60 L80 140 Q80 160 100 170 Q120 160 120 140 L120 60 Z"
        fill={theme.colors.primary}
      />
      <Path
        d="M100 50 L85 65 L85 135 Q85 150 100 158 Q115 150 115 135 L115 65 Z"
        fill={theme.colors.primaryLight}
      />
      <Circle
        cx="100"
        cy="100"
        r="15"
        stroke={theme.colors.textInverse}
        strokeWidth="3"
        fill="none"
      />
      <Path
        d="M100 95 L100 105"
        stroke={theme.colors.textInverse}
        strokeWidth="3"
      />
    </Svg>
  );

  const getImageComponent = () => {
    switch (type) {
      case "welcome":
        return renderWelcomeImage();
      case "analytics":
        return renderAnalyticsImage();
      case "security":
        return renderSecurityImage();
      default:
        return renderWelcomeImage();
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {getImageComponent()}
    </View>
  );
}
