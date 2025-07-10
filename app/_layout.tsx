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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { LanguageProvider } from "../contexts/LanguageContext";
import { useAuthStore } from "../utils/authStore";
import "../utils/firebaseConfig";
import { hasCompletedOnboarding } from "../utils/onboardingUtils";
import SplashScreen from "./SplashScreen";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);
  const segments = useSegments();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state._hasHydrated);

  // Handle initial loading of both auth and onboarding state
  useEffect(() => {
    async function initialize() {
      try {
        const onboardingComplete = await hasCompletedOnboarding();
        setIsOnboardingComplete(onboardingComplete);
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize:", error);
        // Set some defaults in case of error
        setIsOnboardingComplete(false);
        setIsInitialized(true);
      }
    }

    if (hydrated) {
      initialize();
    }
  }, [hydrated]);

  // Handle navigation after initialization
  useEffect(() => {
    if (!isInitialized || !loaded) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "onboarding";

    if (!isOnboardingComplete && !inOnboarding) {
      router.replace("/onboarding");
    } else if (isOnboardingComplete && !user?.isLoggedIn && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (
      isOnboardingComplete &&
      user?.isLoggedIn &&
      (inAuthGroup || inOnboarding)
    ) {
      router.replace("/(tabs)");
    }
  }, [isInitialized, loaded, isOnboardingComplete, segments, router, user]);

  // Show splash screen until everything is loaded
  if (!loaded || !isInitialized || !hydrated) {
    return <SplashScreen />;
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
              <Stack.Screen
                name="onboarding"
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </LanguageProvider>
  );
}
