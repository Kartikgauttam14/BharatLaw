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
import { SectionHeader } from "@/components/SectionHeader";
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
    tabRow: {
      flexDirection: "row",
      gap: 0,
    },
    tabBtn: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderBottomWidth: 2,
    },
    tabText: {
      fontSize: 14,
      fontFamily: "Inter_600SemiBold",
    },
    content: { flex: 1 },
    categoryScroll: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    catBtn: {
      paddingHorizontal: 13,
      paddingVertical: 6,
      borderRadius: 18,
      marginRight: 8,
      borderWidth: 1,
    },
    catText: { fontSize: 12, fontFamily: "Inter_500Medium" },
    list: { paddingHorizontal: 16, paddingTop: 4 },
    courtCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    courtIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    courtName: {
      fontSize: 14,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
    },
    courtSub: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 2,
    },
    chevron: { marginLeft: "auto" },
    topicGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      paddingHorizontal: 16,
      paddingTop: 16,
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
    bottomPad: {
      height: Platform.OS === "web" ? 34 + 84 : 100,
    },
  });

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
              style={[
                styles.tabBtn,
                {
                  borderBottomColor: tab === t ? colors.primary : "transparent",
                },
              ]}
              onPress={() => setTab(t)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: tab === t ? colors.primary : colors.mutedForeground },
                ]}
              >
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
              <Pressable
                style={[
                  styles.catBtn,
                  {
                    backgroundColor: !selectedCategory ? colors.primary : colors.card,
                    borderColor: !selectedCategory ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text style={[styles.catText, { color: !selectedCategory ? "#FFF" : colors.mutedForeground }]}>
                  All
                </Text>
              </Pressable>
              {actCategories.map((c) => {
                const active = selectedCategory === c;
                return (
                  <Pressable
                    key={c}
                    style={[
                      styles.catBtn,
                      {
                        backgroundColor: active ? colors.primary : colors.card,
                        borderColor: active ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => setSelectedCategory(active ? null : c)}
                  >
                    <Text style={[styles.catText, { color: active ? "#FFF" : colors.mutedForeground }]}>
                      {c}
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
          <View style={styles.list}>
            <View style={{ height: 16 }} />
            {courts.map((court) => (
              <Pressable
                key={court.id}
                style={({ pressed }) => [
                  styles.courtCard,
                  { opacity: pressed ? 0.85 : 1 },
                ]}
                onPress={() => router.push({ pathname: "/search", params: { court: court.id } })}
              >
                <View style={styles.courtIcon}>
                  <Feather name="landmark" size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.courtName}>{court.name}</Text>
                  <Text style={styles.courtSub}>
                    {court.state ?? "All India"} · View judgments
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  size={18}
                  color={colors.mutedForeground}
                  style={styles.chevron}
                />
              </Pressable>
            ))}
          </View>
        )}

        {tab === "topics" && (
          <View style={styles.topicGrid}>
            {topics.map((topic) => (
              <Pressable
                key={topic}
                style={({ pressed }) => [
                  styles.topicCard,
                  { opacity: pressed ? 0.85 : 1 },
                ]}
                onPress={() => router.push({ pathname: "/search", params: { topic } })}
              >
                <Feather
                  name={topicIcons[topic] ?? "file-text"}
                  size={22}
                  color={colors.primary}
                />
                <Text style={styles.topicText}>{topic}</Text>
                <Text style={styles.topicCount}>
                  {Math.floor(Math.random() * 500 + 50)} cases
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
