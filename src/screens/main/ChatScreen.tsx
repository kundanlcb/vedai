/**
 * Chat Screen (VedAI Assistant)
 * AI-powered Q&A with source citations
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    title: string;
    snippet: string;
    relevance: number;
  }>;
  timestamp: Date;
}

export const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: inputText,
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setInputText('');
      setIsLoading(true);

      // Simulate API response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'This is a helpful answer based on your question. I\'ve found relevant information from your curriculum materials.',
          sources: [
            {
              title: 'Chapter 5: Quadratic Equations',
              snippet: 'A quadratic equation is of the form ax² + bx + c = 0',
              relevance: 0.95,
            },
            {
              title: 'Mathematics Textbook',
              snippet: 'Solutions can be found using the discriminant method',
              relevance: 0.87,
            },
          ],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.role === 'user' ? styles.userMessage : styles.assistantMessage,
      ]}
    >
      {message.role === 'assistant' && (
        <View style={styles.assistantAvatar}>
          <MaterialIcons
            name="smart-toy"
            size={20}
            color={Colors.primary}
          />
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          message.role === 'user'
            ? styles.userBubble
            : styles.assistantBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.role === 'user' && styles.userText,
          ]}
        >
          {message.content}
        </Text>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <View style={styles.sourcesContainer}>
            <Text style={styles.sourcesLabel}>Sources:</Text>
            {message.sources.map((source, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.sourceItem}
              >
                <MaterialIcons
                  name="description"
                  size={14}
                  color={Colors.primary}
                />
                <View style={styles.sourceInfo}>
                  <Text style={styles.sourceTitle}>{source.title}</Text>
                  <Text style={styles.sourceSnippet}>{source.snippet}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Minimal Header */}
      <View style={styles.titleBar}>
        <Text style={styles.screenTitle}>VedAI</Text>
      </View>

      {/* Messages */}
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <MaterialIcons
              name="smart-toy"
              size={56}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.emptyTitle}>Hello! I'm VedAI</Text>
          <Text style={styles.emptySubtitle}>
            Ask me anything about your studies
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.messagesList}>
            {messages.map(renderMessage)}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={Colors.primary} size="small" />
                <Text style={styles.loadingText}>VedAI is thinking...</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* Input */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom || Spacing.md }]}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor={Colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <MaterialIcons
              name="send"
              size={20}
              color={inputText.trim() && !isLoading ? Colors.white : Colors.gray300}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>Powered by AI • Always factual</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  screenTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Messages
  messagesContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  messagesList: {
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: Spacing.xs,
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  assistantMessage: {
    justifyContent: 'flex-start',
  },
  assistantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.large,
  },
  userBubble: {
    backgroundColor: Colors.primary,
  },
  assistantBubble: {
    backgroundColor: Colors.gray100,
  },
  messageText: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  userText: {
    color: Colors.white,
  },

  // Sources
  sourcesContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray300,
    gap: Spacing.sm,
  },
  sourcesLabel: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  sourceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  sourceInfo: {
    flex: 1,
  },
  sourceTitle: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  sourceSnippet: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  // Loading
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  loadingText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
  },

  // Input
  inputContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: Colors.gray100,
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.bodyMedium,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.gray100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.gray200,
  },
  hint: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
});
