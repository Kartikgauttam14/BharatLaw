import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CaseCard } from "@/components/CaseCard";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeader } from "@/components/SectionHeader";
import { dailyUpdates, judgments } from "@/constants/mockData";
import { useColors } from "@/hooks/useColors";

const QUICK_FILTERS = [
  { label: "Supreme Court", icon: "award" as const },
  { label: "High Courts", icon: "landmark" as const },
  { label: "Constitutional", icon: "shield" as const },
  { label: "Criminal", icon: "alert-triangle" as const },
  { label: "Family", icon: "heart" as const },
  { label: "Property", icon: "home" as const },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const displayCases = activeFilter
    ? judgments.filter(
        (j) =>
          j.court.toLowerCase().includes(activeFilter.toLowerCase()) ||
          j.topic.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
      )
    : judgments.slice(0, 5);

  const todayUpdates = dailyUpdates.filter((u) => u.isNew).slice(0, 3);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topInset + 10,
      paddingHorizontal: 16,
      paddingBottom: 14,
      backgroundColor: colors.primary,
    },
    brandRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    brandLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    logoCircle: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    brandName: {
      fontSize: 19,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
    },
    brandSub: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: "rgba(255,255,255,0.7)",
      marginTop: 1,
    },
    notifBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(255,255,255,0.15)",
      alignItems: "center",
      justifyContent: "center",
    },
    searchWrap: {
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      height: 46,
      gap: 10,
    },
    searchPlaceholder: {
      flex: 1,
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: "rgba(255,255,255,0.75)",
    },
    aiAgentBanner: {
      margin: 16,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    bannerInner: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      gap: 14,
    },
    bannerIconWrap: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    bannerContent: { flex: 1 },
    bannerTitle: {
      fontSize: 15,
      fontFamily: "Inter_700Bold",
      color: colors.primary,
    },
    bannerSub: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 3,
      lineHeight: 17,
    },
    bannerArrow: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    statsRow: {
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
    },
    statNum: {
      fontSize: 18,
      fontFamily: "Inter_700Bold",
      color: colors.primary,
    },
    statLabel: {
      fontSize: 10,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 3,
      textAlign: "center",
    },
    filterScroll: { paddingHorizontal: 16, paddingBottom: 12 },
    filterBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 22,
      marginRight: 8,
      borderWidth: 1,
    },
    filterText: { fontSize: 12, fontFamily: "Inter_500Medium" },
    section: { paddingHorizontal: 16 },
    updateCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 14,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      gap: 10,
      alignItems: "flex-start",
    },
    updateLeft: {
      width: 4,
      borderRadius: 4,
      backgroundColor: "#DC2626",
      alignSelf: "stretch",
      minHeight: 40,
    },
    updateTitle: {
      flex: 1,
      fontSize: 13,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      lineHeight: 19,
    },
    updateMeta: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 4,
    },
    bottomPad: { height: Platform.OS === "web" ? 34 + 84 : 100 },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandLeft}>
            <View style={styles.logoCircle}>
              <Feather name="book-open" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.brandName}>BharatLaw AI</Text>
              <Text style={styles.brandSub}>Indian Legal Research</Text>
            </View>
          </View>
          <Pressable
            style={styles.notifBtn}
            onPress={() => router.push("/(tabs)/updates")}
            hitSlop={8}
          >
            <Feather name="bell" size={18} color="#FFFFFF" />
          </Pressable>
        </View>

        <Pressable style={styles.searchWrap} onPress={() => router.push("/search")}>
          <Feather name="search" size={17} color="rgba(255,255,255,0.75)" />
          <Text style={styles.searchPlaceholder}>Search judgments, acts, citations...</Text>
          <Feather name="mic" size={16} color="rgba(255,255,255,0.6)" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={({ pressed }) => [styles.aiAgentBanner, { opacity: pressed ? 0.9 : 1 }]}
          onPress={() => router.push("/(tabs)/ai-chat")}
        >
          <View style={styles.bannerInner}>
            <View style={styles.bannerIconWrap}>
              <Feather name="cpu" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>BharatLaw AI Agent</Text>
              <Text style={styles.bannerSub}>
                Chat with your own legal AI — trained on 50K+ Indian judgments & statutes
              </Text>
            </View>
            <View style={styles.bannerArrow}>
              <Feather name="arrow-right" size={16} color="#FFFFFF" />
            </View>
          </View>
        </Pressable>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>50K+</Text>
            <Text style={styles.statLabel}>Judgments</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>25</Text>
            <Text style={styles.statLabel}>High Courts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>700+</Text>
            <Text style={styles.statLabel}>Bare Acts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>Daily</Text>
            <Text style={styles.statLabel}>Updates</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {QUICK_FILTERS.map((f) => {
            const active = activeFilter === f.label;
            return (
              <Pressable
                key={f.label}
                style={[
                  styles.filterBtn,
                  {
                    backgroundColor: active ? colors.primary : colors.card,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setActiveFilter(active ? null : f.label)}
              >
                <Feather name={f.icon} size={13} color={active ? "#FFF" : colors.mutedForeground} />
                <Text style={[styles.filterText, { color: active ? "#FFF" : colors.mutedForeground }]}>
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <SectionHeader
            title="Today's Updates"
            icon="bell"
            onSeeAll={() => router.push("/(tabs)/updates")}
          />
          {todayUpdates.map((u) => (
            <Pressable
              key={u.id}
              style={({ pressed }) => [styles.updateCard, { opacity: pressed ? 0.85 : 1 }]}
              onPress={() => router.push("/(tabs)/updates")}
            >
              <View style={styles.updateLeft} />
              <View style={{ flex: 1 }}>
                <Text style={styles.updateTitle} numberOfLines={2}>{u.title}</Text>
                <Text style={styles.updateMeta}>{u.court} · {u.date}</Text>
              </View>
            </Pressable>
          ))}

          <SectionHeader
            title="Landmark Cases"
            icon="award"
            onSeeAll={() => router.push("/search")}
          />
          {displayCases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
    </View>
  );
}
