import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CaseCard } from "@/components/CaseCard";
import { ActCard } from "@/components/ActCard";
import { processQuery, SUGGESTED_QUESTIONS, type ChatMessage } from "@/constants/legalAI";
import { useColors } from "@/hooks/useColors";

let msgIdCounter = 0;
function newId() {
  return `msg_${++msgIdCounter}_${Date.now()}`;
}

const WELCOME_MSG: ChatMessage = {
  id: "welcome",
  role: "agent",
  text: `**Namaste! 🙏 I am BharatLaw AI — your Indian Legal Assistant.**

I can help you understand:
• **Fundamental rights** and constitutional protections
• **Criminal law** — FIR, bail, arrest rights, IPC sections
• **Family law** — marriage, divorce, maintenance, custody
• **Property** — sale, inheritance, registration
• **Consumer rights** and remedies
• **Labour law** — employment, termination, PF
• **RTI** — Right to Information
• **Company law** and corporate matters

Ask me any legal question in plain language!`,
  cases: [],
  acts: [],
  timestamp: new Date(),
};

function parseMarkdown(text: string, textColor: string, accentColor: string, mutedColor: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const key = `line_${i}`;
    // Bold + bullet
    if (line.startsWith("• **")) {
      const match = line.match(/^• \*\*(.+?)\*\*(.*)$/);
      if (match) {
        return (
          <Text key={key} style={{ color: textColor, fontSize: 14, lineHeight: 22, marginBottom: 2 }}>
            {"• "}
            <Text style={{ fontFamily: "Inter_700Bold", color: textColor }}>{match[1]}</Text>
            <Text style={{ fontFamily: "Inter_400Regular" }}>{match[2]}</Text>
          </Text>
        );
      }
    }
    // Bullet
    if (line.startsWith("• ")) {
      return (
        <Text key={key} style={{ color: textColor, fontSize: 14, lineHeight: 22, fontFamily: "Inter_400Regular", marginBottom: 2 }}>
          {line}
        </Text>
      );
    }
    // Bold header
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <Text key={key} style={{ color: accentColor, fontSize: 15, fontFamily: "Inter_700Bold", marginTop: 10, marginBottom: 4 }}>
          {line.replace(/\*\*/g, "")}
        </Text>
      );
    }
    // Inline bold
    if (line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <Text key={key} style={{ color: textColor, fontSize: 14, lineHeight: 22, fontFamily: "Inter_400Regular", marginBottom: 2 }}>
          {parts.map((part, pi) =>
            pi % 2 === 1 ? (
              <Text key={pi} style={{ fontFamily: "Inter_700Bold" }}>{part}</Text>
            ) : (
              part
            )
          )}
        </Text>
      );
    }
    // Table row
    if (line.startsWith("|")) {
      return (
        <Text key={key} style={{ color: textColor, fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 20 }}>
          {line.replace(/\|/g, "  ").trim()}
        </Text>
      );
    }
    // Empty line
    if (line.trim() === "") return <View key={key} style={{ height: 6 }} />;
    // Normal
    return (
      <Text key={key} style={{ color: textColor, fontSize: 14, lineHeight: 22, fontFamily: "Inter_400Regular", marginBottom: 2 }}>
        {line}
      </Text>
    );
  });
}

