// pages/index.tsx
import Header from "@/components/Home/Header";
import MarketCard from "@/components/MarketCard";
import SearchBar from "@/components/SearchBar";
import TradeBottomSheet from "@/components/TradeBottomSheet";
import { Colors } from "@/constants/Colors";
import { marketData } from "@/constants/data";
import { useBanners } from "@/hooks/useBanners";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const banners = useBanners();
  const theme = Colors[colorScheme ?? "light"];
  const sheetRef = useRef<BottomSheetModal>(null);

  const [tradeMeta, setTradeMeta] = useState<{
    detailId: string;
    label: string;
    actionType: "buy" | "sell";
  } | null>(null);

  useEffect(() => {
    if (tradeMeta) {
      sheetRef.current?.present();
    }
  }, [tradeMeta]);

  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.statusBarBackground,
          { backgroundColor: theme.background },
        ]}
      >
        <StatusBar style="dark" translucent />
      </View>

      <Header />
      <SearchBar />

      {/* Banner carousel via FlatList */}
      <FlatList
        data={banners}
        keyExtractor={(b) => b.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={{
              width: SCREEN_WIDTH,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push(`/market/${item.id}`)}
          >
            <Image
              source={{ uri: item.src }}
              style={[styles.bannerImage, { width: SCREEN_WIDTH - 32 }]}
              resizeMode="cover"
            />
          </Pressable>
        )}
        style={styles.bannerList}
      />

      {/* Markets list */}
      <FlatList
        data={marketData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MarketCard item={item} onVote={(meta) => setTradeMeta(meta)} />
        )}
        contentContainerStyle={styles.marketList}
      />

      {/* Trade bottom sheet */}
      {tradeMeta && (
        <TradeBottomSheet
          ref={sheetRef}
          detailId={tradeMeta.detailId}
          actionType={tradeMeta.actionType}
          optionLabel={tradeMeta.label}
          onClose={() => setTradeMeta(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  statusBarBackground: {
    height: Platform.OS === "android" ? 24 : 0,
    width: "100%",
  },
  bannerList: {
    maxHeight: 200,
    marginBottom: 12,
  },
  bannerImage: {
    height: 200,
    borderRadius: 5,
  },
  marketList: {
    paddingBottom: 22,
  },
});
