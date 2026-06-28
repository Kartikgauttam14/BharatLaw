import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActCard } from "@/components/ActCard";
import { CaseCard } from "@/components/CaseCard";
import { SearchBar } from "@/components/SearchBar";
import { bareActs, judgments } from "@/constants/mockData";
import { useColors } from "@/hooks/useColors";

type SearchTab = "all" | "judgments" | "acts";

const RECENT_SEARCHES = [
  "Section 498A IPC",
  "Right to privacy",
  "Basic structure doctrine",
  "Bail conditions",
  "Property inheritance",
];

export default function SearchScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ court?: string; topic?: string }>();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<SearchTab>("all");
  const [hasSearched, setHasSearched] = useState(false);

  const topInset = Platform.OS === "web" ? 67 : insets.top;

  useEffect(() => {
    if (params.court || params.topic) {
      setHasSearched(true);
    }
  }, [params.court, params.topic]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    const courtFilter = params.court;
    const topicFilter = params.topic;

    let filteredJudgments = judgments;
    let filteredActs = bareActs;

    if (courtFilter) {
      filteredJudgments = filteredJudgments.filter((j) =>
        j.court.toLowerCase().includes(courtFilter.replace("hc-", ""))
      );
    }

    if (topicFilter) {
      filteredJudgments = filteredJudgments.filter((j) =>
        j.topic.some((t) => t.toLowerCase().includes(topicFilter.toLowerCase()))
      );
      filteredActs = filteredActs.filter((a) =>
        a.category.toLowerCase().includes(topicFilter.toLowerCase())
      );
    }

    if (q) {
      filteredJudgments = filteredJudgments.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.citation.toLowerCase().includes(q) ||
          j.headnote.toLowerCase().includes(q) ||
          j.topic.some((t) => t.toLowerCase().includes(q)) ||
          j.judges.some((judge) => judge.toLowerCase().includes(q))
      );
      filteredActs = filteredActs.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }

    return { judgments: filteredJudgments, acts: filteredActs };
  }, [query, params.court, params.topic]);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topInset + 8,
      paddingHorizontal: 16,
      paddingBottom: 12,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    tabRow: {
      flexDirection: "row",
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tabBtn: {
      paddingVertical: 12,
      marginRight: 20,
      borderBottomWidth: 2,
    },
    tabText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
    recentSection: {
      padding: 16,
    },
    recentTitle: {
      fontSize: 15,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      marginBottom: 12,
    },
    recentItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    recentText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
    },
    resultsHeader: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    resultsCount: {
      fontSize: 13,
      fontFamily: "Inter_500Medium",
      color: colors.mutedForeground,
    },
    listContent: { paddingHorizontal: 16, paddingTop: 4 },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
      gap: 12,
    },
    emptyTitle: {
      fontSize: 17,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
    },
    emptyText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      textAlign: "center",
    },
    bottomPad: {
      height: Platform.OS === "web" ? 34 : 80,
    },
  });

  const totalCount = results.judgments.length + results.acts.length;
  const showJudgments = tab === "all" || tab === "judgments";
  const showActs = tab === "all" || tab === "acts";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <SearchBar
          value={query}
          onChangeText={(t) => {
            setQuery(t);
            setHasSearched(true);
          }}
          placeholder="Search cases, acts, citations..."
          autoFocus
          onClear={() => {
            setQuery("");
            setHasSearched(false);
          }}
        />
      </View>

      {hasSearched && (
        <View style={styles.tabRow}>
          {(["all", "judgments", "acts"] as SearchTab[]).map((t) => (
            <Pressable
              key={t}
              style={[
                styles.tabBtn,
                { borderBottomColor: tab === t ? colors.primary : "transparent" },
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
                {t !== "all" && (
                  <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular" }}>
                    {" "}({t === "judgments" ? results.judgments.length : results.acts.length})
                  </Text>
                )}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {!hasSearched ? (
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recent Searches</Text>
            {RECENT_SEARCHES.map((s) => (
              <Pressable
                key={s}
                style={styles.recentItem}
                onPress={() => {
                  setQuery(s);
                  setHasSearched(true);
                }}
              >
                <Feather name="clock" size={16} color={colors.mutedForeground} />
                <Text style={styles.recentText}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      ) : totalCount === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="search" size={48} color={colors.border} />
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>
            Try different keywords, citation numbers, or judge names
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>{totalCount} results</Text>
          </View>
          <View style={styles.listContent}>
            {showJudgments &&
              results.judgments.map((item) => (
                <CaseCard key={item.id} item={item} compact />
              ))}
            {showActs &&
              results.acts.map((item) => (
                <ActCard key={item.id} item={item} compact />
              ))}
          </View>
          <View style={styles.bottomPad} />
        </ScrollView>
      )}
    </View>
  );
}
