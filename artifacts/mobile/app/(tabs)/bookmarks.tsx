import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useBookmarks } from "@/context/BookmarksContext";
import { useColors } from "@/hooks/useColors";

type BookmarkTab = "bookmarks" | "reading";

export default function BookmarksScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bookmarks, readingList, removeBookmark, removeFromReadingList } = useBookmarks();
  const [tab, setTab] = useState<BookmarkTab>("bookmarks");

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const data = tab === "bookmarks" ? bookmarks : readingList;

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
    empty: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 40,
      gap: 12,
    },
    emptyTitle: {
      fontSize: 17,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      textAlign: "center",
    },
    emptyText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      textAlign: "center",
      lineHeight: 20,
    },
    exploreBtn: {
      marginTop: 8,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 11,
    },
    exploreBtnText: {
      fontSize: 14,
      fontFamily: "Inter_600SemiBold",
      color: "#FFFFFF",
    },
    item: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      flexDirection: "row",
      gap: 12,
      alignItems: "flex-start",
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    itemContent: { flex: 1 },
    itemTitle: {
      fontSize: 14,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      lineHeight: 20,
    },
    itemMeta: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 3,
    },
    itemBadge: {
      marginTop: 6,
      alignSelf: "flex-start",
      backgroundColor: colors.secondary,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    itemBadgeText: {
      fontSize: 11,
      fontFamily: "Inter_500Medium",
      color: colors.primary,
    },
    deleteBtn: { padding: 4 },
    listHeader: { height: 16 },
    bottomPad: {
      height: Platform.OS === "web" ? 34 + 84 : 100,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Feather name="bookmark" size={20} color={colors.primary} />
          <Text style={styles.title}>Saved</Text>
        </View>
        <View style={styles.tabRow}>
          {(["bookmarks", "reading"] as BookmarkTab[]).map((t) => (
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
                {t === "bookmarks" ? "Bookmarks" : "Reading List"}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {data.length === 0 ? (
        <View style={styles.empty}>
          <Feather
            name={tab === "bookmarks" ? "bookmark" : "clock"}
            size={48}
            color={colors.border}
          />
          <Text style={styles.emptyTitle}>
            {tab === "bookmarks" ? "No bookmarks yet" : "Reading list is empty"}
          </Text>
          <Text style={styles.emptyText}>
            {tab === "bookmarks"
              ? "Bookmark judgments and acts to find them here quickly."
              : "Add cases to your reading list to track what you plan to read."}
          </Text>
          <Pressable style={styles.exploreBtn} onPress={() => router.push("/search")}>
            <Text style={styles.exploreBtnText}>Explore cases</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={styles.listHeader} />}
          ListFooterComponent={<View style={styles.bottomPad} />}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.item, { opacity: pressed ? 0.85 : 1 }]}
              onPress={() =>
                router.push(
                  item.type === "judgment" ? `/case/${item.id}` : `/act/${item.id}`
                )
              }
            >
              <View style={styles.iconBox}>
                <Feather
                  name={item.type === "judgment" ? "file-text" : "book"}
                  size={20}
                  color={colors.primary}
                />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                {item.citation && (
                  <Text style={styles.itemMeta}>{item.citation}</Text>
                )}
                {item.court && (
                  <Text style={styles.itemMeta} numberOfLines={1}>
                    {item.court} · {item.date}
                  </Text>
                )}
                <View style={styles.itemBadge}>
                  <Text style={styles.itemBadgeText}>
                    {item.type === "judgment" ? "Judgment" : "Bare Act"}
                  </Text>
                </View>
              </View>
              <Pressable
                style={styles.deleteBtn}
                hitSlop={10}
                onPress={() =>
                  tab === "bookmarks"
                    ? removeBookmark(item.id)
                    : removeFromReadingList(item.id)
                }
              >
                <Feather name="trash-2" size={16} color={colors.mutedForeground} />
              </Pressable>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
