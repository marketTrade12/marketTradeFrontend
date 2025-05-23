import { HapticTab } from "@/components/HapticTab";
import Icon from "@/components/ui/Icon";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "transparent",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          android: {
            position: "absolute",
            backgroundColor: "transparent",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" set="feather" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="watchlist"
        options={{
          title: "WatchList",
          tabBarIcon: ({ color }) => (
            <Icon name="bookmark" set="feather" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarIcon: ({ color }) => (
            <Icon name="trending-up" set="feather" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="user" set="feather" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarIcon: ({ color }) => (
            <Icon name="headphones" set="feather" size={28} color={color} />
          ),
        }}
      />

      {/* Hidden screens - accessible but not shown in tab bar */}
      <Tabs.Screen
        name="language-selection"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
    </Tabs>
  );
}
