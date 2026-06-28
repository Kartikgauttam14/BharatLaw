import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
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
import { courts, judgments, topics } from "@/constants/mockData";
import { useColors } from "@/hooks/useColors";

const QUICK_FILTERS = ["Supreme Court", "High Courts", "Constitutional", "Criminal", "Civil", "Family"];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const recentCases = judgments.slice(0, 5);
  const filteredCases = activeFilter
    ? judgments.filter(
        (j) =>
          j.court.includes(activeFilter) ||
          j.topic.some((t) => t.includes(activeFilter))
      )
    : recentCases;

  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topInset + 12,
      paddingHorizontal: 16,
      paddingBottom: 12,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    brandRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    brandLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    logoBox: {
      width: 34,
      height: 34,
      borderRadius: 8,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    brandName: {
      fontSize: 18,
      fontFamily: "Inter_700Bold",
      color: colors.primary,
    },
    brandSub: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
    },
    notifBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    searchRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    filterScroll: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    filterBtn: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 20,
      marginRight: 8,
      borderWidth: 1,
    },
    filterText: {
      fontSize: 13,
      fontFamily: "Inter_500Medium",
    },
    content: { flex: 1 },
    section: { paddingHorizontal: 16, paddingTop: 16 },
    statsRow: {
      flexDirection: "row",
      gap: 10,
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
      fontSize: 20,
      fontFamily: "Inter_700Bold",
      color: colors.primary,
    },
    statLabel: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 2,
      textAlign: "center",
    },
    bottomPad: {
      height: Platform.OS === "web" ? 34 + 84 : 100,
    },
    highlightBanner: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 16,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    bannerLeft: { flex: 1 },
    bannerTitle: {
      fontSize: 15,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
      marginBottom: 4,
    },
    bannerSub: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: "rgba(255,255,255,0.75)",
    },
    bannerBtn: {
      backgroundColor: colors.saffron,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    bannerBtnText: {
      fontSize: 13,
      fontFamily: "Inter_600SemiBold",
      color: "#FFFFFF",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandLeft}>
            <View style={styles.logoBox}>
              <Feather name="book-open" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.brandName}>BharatLaw AI</Text>
              <Text style={styles.brandSub}>Indian Legal Research</Text>
            </View>
          </View>
          <Pressable style={styles.notifBtn} hitSlop={8}>
            <Feather name="bell" size={18} color={colors.foreground} />
          </Pressable>
        </View>
        <View style={styles.searchRow}>
          <SearchBar
            value=""
            onChangeText={() => {}}
            editable={false}
            onPress={() => router.push("/search")}
          />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {QUICK_FILTERS.map((f) => {
            const active = activeFilter === f;
            return (
              <Pressable
                key={f}
                style={[
                  styles.filterBtn,
                  {
                    backgroundColor: active ? colors.primary : colors.card,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setActiveFilter(active ? null : f)}
              >
                <Text
                  style={[
                    styles.filterText,
                    { color: active ? "#FFFFFF" : colors.mutedForeground },
                  ]}
                >
                  {f}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>50K+</Text>
              <Text style={styles.statLabel}>Judgments</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>700+</Text>
              <Text style={styles.statLabel}>Bare Acts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>25</Text>
              <Text style={styles.statLabel}>High Courts</Text>
            </View>
          </View>

          <View style={styles.highlightBanner}>
            <View style={styles.bannerLeft}>
              <Text style={styles.bannerTitle}>AI-Powered Summaries</Text>
              <Text style={styles.bannerSub}>
                Get instant summaries of any judgment using AI
              </Text>
            </View>
            <Pressable style={styles.bannerBtn} onPress={() => router.push("/search")}>
              <Text style={styles.bannerBtnText}>Try now</Text>
            </Pressable>
          </View>

          <SectionHeader
            title={activeFilter ? `${activeFilter} Cases` : "Landmark Cases"}
            icon="award"
            onSeeAll={() => router.push("/search")}
          />

          {filteredCases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
    </View>
  );
}
