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

import { ActCard } from "@/components/ActCard";
import { actCategories, bareActs, courts, topics } from "@/constants/mockData";
import { useColors } from "@/hooks/useColors";

type BrowseTab = "acts" | "courts" | "topics";

export default function BrowseScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<BrowseTab>("acts");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const filteredActs = selectedCategory
    ? bareActs.filter((a) => a.category === selectedCategory)
    : bareActs;

  const scCourt = courts.find((c) => c.id === "sc");
  const highCourts = courts.filter((c) => c.id !== "sc");

  const topicIcons: Record<string, keyof typeof Feather.glyphMap> = {
    "Constitutional Law": "shield",
    "Criminal Law": "alert-triangle",
    "Civil Law": "file-text",
    "Family Law": "heart",
    "Property Law": "home",
    "Contract Law": "pen-tool",
    "Labour Law": "users",
    "Tax Law": "percent",
    "Environmental Law": "wind",
    "Intellectual Property": "cpu",
    "Company Law": "briefcase",
    "Banking & Finance": "dollar-sign",
    Arbitration: "activity",
    "Human Rights": "flag",
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topInset + 12,
      paddingHorizontal: 16,
      paddingBottom: 0,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 14,
    },
    title: { fontSize: 22, fontFamily: "Inter_700Bold", color: colors.foreground },
    tabRow: { flexDirection: "row" },
    tabBtn: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderBottomWidth: 2,
    },
    tabText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
    content: { flex: 1 },
    categoryScroll: { paddingHorizontal: 16, paddingVertical: 12 },
    catBtn: {
      paddingHorizontal: 13,
      paddingVertical: 6,
      borderRadius: 18,
      marginRight: 8,
      borderWidth: 1,
    },
    catText: { fontSize: 12, fontFamily: "Inter_500Medium" },
    list: { paddingHorizontal: 16, paddingTop: 4 },
    sectionLabel: {
      fontSize: 12,
      fontFamily: "Inter_700Bold",
      color: colors.mutedForeground,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
    },
    courtCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 14,
      marginHorizontal: 16,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    courtIconWrap: {
      width: 42,
      height: 42,
      borderRadius: 10,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    courtInfo: { flex: 1 },
    courtName: {
      fontSize: 13,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      lineHeight: 18,
    },
    courtMeta: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 2,
    },
    yearBadge: {
      backgroundColor: colors.secondary,
      borderRadius: 6,
      paddingHorizontal: 7,
      paddingVertical: 3,
    },
    yearText: {
      fontSize: 11,
      fontFamily: "Inter_500Medium",
      color: colors.primary,
    },
    scCard: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 8,
      marginTop: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    scIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    scName: {
      fontSize: 15,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
    },
    scMeta: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: "rgba(255,255,255,0.75)",
      marginTop: 2,
    },
    topicGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      padding: 16,
    },
    topicCard: {
      width: "47%",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    topicText: {
      fontSize: 13,
      fontFamily: "Inter_600SemiBold",
      color: colors.primary,
      marginTop: 8,
    },
    topicCount: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 2,
    },
    bottomPad: { height: Platform.OS === "web" ? 34 + 84 : 100 },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Feather name="grid" size={20} color={colors.primary} />
          <Text style={styles.title}>Browse</Text>
        </View>
        <View style={styles.tabRow}>
          {(["acts", "courts", "topics"] as BrowseTab[]).map((t) => (
            <Pressable
              key={t}
              style={[styles.tabBtn, { borderBottomColor: tab === t ? colors.primary : "transparent" }]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, { color: tab === t ? colors.primary : colors.mutedForeground }]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {tab === "acts" && (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {[null, ...actCategories].map((c) => {
                const active = selectedCategory === c;
                return (
                  <Pressable
                    key={c ?? "all"}
                    style={[
                      styles.catBtn,
                      {
                        backgroundColor: active ? colors.primary : colors.card,
                        borderColor: active ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => setSelectedCategory(c)}
                  >
                    <Text style={[styles.catText, { color: active ? "#FFF" : colors.mutedForeground }]}>
                      {c ?? "All"}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={styles.list}>
              {filteredActs.map((act) => (
                <ActCard key={act.id} item={act} />
              ))}
            </View>
          </>
        )}

        {tab === "courts" && (
          <>
            {scCourt && (
              <>
                <Text style={styles.sectionLabel}>Apex Court</Text>
                <Pressable
                  style={({ pressed }) => [styles.scCard, { opacity: pressed ? 0.88 : 1 }]}
                  onPress={() => router.push({ pathname: "/search", params: { court: scCourt.id } })}
                >
                  <View style={styles.scIconWrap}>
                    <Feather name="award" size={22} color="#FFFFFF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.scName}>{scCourt.name}</Text>
                    <Text style={styles.scMeta}>
                      Est. {scCourt.established} · {scCourt.location}
                    </Text>
                    <Text style={[styles.scMeta, { marginTop: 2 }]}>
                      Tap to browse judgments →
                    </Text>
                  </View>
                </Pressable>
              </>
            )}

            <Text style={styles.sectionLabel}>All 25 High Courts</Text>
            {highCourts.map((court) => (
              <Pressable
                key={court.id}
                style={({ pressed }) => [styles.courtCard, { opacity: pressed ? 0.85 : 1 }]}
                onPress={() => router.push({ pathname: "/search", params: { court: court.id } })}
              >
                <View style={styles.courtIconWrap}>
                  <Feather name="landmark" size={18} color={colors.primary} />
                </View>
                <View style={styles.courtInfo}>
                  <Text style={styles.courtName}>{court.name}</Text>
                  <Text style={styles.courtMeta}>
                    {court.location} · {court.state}
                  </Text>
                </View>
                <View style={{ gap: 4, alignItems: "flex-end" }}>
                  <View style={styles.yearBadge}>
                    <Text style={styles.yearText}>Est. {court.established}</Text>
                  </View>
                  <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
                </View>
              </Pressable>
            ))}
          </>
        )}

        {tab === "topics" && (
          <View style={styles.topicGrid}>
            {topics.map((topic) => (
              <Pressable
                key={topic}
                style={({ pressed }) => [styles.topicCard, { opacity: pressed ? 0.85 : 1 }]}
                onPress={() => router.push({ pathname: "/search", params: { topic } })}
              >
                <Feather
                  name={topicIcons[topic] ?? "file-text"}
                  size={22}
                  color={colors.primary}
                />
                <Text style={styles.topicText}>{topic}</Text>
                <Text style={styles.topicCount}>
                  {Math.floor(Math.random() * 3000 + 200)} cases
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}
