import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useBookmarks } from "@/context/BookmarksContext";
import { useColors } from "@/hooks/useColors";
import type { BareAct } from "@/constants/mockData";

interface ActCardProps {
  item: BareAct;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  Constitutional: "#1A3A6B",
  Criminal: "#9B1C1C",
  Civil: "#1A5276",
  "Family Law": "#5B2C6F",
  Property: "#1E8449",
  "Company Law": "#784212",
  "Tax Law": "#1A5276",
  "Labour Law": "#0E6655",
  "Banking & Finance": "#1A4B8C",
  Environmental: "#1E6B3C",
  "Intellectual Property": "#4A235A",
};

export function ActCard({ item, compact = false }: ActCardProps) {
  const colors = useColors();
  const router = useRouter();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(item.id);
  const catColor = categoryColors[item.category] ?? colors.primary;

  function handleBookmark() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (bookmarked) {
      removeBookmark(item.id);
    } else {
      addBookmark({
        id: item.id,
        type: "act",
        title: item.title,
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
      flexDirection: "row",
      gap: 12,
      alignItems: "flex-start",
    },
    colorBar: {
      width: 4,
      borderRadius: 4,
      backgroundColor: catColor,
      minHeight: 50,
      alignSelf: "stretch",
    },
    content: { flex: 1 },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8,
    },
    titleWrap: { flex: 1 },
    title: {
      fontSize: compact ? 13 : 14,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      lineHeight: 20,
    },
    meta: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 3,
    },
    description: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      lineHeight: 17,
      marginTop: 6,
    },
    footer: {
      flexDirection: "row",
      gap: 8,
      marginTop: 8,
      alignItems: "center",
    },
    tag: {
      borderRadius: 6,
      paddingHorizontal: 7,
      paddingVertical: 2,
      backgroundColor: colors.secondary,
    },
    tagText: {
      fontSize: 11,
      fontFamily: "Inter_500Medium",
      color: colors.primary,
    },
    sections: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
    },
    bookmarkBtn: { padding: 4 },
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}
      onPress={() => router.push(`/act/${item.id}`)}
    >
      <View style={styles.colorBar} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleWrap}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.meta}>
              {item.year} · {item.ministry}
            </Text>
          </View>
          <Pressable style={styles.bookmarkBtn} onPress={handleBookmark} hitSlop={12}>
            <Feather
              name="bookmark"
              size={18}
              color={bookmarked ? colors.saffron : colors.mutedForeground}
            />
          </Pressable>
        </View>
        {!compact && (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <View style={styles.footer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.category}</Text>
          </View>
          <Text style={styles.sections}>{item.sections} Sections</Text>
          <Text style={styles.sections}>Amended {item.lastAmended}</Text>
        </View>
      </View>
    </Pressable>
  );
}
