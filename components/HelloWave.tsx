import { useTheme } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function HelloWave() {
  const theme = useTheme();
  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(0, { duration: 150 })
    ),
    4 // Run the animation 4 times
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  const styles = StyleSheet.create({
    text: {
      fontSize: theme.typography.h2.fontSize,
      lineHeight: theme.typography.h2.lineHeight,
      fontFamily: theme.typography.h2.fontFamily,
      fontWeight: theme.typography.h2.fontWeight,
    },
  });

  return <Animated.Text style={[styles.text, animatedStyle]}>👋</Animated.Text>;
}
