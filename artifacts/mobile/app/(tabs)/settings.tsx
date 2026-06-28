import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

interface SettingRow {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
}

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topInset + 12,
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: colors.foreground },
    profileCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginHorizontal: 16,
      marginTop: 20,
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      fontSize: 22,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
    },
    profileInfo: { flex: 1 },
    profileName: {
      fontSize: 16,
      fontFamily: "Inter_700Bold",
      color: colors.foreground,
    },
    profileEmail: {
      fontSize: 13,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 2,
    },
    profileBadge: {
      marginTop: 6,
      alignSelf: "flex-start",
      backgroundColor: colors.successLight,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    profileBadgeText: {
      fontSize: 11,
      fontFamily: "Inter_600SemiBold",
      color: colors.success,
    },
    sectionLabel: {
      fontSize: 12,
      fontFamily: "Inter_600SemiBold",
      color: colors.mutedForeground,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginHorizontal: 16,
      marginTop: 24,
      marginBottom: 8,
    },
    settingGroup: {
      marginHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 12,
    },
    settingDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: 52,
    },
    iconWrap: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    settingLabel: {
      flex: 1,
      fontSize: 15,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
    },
    settingValue: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
    },
    versionText: {
      textAlign: "center",
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 28,
      marginBottom: 8,
    },
    bottomPad: {
      height: Platform.OS === "web" ? 34 + 84 : 100,
    },
  });

  function SettingGroup({ rows }: { rows: SettingRow[] }) {
    return (
      <View style={styles.settingGroup}>
        {rows.map((row, idx) => (
          <React.Fragment key={row.label}>
            <Pressable
              style={({ pressed }) => [
                styles.settingRow,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={row.onPress}
            >
              <View
                style={[
                  styles.iconWrap,
                  row.destructive && { backgroundColor: "#FEE2E2" },
                ]}
              >
                <Feather
                  name={row.icon}
                  size={16}
                  color={row.destructive ? colors.destructive : colors.primary}
                />
              </View>
              <Text
                style={[
                  styles.settingLabel,
                  row.destructive && { color: colors.destructive },
                ]}
              >
                {row.label}
              </Text>
              {row.value && (
                <Text style={styles.settingValue}>{row.value}</Text>
              )}
              {!row.value && (
                <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
              )}
            </Pressable>
            {idx < rows.length - 1 && <View style={styles.settingDivider} />}
          </React.Fragment>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Advocate User</Text>
            <Text style={styles.profileEmail}>user@bharatlaw.ai</Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>Free Plan</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
        </View>

        <Text style={styles.sectionLabel}>Research</Text>
        <SettingGroup
          rows={[
            { icon: "clock", label: "Search History" },
            { icon: "download", label: "Downloaded Cases", value: "0" },
            { icon: "wifi-off", label: "Offline Mode" },
          ]}
        />

        <Text style={styles.sectionLabel}>Preferences</Text>
        <SettingGroup
          rows={[
            { icon: "moon", label: "Dark Mode" },
            { icon: "globe", label: "Language", value: "English" },
            { icon: "type", label: "Font Size", value: "Medium" },
            { icon: "bell", label: "Notifications" },
          ]}
        />

        <Text style={styles.sectionLabel}>Account</Text>
        <SettingGroup
          rows={[
            { icon: "lock", label: "Privacy Settings" },
            { icon: "shield", label: "Security" },
            { icon: "star", label: "Upgrade to Pro" },
          ]}
        />

        <Text style={styles.sectionLabel}>Support</Text>
        <SettingGroup
          rows={[
            { icon: "help-circle", label: "Help & FAQ" },
            { icon: "mail", label: "Contact Us" },
            { icon: "info", label: "About BharatLaw AI", value: "v1.0.0" },
          ]}
        />

        <Text style={styles.sectionLabel}>Danger Zone</Text>
        <SettingGroup
          rows={[
            { icon: "log-out", label: "Sign Out", destructive: true },
          ]}
        />

        <Text style={styles.versionText}>
          BharatLaw AI · v1.0.0 · Built for Indian Legal Research
        </Text>
        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}
