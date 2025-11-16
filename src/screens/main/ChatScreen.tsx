/**
 * Chat Screen
 * Messaging and communication with instructors/peers
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Header, Card } from '../../components';

interface ChatConversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Memoized separator component
  const ItemSeparator = React.useMemo(
    () => () => <View style={styles.separator} />,
    []
  );

  // Mock data
  const conversations: ChatConversation[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      avatar: 'person',
      lastMessage: 'Great work on your assignment!',
      timestamp: '2:30 PM',
      unread: 0,
    },
    {
      id: '2',
      name: 'John Doe',
      avatar: 'person',
      lastMessage: 'Did you complete the homework?',
      timestamp: '1:45 PM',
      unread: 2,
    },
    {
      id: '3',
      name: 'Study Group',
      avatar: 'group',
      lastMessage: 'Let\'s meet tomorrow at 4 PM',
      timestamp: 'Yesterday',
      unread: 0,
    },
    {
      id: '4',
      name: 'Prof. Michael Brown',
      avatar: 'person',
      lastMessage: 'Your project looks impressive',
      timestamp: '3 days ago',
      unread: 0,
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversationCard = ({ item }: { item: ChatConversation }) => (
    <TouchableOpacity style={styles.conversationCardTouchable}>
      <Card
        variant="filled"
        style={
          item.unread > 0
            ? [styles.conversationCard, styles.conversationCardUnread]
            : styles.conversationCard
        }
      >
        <View style={styles.conversationContent}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <MaterialIcons
                name={item.avatar}
                size={24}
                color={Colors.white}
              />
            </View>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>

          <View style={styles.messageInfo}>
            <Text style={styles.conversationName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text
              style={[
                styles.lastMessage,
                item.unread > 0 && styles.unreadMessage,
              ]}
              numberOfLines={1}
            >
              {item.lastMessage}
            </Text>
          </View>

          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Messages" />

      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={24}
          color={Colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons
              name="close"
              size={24}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {filteredConversations.length > 0 ? (
            <FlatList
              data={filteredConversations}
              renderItem={renderConversationCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={ItemSeparator}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons
                name="message"
                size={48}
                color={Colors.gray300}
              />
              <Text style={styles.emptyStateText}>No conversations found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons
          name="add"
          size={28}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Search Container
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.bodyMedium,
    color: Colors.textPrimary,
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  // Conversation Card
  conversationCardTouchable: {
    marginBottom: Spacing.sm,
  },
  conversationCard: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  conversationCardUnread: {
    backgroundColor: Colors.primary + '10',
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },

  // Avatar Section
  avatarSection: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  unreadText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
    color: Colors.white,
  },

  // Message Info
  messageInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  conversationName: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  lastMessage: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
  },
  unreadMessage: {
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  // Timestamp
  timestamp: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },

  separator: {
    height: Spacing.sm,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyStateText: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

