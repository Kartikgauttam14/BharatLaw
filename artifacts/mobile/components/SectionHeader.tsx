import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  icon?: keyof typeof Feather.glyphMap;
}

export function SectionHeader({ title, onSeeAll, icon }: SectionHeaderProps) {
  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
      marginTop: 4,
    },
    left: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: {
      fontSize: 17,
      fontFamily: "Inter_700Bold",
      color: colors.foreground,
    },
    seeAll: {
      fontSize: 13,
      fontFamily: "Inter_500Medium",
      color: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && <Feather name={icon} size={16} color={colors.primary} />}
        <Text style={styles.title}>{title}</Text>
      </View>
      {onSeeAll && (
        <Pressable onPress={onSeeAll} hitSlop={8}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      )}
    </View>
  );
}
