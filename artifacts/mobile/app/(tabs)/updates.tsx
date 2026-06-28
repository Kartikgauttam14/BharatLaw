import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { courts, dailyUpdates, type DailyUpdate } from "@/constants/mockData";
import { useColors } from "@/hooks/useColors";

const COURT_FILTERS = ["All Courts", "SC", "Delhi HC", "Bombay HC", "Madras HC", "Allahabad HC", "P&H HC", "Karnataka HC", "Kerala HC"];

export default function UpdatesScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCourt, setSelectedCourt] = useState("All Courts");
  const [refreshing, setRefreshing] = useState(false);

  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const filtered = selectedCourt === "All Courts"
    ? dailyUpdates
    : dailyUpdates.filter((u) => u.court.toLowerCase().includes(selectedCourt.toLowerCase().replace(" hc", "").replace("sc", "supreme")));

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }

  const topicColors: Record<string, string> = {
    "Constitutional Law": colors.primary,
    "Criminal Law": "#9B1C1C",
    "Family Law": "#5B2C6F",
    "Labour Law": "#0E6655",
    "Property Law": "#1E8449",
    "Consumer Rights": "#1A5276",
    "Environmental Law": "#1E6B3C",
    "Company Law": "#784212",
    "Tax Law": "#1A5276",
    "Human Rights": colors.primary,
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
    headerTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    title: { fontSize: 22, fontFamily: "Inter_700Bold", color: colors.foreground },
    dateChip: {
      backgroundColor: colors.highlight,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    dateText: {
      fontSize: 12,
      fontFamily: "Inter_600SemiBold",
      color: colors.saffron,
    },
    filterScroll: {
      paddingBottom: 12,
    },
    filterBtn: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 20,
      marginRight: 8,
      borderWidth: 1,
    },
    filterText: { fontSize: 12, fontFamily: "Inter_500Medium" },
    content: { flex: 1 },
    newBadgeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    newBadge: {
      backgroundColor: "#DC2626",
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    newBadgeText: {
      fontSize: 10,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
      letterSpacing: 0.5,
    },
    newCount: {
      fontSize: 13,
      fontFamily: "Inter_500Medium",
      color: colors.mutedForeground,
    },
    updateCard: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 10,
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    updateCardNew: {
      borderColor: colors.saffron + "60",
      borderWidth: 1.5,
    },
    cardTop: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      marginBottom: 10,
    },
    courtBadge: {
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: colors.secondary,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    courtBadgeText: {
      fontSize: 11,
      fontFamily: "Inter_600SemiBold",
      color: colors.primary,
    },
    newDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: "#DC2626",
    },
    cardTitle: {
      fontSize: 14,
      fontFamily: "Inter_700Bold",
      color: colors.foreground,
      lineHeight: 20,
      marginBottom: 6,
    },
    cardSummary: {
      fontSize: 13,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      lineHeight: 19,
      marginBottom: 10,
    },
    cardFooter: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 6,
    },
    topicTag: {
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    topicTagText: {
      fontSize: 11,
      fontFamily: "Inter_500Medium",
      color: "#FFFFFF",
    },
    citationTag: {
      backgroundColor: colors.secondary,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    citationText: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
    },
    dateTag: {
      marginLeft: "auto" as any,
    },
    dateTagText: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
    },
    sectionLabel: {
      fontSize: 12,
      fontFamily: "Inter_600SemiBold",
      color: colors.mutedForeground,
      letterSpacing: 0.7,
      textTransform: "uppercase",
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
    },
    bottomPad: { height: Platform.OS === "web" ? 34 + 84 : 100 },
  });

  const newCount = filtered.filter((u) => u.isNew).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleRow}>
            <Feather name="bell" size={20} color={colors.primary} />
            <Text style={styles.title}>Daily Updates</Text>
          </View>
          <View style={styles.dateChip}>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {COURT_FILTERS.map((f) => {
            const active = selectedCourt === f;
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
                onPress={() => setSelectedCourt(f)}
              >
                <Text style={[styles.filterText, { color: active ? "#FFF" : colors.mutedForeground }]}>
                  {f}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.newBadgeRow}>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>● LIVE</Text>
          </View>
          <Text style={styles.newCount}>
            {newCount} new judgment{newCount !== 1 ? "s" : ""} today · {filtered.length} total
          </Text>
        </View>

        {filtered.filter((u) => u.isNew).length > 0 && (
          <Text style={styles.sectionLabel}>Today's Judgments</Text>
        )}
        {filtered.filter((u) => u.isNew).map((update) => (
          <UpdateCard key={update.id} update={update} styles={styles} colors={colors} topicColors={topicColors} />
        ))}

        {filtered.filter((u) => !u.isNew).length > 0 && (
          <Text style={styles.sectionLabel}>Earlier This Week</Text>
        )}
        {filtered.filter((u) => !u.isNew).map((update) => (
          <UpdateCard key={update.id} update={update} styles={styles} colors={colors} topicColors={topicColors} />
        ))}

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}

function UpdateCard({
  update,
  styles,
  colors,
  topicColors,
}: {
  update: DailyUpdate;
  styles: any;
  colors: any;
  topicColors: Record<string, string>;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.updateCard,
        update.isNew && styles.updateCardNew,
        { opacity: pressed ? 0.88 : 1 },
      ]}
    >
      <View style={styles.cardTop}>
        <View style={styles.courtBadge}>
          {update.isNew && <View style={styles.newDot} />}
          <Feather name="landmark" size={11} color={colors.primary} />
          <Text style={styles.courtBadgeText}>{update.court.replace(" of India", "")}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{update.title}</Text>
      <Text style={styles.cardSummary} numberOfLines={3}>
        {update.summary}
      </Text>
      <View style={styles.cardFooter}>
        {update.topic.map((t) => (
          <View key={t} style={[styles.topicTag, { backgroundColor: topicColors[t] ?? colors.primary }]}>
            <Text style={styles.topicTagText}>{t}</Text>
          </View>
        ))}
        <View style={styles.citationTag}>
          <Text style={styles.citationText}>{update.citation}</Text>
        </View>
        <Text style={[styles.dateTagText, { marginLeft: "auto" }]}>{update.date}</Text>
      </View>
    </Pressable>
  );
}
