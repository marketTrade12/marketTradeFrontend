import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OnboardingImage from "../components/OnboardingImage";
import { useTheme } from "../hooks/useThemeColor";
import { useAuthStore } from "../utils/authStore";
import { markOnboardingComplete } from "../utils/onboardingUtils";

const { width, height } = Dimensions.get("window");

// Define the slide content
interface Slide {
  id: string;
  imageType: "welcome" | "analytics" | "security";
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: "1",
    imageType: "welcome",
    title: "Welcome to TradeX",
    description:
      "Your one-stop platform for all trading needs with real-time market data and insights.",
  },
  {
    id: "2",
    imageType: "analytics",
    title: "Advanced Analytics",
    description:
      "Get powerful tools and analytics to make informed trading decisions instantly.",
  },
  {
    id: "3",
    imageType: "security",
    title: "Secure Trading",
    description:
      "Trade with confidence knowing your data and investments are protected with top-level security.",
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const theme = useTheme();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current;
  // Floating animation for images
  const floatAnim = useRef(new Animated.Value(0)).current;
  // Progress bar animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(buttonOpacityAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation loop (only for image)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 10,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    ).start();
  }, []);

  // Update progress animation when index changes
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentIndex / (slides.length - 1),
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, [currentIndex]);

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <Animated.View
        style={[
          styles.slide,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          <OnboardingImage type={item.imageType} />
        </Animated.View>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.h1.fontFamily,
              fontSize: theme.typography.h1.fontSize,
              fontWeight: theme.typography.h1.fontWeight,
              lineHeight: theme.typography.h1.lineHeight,
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: theme.colors.textSecondary,
              fontFamily: theme.typography.body1.fontFamily,
              fontSize: theme.typography.body1.fontSize,
              fontWeight: theme.typography.body1.fontWeight,
              lineHeight: theme.typography.body1.lineHeight,
            },
          ]}
        >
          {item.description}
        </Text>
      </Animated.View>
    );
  };

  const handleGetStarted = async () => {
    console.log("Get Started button pressed!");
    alert("Button pressed!"); // Temporary debug alert

    try {
      // Mark onboarding as complete first
      await markOnboardingComplete();
      console.log("Onboarding marked as complete");

      // Check current user state
      const user = useAuthStore.getState().user;
      console.log("Current user state:", user);

      // Always go to login screen after onboarding since user needs to authenticate
      console.log("Navigating to login...");
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error in handleGetStarted:", error);
      // Fallback navigation
      router.replace("/(auth)/login");
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  // Calculate dynamic progress width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["33%", "100%"],
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    backgroundGlow: {
      position: "absolute",
      top: -300,
      left: width / 2 - 150,
      width: 300,
      height: 300,
      borderRadius: 150,
      backgroundColor: theme.colors.primary + "22",
      opacity: 0.5,
    },
    slide: {
      width,
      height,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: theme.spacing.lg,
    },
    title: {
      marginBottom: theme.spacing.md,
      textAlign: "center",
      marginTop: theme.spacing.xl,
    },
    description: {
      textAlign: "center",
      paddingHorizontal: theme.spacing.lg,
      letterSpacing: 0.3,
    },
    progressContainer: {
      position: "absolute",
      bottom: 160,
      left: theme.spacing.xl,
      right: theme.spacing.xl,
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: theme.borderRadius.xs,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.xs,
    },
    indicatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 120,
      width: "100%",
    },
    indicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.grey,
      marginHorizontal: theme.spacing.xs,
    },
    activeIndicator: {
      width: 16,
      backgroundColor: theme.colors.primary,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 50,
      left: theme.spacing.lg,
      right: theme.spacing.lg,
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: "center",
      ...theme.shadows.medium,
    },
    buttonText: {
      fontSize: theme.typography.button.fontSize,
      color: theme.colors.textInverse,
      fontWeight: theme.typography.button.fontWeight,
      fontFamily: theme.typography.button.fontFamily,
      letterSpacing: 0.5,
    },
    uiContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: theme.spacing.lg,
    },
  } as const);

  return (
    <View style={styles.container}>
      <StatusBar
        style={theme.isLight ? "dark" : "light"}
        backgroundColor={theme.colors.background}
        translucent
      />
      {/* Background gradient effect */}
      <View style={styles.backgroundGlow} />

      {/* FlatList Container */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          keyExtractor={(item) => item.id}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>

      {/* UI Elements */}
      <View style={styles.uiContainer} pointerEvents="box-none">
        {/* Modern progress bar */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>

        {/* Dot indicators */}
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGetStarted}
            activeOpacity={0.8}
            testID="get-started-button"
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
