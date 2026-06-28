import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useBookmarks } from "@/context/BookmarksContext";
import { useColors } from "@/hooks/useColors";
import type { Judgment } from "@/constants/mockData";

interface CaseCardProps {
  item: Judgment;
  compact?: boolean;
}

export function CaseCard({ item, compact = false }: CaseCardProps) {
  const colors = useColors();
  const router = useRouter();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(item.id);

  function handleBookmark() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (bookmarked) {
      removeBookmark(item.id);
    } else {
      addBookmark({
        id: item.id,
        type: "judgment",
        title: item.title,
        citation: item.citation,
        court: item.court,
        date: item.date,
        savedAt: new Date().toISOString(),
      });
    }
  }

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: compact ? 14 : 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 8,
    },
    titleContainer: { flex: 1 },
    title: {
      fontSize: compact ? 14 : 15,
      fontFamily: "Inter_600SemiBold",
      color: colors.primary,
      lineHeight: compact ? 20 : 22,
    },
    citation: {
      fontSize: 12,
      fontFamily: "Inter_500Medium",
      color: colors.saffron,
      marginTop: 3,
    },
    court: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 2,
    },
    headnote: {
      fontSize: 13,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
      lineHeight: 19,
      marginTop: 8,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 10,
    },
    tag: {
      backgroundColor: colors.secondary,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    tagText: {
      fontSize: 11,
      fontFamily: "Inter_500Medium",
      color: colors.primary,
    },
    bookmarkBtn: {
      padding: 4,
    },
    aiBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      backgroundColor: colors.highlight,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    aiText: {
      fontSize: 11,
      fontFamily: "Inter_600SemiBold",
      color: colors.saffron,
    },
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}
      onPress={() => router.push(`/case/${item.id}`)}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={compact ? 2 : 3}>
            {item.title}
          </Text>
          <Text style={styles.citation}>{item.citation}</Text>
          <Text style={styles.court} numberOfLines={1}>
            {item.court} · {item.date}
          </Text>
        </View>
        <Pressable style={styles.bookmarkBtn} onPress={handleBookmark} hitSlop={12}>
          <Feather
            name={bookmarked ? "bookmark" : "bookmark"}
            size={20}
            color={bookmarked ? colors.saffron : colors.mutedForeground}
          />
        </Pressable>
      </View>

      {!compact && (
        <Text style={styles.headnote} numberOfLines={2}>
          {item.headnote}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.aiBadge}>
          <Feather name="zap" size={10} color={colors.saffron} />
          <Text style={styles.aiText}>AI Summary</Text>
        </View>
        {item.topic.slice(0, 2).map((t) => (
          <View key={t} style={styles.tag}>
            <Text style={styles.tagText}>{t}</Text>
          </View>
        ))}
        {item.bench && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.bench.replace("Constitutional Bench", "").replace("Judge", "J").trim()}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
