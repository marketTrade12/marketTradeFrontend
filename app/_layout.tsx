import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { LanguageProvider } from "../contexts/LanguageContext";
import { useAuthStore } from "../utils/authStore";
import "../utils/firebaseConfig";
import { hasCompletedOnboarding } from "../utils/onboardingUtils";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingComplete = await hasCompletedOnboarding();
      setIsOnboardingComplete(onboardingComplete);
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (isOnboardingComplete === null) {
      // Still loading
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "onboarding";
    const inProtectedGroup = segments[0] === "(tabs)";

    // Handle navigation based on auth status and onboarding completion
    if (!isOnboardingComplete && !inOnboarding) {
      // Redirect to onboarding if not completed
      router.replace("/onboarding");
    } else if (isOnboardingComplete && !user?.isLoggedIn && !inAuthGroup && !inOnboarding) {
      // User hasn't logged in yet, redirect to login
      router.replace("/(auth)/login");
    } else if (isOnboardingComplete && user?.isLoggedIn && (inAuthGroup || inOnboarding)) {
      // User is logged in but on auth or onboarding screens, redirect to home
      router.replace("/(tabs)");
    } else if (isOnboardingComplete && inOnboarding) {
      // Onboarding is complete but user is on onboarding screen
      router.replace(user?.isLoggedIn ? "/(tabs)" : "/(auth)/login");
    }
  }, [isOnboardingComplete, segments, router, user]);

  if (!loaded || isOnboardingComplete === null) {
    // Async font loading only occurs in development.
    // Show a loading indicator while checking onboarding status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A80F0" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </LanguageProvider>
  );
}
