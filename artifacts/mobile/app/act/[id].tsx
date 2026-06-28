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
import { bareActs } from "@/constants/mockData";
import { useColors } from "@/hooks/useColors";

const SAMPLE_SECTIONS: Record<string, Array<{ num: string; title: string; text: string }>> = {
  a001: [
    { num: "1", title: "Name and commencement", text: "This Constitution may be called the Constitution of India." },
    { num: "12", title: "Definition of State", text: 'In this Part, unless the context otherwise requires, "the State" includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India.' },
    { num: "13", title: "Laws inconsistent with or in derogation of the fundamental rights", text: "All laws in force in the territory of India immediately before the commencement of this Constitution, in so far as they are inconsistent with the provisions of this Part, shall, to the extent of such inconsistency, be void." },
    { num: "14", title: "Equality before law", text: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India." },
    { num: "15", title: "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth", text: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them." },
    { num: "21", title: "Protection of life and personal liberty", text: "No person shall be deprived of his life or personal liberty except according to procedure established by law." },
  ],
  a002: [
    { num: "302", title: "Punishment for murder", text: "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine." },
    { num: "375", title: "Rape", text: "A man is said to commit 'rape' if he has sexual intercourse with a woman under circumstances falling under any of the following descriptions: First — Against her will. Secondly — Without her consent..." },
    { num: "420", title: "Cheating and dishonestly inducing delivery of property", text: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security..." },
    { num: "498A", title: "Husband or relative of husband of a woman subjecting her to cruelty", text: "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine." },
  ],
};

export default function ActDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const act = bareActs.find((a) => a.id === id);
  const bookmarked = act ? isBookmarked(act.id) : false;

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const sections = SAMPLE_SECTIONS[id ?? ""] ?? [];

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
      fontSize: 15,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
      maxWidth: 220,
    },
    bookmarkBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    content: { flex: 1 },
    topCard: {
      margin: 16,
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: 20,
    },
    actCategory: {
      fontSize: 12,
      fontFamily: "Inter_600SemiBold",
      color: "rgba(255,255,255,0.65)",
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 6,
    },
    actTitle: {
      fontSize: 18,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
      lineHeight: 26,
    },
    actMeta: {
      fontSize: 13,
      fontFamily: "Inter_400Regular",
      color: "rgba(255,255,255,0.8)",
      marginTop: 8,
    },
    statsRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 14,
    },
    statItem: {
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignItems: "center",
    },
    statNum: {
      fontSize: 18,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
    },
    statLabel: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: "rgba(255,255,255,0.7)",
      marginTop: 2,
    },
    section: { paddingHorizontal: 16 },
    descCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    descTitle: {
      fontSize: 14,
      fontFamily: "Inter_700Bold",
      color: colors.foreground,
      marginBottom: 8,
    },
    descText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
      lineHeight: 22,
    },
    sectionsTitle: {
      fontSize: 17,
      fontFamily: "Inter_700Bold",
      color: colors.foreground,
      marginBottom: 12,
    },
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      gap: 10,
    },
    sectionNum: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    sectionNumText: {
      fontSize: 13,
      fontFamily: "Inter_700Bold",
      color: colors.primary,
    },
    sectionTitleText: {
      flex: 1,
      fontSize: 14,
      fontFamily: "Inter_600SemiBold",
      color: colors.foreground,
    },
    sectionBody: {
      paddingHorizontal: 14,
      paddingBottom: 14,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
    },
    sectionBodyText: {
      fontSize: 13,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
      lineHeight: 21,
    },
    noSections: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
    },
    noSectionsText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      textAlign: "center",
    },
    bottomPad: { height: Platform.OS === "web" ? 34 : 60 },
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
    goBackBtn: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 20,
    },
    goBackText: {
      fontSize: 15,
      fontFamily: "Inter_600SemiBold",
      color: "#FFFFFF",
    },
  });

  if (!act) {
    return (
      <View style={[styles.container, styles.notFound]}>
        <Feather name="alert-circle" size={48} color={colors.border} />
        <Text style={styles.notFoundText}>Act not found</Text>
        <Pressable style={styles.goBackBtn} onPress={() => router.back()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  function handleBookmark() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (bookmarked) {
      removeBookmark(act!.id);
    } else {
      addBookmark({
        id: act!.id,
        type: "act",
        title: act!.title,
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
            {act.shortTitle}
          </Text>
        </View>
        <Pressable style={styles.bookmarkBtn} onPress={handleBookmark} hitSlop={8}>
          <Feather
            name="bookmark"
            size={20}
            color={bookmarked ? colors.saffron : colors.mutedForeground}
          />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topCard}>
          <Text style={styles.actCategory}>{act.category}</Text>
          <Text style={styles.actTitle}>{act.title}</Text>
          <Text style={styles.actMeta}>
            {act.ministry} · Enacted {act.year} · Last amended {act.lastAmended}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{act.sections}</Text>
              <Text style={styles.statLabel}>Sections</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{act.year}</Text>
              <Text style={styles.statLabel}>Enacted</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{act.lastAmended}</Text>
              <Text style={styles.statLabel}>Amended</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.descCard}>
            <Text style={styles.descTitle}>About This Act</Text>
            <Text style={styles.descText}>{act.description}</Text>
          </View>

          <Text style={styles.sectionsTitle}>
            {sections.length > 0 ? "Key Sections" : "Sections"}
          </Text>

          {sections.length === 0 ? (
            <View style={styles.noSections}>
              <Feather name="book-open" size={32} color={colors.border} />
              <Text style={styles.noSectionsText}>
                Full text of this act is being indexed.{"\n"}Check back soon.
              </Text>
            </View>
          ) : (
            sections.map((sec) => (
              <Pressable
                key={sec.num}
                style={styles.sectionCard}
                onPress={() => {
                  Haptics.selectionAsync();
                  setExpandedSection(expandedSection === sec.num ? null : sec.num);
                }}
              >
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNum}>
                    <Text style={styles.sectionNumText}>§{sec.num}</Text>
                  </View>
                  <Text style={styles.sectionTitleText}>{sec.title}</Text>
                  <Feather
                    name={expandedSection === sec.num ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={colors.mutedForeground}
                  />
                </View>
                {expandedSection === sec.num && (
                  <View style={styles.sectionBody}>
                    <Text style={styles.sectionBodyText}>{sec.text}</Text>
                  </View>
                )}
              </Pressable>
            ))
          )}

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
    </View>
  );
}