export default function AIChatScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomInset = Platform.OS === "web" ? 84 : insets.bottom;

  const sendMessage = useCallback(
    (text: string) => {
      const q = text.trim();
      if (!q) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setShowSuggestions(false);
      const userMsg: ChatMessage = {
        id: newId(),
        role: "user",
        text: q,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        const { answer, cases, acts } = processQuery(q);
        const agentMsg: ChatMessage = {
          id: newId(),
          role: "agent",
          text: answer,
          cases,
          acts,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, agentMsg]);
        setIsTyping(false);
        setTimeout(() => {
          flatRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 800);
    },
    []
  );

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topInset + 8,
      paddingHorizontal: 16,
      paddingBottom: 14,
      backgroundColor: colors.primary,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    headerIcon: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    headerTextWrap: { flex: 1 },
    headerTitle: {
      fontSize: 16,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
    },
    headerSub: {
      fontSize: 12,
      fontFamily: "Inter_400Regular",
      color: "rgba(255,255,255,0.75)",
      marginTop: 1,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#4ADE80",
      marginRight: 4,
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    list: { flex: 1 },
    listContent: { padding: 16, paddingBottom: 8 },
    msgRow: {
      marginBottom: 12,
      maxWidth: "88%",
    },
    userRow: { alignSelf: "flex-end" },
    agentRow: { alignSelf: "flex-start" },
    agentAvatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },
    bubble: {
      borderRadius: 16,
      padding: 12,
    },
    userBubble: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: 4,
    },
    agentBubble: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomLeftRadius: 4,
    },
    userText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: "#FFFFFF",
      lineHeight: 21,
    },
    timeText: {
      fontSize: 10,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      marginTop: 4,
      textAlign: "right",
    },
    agentTimeText: { textAlign: "left" },
    caseSection: {
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    caseSectionTitle: {
      fontSize: 12,
      fontFamily: "Inter_600SemiBold",
      color: colors.saffron,
      marginBottom: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    typingBubble: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderBottomLeftRadius: 4,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
    },
    typingDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.mutedForeground,
    },
    suggestionsContainer: {
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    suggestionsTitle: {
      fontSize: 12,
      fontFamily: "Inter_600SemiBold",
      color: colors.mutedForeground,
      marginBottom: 10,
      paddingHorizontal: 4,
    },
    suggestionChip: {
      backgroundColor: colors.card,
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 8,
      marginRight: 8,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 8,
    },
    suggestionText: {
      fontSize: 12,
      fontFamily: "Inter_500Medium",
      color: colors.primary,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: bottomInset + 8,
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 8,
    },
    inputWrap: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === "ios" ? 10 : 8,
      minHeight: 44,
      maxHeight: 120,
    },
    input: {
      fontSize: 15,
      fontFamily: "Inter_400Regular",
      color: colors.foreground,
    },
    sendBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    sendBtnDisabled: { backgroundColor: colors.muted },
    disclaimerText: {
      fontSize: 11,
      fontFamily: "Inter_400Regular",
      color: colors.mutedForeground,
      textAlign: "center",
      paddingHorizontal: 20,
      paddingBottom: 4,
      backgroundColor: colors.card,
    },
  });

  function formatTime(d: Date) {
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  const suggestions = SUGGESTED_QUESTIONS.slice(0, 6);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Feather name="cpu" size={18} color="#FFFFFF" />
        </View>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>BharatLaw AI Agent</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.headerSub}>Online · Indian Legal Expert</Text>
          </View>
        </View>
        <Pressable
          hitSlop={10}
          onPress={() => setMessages([WELCOME_MSG])}
        >
          <Feather name="refresh-ccw" size={18} color="rgba(255,255,255,0.8)" />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatRef}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={messages}
          keyExtractor={(m) => m.id}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: false })}
          ListFooterComponent={
            isTyping ? (
              <View style={[styles.msgRow, styles.agentRow]}>
                <View style={styles.agentAvatar}>
                  <Feather name="cpu" size={14} color="#FFFFFF" />
                </View>
                <View style={styles.typingBubble}>
                  {[0, 1, 2].map((i) => (
                    <View key={i} style={[styles.typingDot, { opacity: 0.4 + i * 0.3 }]} />
                  ))}
                  <Text style={{ fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_400Regular" }}>
                    Analysing Indian law...
                  </Text>
                </View>
              </View>
            ) : null
          }
          renderItem={({ item: msg }) => {
            const isUser = msg.role === "user";
            return (
              <View style={[styles.msgRow, isUser ? styles.userRow : styles.agentRow]}>
                {!isUser && (
                  <View style={styles.agentAvatar}>
                    <Feather name="cpu" size={14} color="#FFFFFF" />
                  </View>
                )}
                <View style={[styles.bubble, isUser ? styles.userBubble : styles.agentBubble]}>
                  {isUser ? (
                    <Text style={styles.userText}>{msg.text}</Text>
                  ) : (
                    <View>
                      {parseMarkdown(msg.text, colors.foreground, colors.primary, colors.mutedForeground)}
                      {((msg.cases && msg.cases.length > 0) || (msg.acts && msg.acts.length > 0)) && (
                        <View style={styles.caseSection}>
                          <Text style={{ fontSize: 12, fontFamily: "Inter_600SemiBold", color: colors.saffron, marginBottom: 8 }}>
                            ⚡ Relevant Cases & Laws
                          </Text>
                          {msg.cases?.map((c) => (
                            <CaseCard key={c.id} item={c} compact />
                          ))}
                          {msg.acts?.map((a) => (
                            <ActCard key={a.id} item={a} compact />
                          ))}
                        </View>
                      )}
                    </View>
                  )}
                  <Text style={[styles.timeText, !isUser && styles.agentTimeText]}>
                    {formatTime(msg.timestamp)}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {showSuggestions && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>SUGGESTED QUESTIONS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {suggestions.map((q) => (
                <Pressable
                  key={q}
                  style={({ pressed }) => [styles.suggestionChip, { opacity: pressed ? 0.75 : 1 }]}
                  onPress={() => sendMessage(q)}
                >
                  <Text style={styles.suggestionText}>{q}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        <Text style={styles.disclaimerText}>
          For informational purposes only. Consult a registered advocate for legal advice.
        </Text>

        <View style={styles.inputRow}>
          <TextInput
            ref={inputRef}
            style={styles.inputWrap}
            value={input}
            onChangeText={setInput}
            placeholder="Ask any legal question..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            returnKeyType="send"
            blurOnSubmit
            onSubmitEditing={() => sendMessage(input)}
            editable={!isTyping}
          />
          <Pressable
            style={[styles.sendBtn, (!input.trim() || isTyping) && styles.sendBtnDisabled]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
          >
            <Feather name="send" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
