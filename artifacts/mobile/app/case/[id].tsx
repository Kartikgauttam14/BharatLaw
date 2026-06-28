import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
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

import { useBookmarks } from "@/context/BookmarksContext";
import { judgments } from "@/constants/mockData";
import { useColors } from "@/hooks/useColors";

export default function CaseDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const {
    isBookmarked,
    addBookmark,
    removeBookmark,
    addToReadingList,
    removeFromReadingList,
    isInReadingList,
  } = useBookmarks();

  const judgment = judgments.find((j) => j.id === id);
  const bookmarked = judgment ? isBookmarked(judgment.id) : false;
  const inReading = judgment ? isInReadingList(judgment.id) : false;

  const topInset = Platform.OS === "web" ? 67 : insets.top;

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
      justifyContent: "space-between",
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 16,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      maxWidth: 220,
    },
    headerActions: { flexDirection: "row", gap: 4 },
    actionBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    content: { flex: 1 },
    section: { padding: 16 },
    caseTitle: {
      fontSize: 20,
      fontFamily: "Inter_700Bold",
      color: colors.primary,
      lineHeight: 28,
      marginBottom: 8,
    },
    citation: {
      fontSize: 15,
      fontFamily: "Inter_600SemiBold",
      color: colors.saffron,
      marginBottom: 4,
    },
    court: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginBottom: 16,
    },
    metaGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 16,
    },
    metaCard: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      minWidth: "47%",
      flex: 1,
    },
    metaLabel: {
      fontSize: 11,
      fontFamily: "Inter_500Medium",
      color: colors.mutedForeground,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    metaValue: {
      fontSize: 13,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      marginTop: 4,
    },
    aiSummaryCard: {
      backgroundColor: colors.highlight,
      borderRadius: 14,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.saffron + "40",
    },
    aiHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
    },
    aiTitle: {
      fontSize: 14,
      fontFamily: "Inter_700Bold",
      color: colors.saffron,
    },
    aiBeta: {
      fontSize: 10,
      fontFamily: "Inter_600SemiBold",
      color: colors.saffron,
      backgroundColor: colors.saffron + "25",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    aiText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
      lineHeight: 22,
    },
    readMore: {
      marginTop: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    readMoreText: {
      fontSize: 13,
      fontFamily: "Inter_600SemiBold",
      color: colors.saffron,
    },
    divider: { height: 1, backgroundColor: colors.border, marginBottom: 16 },
    sectionTitle: {
      fontSize: 15,
      fontFamily: "Inter_700Bold",
      color: colors.foreground,
      marginBottom: 10,
    },
    headnote: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
      lineHeight: 22,
      fontStyle: "italic",
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
      paddingLeft: 12,
      marginBottom: 16,
    },
    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 16,
    },
    tag: {
      backgroundColor: colors.secondary,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    tagText: {
      fontSize: 12,
      fontFamily: "Inter_500Medium",
      color: colors.primary,
    },
    judgesText: {
      fontSize: 13,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
      lineHeight: 22,
    },
    fullText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
      lineHeight: 24,
      marginBottom: 16,
    },
    pdfBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 20,
      justifyContent: "center",
      marginBottom: 16,
    },
    pdfBtnText: {
      fontSize: 15,
      fontFamily: "Inter_600SemiBold",
      color: "#FFFFFF",
    },
    bottomPad: {
      height: Platform.OS === "web" ? 34 : 60,
    },
    notFound: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    notFoundText: {
      fontSize: 16,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
    },
  });

  if (!judgment) {
    return (
      <View style={[styles.container, styles.notFound]}>
        <Feather name="alert-circle" size={48} color={colors.border} />
        <Text style={styles.notFoundText}>Judgment not found</Text>
        <Pressable
          style={styles.pdfBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.pdfBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  function handleBookmark() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (bookmarked) {
      removeBookmark(judgment!.id);
    } else {
      addBookmark({
        id: judgment!.id,
        type: "judgment",
        title: judgment!.title,
        citation: judgment!.citation,
        court: judgment!.court,
        date: judgment!.date,
        savedAt: new Date().toISOString(),
      });
    }
  }

  function handleReadingList() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (inReading) {
      removeFromReadingList(judgment!.id);
    } else {
      addToReadingList({
        id: judgment!.id,
        type: "judgment",
        title: judgment!.title,
        citation: judgment!.citation,
        court: judgment!.court,
        date: judgment!.date,
        savedAt: new Date().toISOString(),
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
            <Feather name="arrow-left" size={20} color={colors.foreground} />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {judgment.citation}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.actionBtn} onPress={handleReadingList} hitSlop={8}>
            <Feather
              name="clock"
              size={20}
              color={inReading ? colors.primary : colors.mutedForeground}
            />
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={handleBookmark} hitSlop={8}>
            <Feather
              name="bookmark"
              size={20}
              color={bookmarked ? colors.saffron : colors.mutedForeground}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.caseTitle}>{judgment.title}</Text>
          <Text style={styles.citation}>{judgment.citation}</Text>
          <Text style={styles.court}>
            {judgment.court} · {judgment.date}
          </Text>

          <View style={styles.metaGrid}>
            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>Bench</Text>
              <Text style={styles.metaValue}>{judgment.bench}</Text>
            </View>
            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>Year</Text>
              <Text style={styles.metaValue}>{judgment.year}</Text>
            </View>
            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>Petitioner</Text>
              <Text style={styles.metaValue} numberOfLines={2}>
                {judgment.petitioner}
              </Text>
            </View>
            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>Respondent</Text>
              <Text style={styles.metaValue} numberOfLines={2}>
                {judgment.respondent}
              </Text>
            </View>
          </View>

          <View style={styles.aiSummaryCard}>
            <View style={styles.aiHeader}>
              <Feather name="zap" size={16} color={colors.saffron} />
              <Text style={styles.aiTitle}>AI Summary</Text>
              <Text style={styles.aiBeta}>BETA</Text>
            </View>
            <Text style={styles.aiText} numberOfLines={showFullSummary ? undefined : 4}>
              {judgment.aiSummary}
            </Text>
            <Pressable
              style={styles.readMore}
              onPress={() => setShowFullSummary(!showFullSummary)}
            >
              <Text style={styles.readMoreText}>
                {showFullSummary ? "Show less" : "Read full summary"}
              </Text>
              <Feather
                name={showFullSummary ? "chevron-up" : "chevron-down"}
                size={14}
                color={colors.saffron}
              />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Headnote</Text>
          <Text style={styles.headnote}>{judgment.headnote}</Text>

          <Text style={styles.sectionTitle}>Topics</Text>
          <View style={styles.tagRow}>
            {judgment.topic.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Acts & Statutes</Text>
          <View style={styles.tagRow}>
            {judgment.acts.map((a) => (
              <View key={a} style={[styles.tag, { backgroundColor: colors.highlight }]}>
                <Text style={[styles.tagText, { color: colors.saffron }]}>{a}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Bench Composition</Text>
          {judgment.judges.map((judge) => (
            <Text key={judge} style={styles.judgesText}>
              · {judge}
            </Text>
          ))}

          <View style={[styles.divider, { marginTop: 16 }]} />

          <Text style={styles.sectionTitle}>Judgment Excerpt</Text>
          <Text style={styles.fullText} numberOfLines={showFullText ? undefined : 6}>
            {judgment.fullText}
          </Text>
          <Pressable
            style={styles.readMore}
            onPress={() => setShowFullText(!showFullText)}
          >
            <Text style={styles.readMoreText}>
              {showFullText ? "Collapse" : "Show full excerpt"}
            </Text>
            <Feather
              name={showFullText ? "chevron-up" : "chevron-down"}
              size={14}
              color={colors.saffron}
            />
          </Pressable>

          {judgment.pdfUrl && (
            <>
              <View style={[styles.divider, { marginTop: 20 }]} />
              <Pressable style={styles.pdfBtn}>
                <Feather name="download" size={18} color="#FFFFFF" />
                <Text style={styles.pdfBtnText}>Download PDF</Text>
              </Pressable>
            </>
          )}

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
    </View>
  );
}
