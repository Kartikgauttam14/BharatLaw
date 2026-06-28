import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
  editable?: boolean;
  onPress?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search judgments, acts, citations...",
  onFocus,
  onClear,
  autoFocus = false,
  editable = true,
  onPress,
}: SearchBarProps) {
  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      height: 46,
      gap: 8,
    },
    input: {
      flex: 1,
      fontSize: 15,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
    },
    clearBtn: { padding: 2 },
  });

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View style={styles.container} pointerEvents={onPress ? "none" : "auto"}>
        <Feather name="search" size={18} color={colors.mutedForeground} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          onFocus={onFocus}
          autoFocus={autoFocus}
          editable={editable}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <Pressable style={styles.clearBtn} onPress={onClear} hitSlop={8}>
            <Feather name="x-circle" size={16} color={colors.mutedForeground} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
