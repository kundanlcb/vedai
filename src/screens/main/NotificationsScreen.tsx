/**
 * Notifications Screen
 * Display all notifications and alerts
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Header, Card } from '../../components';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export const NotificationsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Assignment Due Soon',
      message: 'Your Mathematics assignment is due in 2 hours',
      type: 'warning',
      timestamp: '30 minutes ago',
      read: false,
    },
    {
      id: '2',
      title: 'Grade Posted',
      message: 'Your English exam has been graded. Score: 92/100',
      type: 'success',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '3',
      title: 'New Course Material',
      message: 'New lecture notes have been uploaded for Science',
      type: 'info',
      timestamp: '5 hours ago',
      read: true,
    },
    {
      id: '4',
      title: 'Class Cancelled',
      message: 'Physics class scheduled for today has been cancelled',
      type: 'warning',
      timestamp: 'Yesterday',
      read: true,
    },
    {
      id: '5',
      title: 'Event Reminder',
      message: 'Science fair registration closes tomorrow',
      type: 'info',
      timestamp: '2 days ago',
      read: true,
    },
  ]);

  // Memoized separator component
  const ItemSeparator = React.useMemo(
    () => () => <View style={styles.separator} />,
    []
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return 'info-outline';
      case 'warning':
        return 'warning-amber';
      case 'success':
        return 'check-circle-outline';
      case 'error':
        return 'error-outline';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info':
        return Colors.info;
      case 'warning':
        return Colors.warning;
      case 'success':
        return Colors.success;
      case 'error':
        return Colors.error;
      default:
        return Colors.primary;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const renderNotificationCard = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      onPress={() => handleMarkAsRead(item.id)}
      style={styles.notificationCardTouchable}
    >
      <Card
        variant="filled"
        style={
          !item.read
            ? [styles.notificationCard, styles.notificationCardUnread]
            : styles.notificationCard
        }
      >
        <View style={styles.notificationContent}>
          <View
            style={[
              styles.notificationIconContainer,
              { backgroundColor: getNotificationColor(item.type) + '20' },
            ]}
          >
            <MaterialIcons
              name={getNotificationIcon(item.type)}
              size={24}
              color={getNotificationColor(item.type)}
            />
          </View>

          <View style={styles.notificationInfo}>
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
            <Text style={styles.notificationTime}>{item.timestamp}</Text>
          </View>

          <TouchableOpacity
            onPress={() => handleDeleteNotification(item.id)}
            style={styles.deleteButton}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <Header title="Notifications" />
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={handleMarkAllAsRead}
            style={styles.markAllButton}
          >
            <Text style={styles.markAllButtonText}>
              Mark all as read ({unreadCount})
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {notifications.length > 0 ? (
            <FlatList
              data={notifications}
              renderItem={renderNotificationCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={ItemSeparator}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons
                name="notifications-off"
                size={48}
                color={Colors.gray300}
              />
              <Text style={styles.emptyStateText}>No notifications yet</Text>
              <Text style={styles.emptyStateSubtext}>
                You're all caught up!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  markAllButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  markAllButtonText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },

  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  // Notification Card
  notificationCardTouchable: {
    marginBottom: Spacing.sm,
  },
  notificationCard: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  notificationCardUnread: {
    backgroundColor: Colors.primary + '10',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },

  // Icon Container
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },

  // Info
  notificationInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  notificationTitle: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  notificationMessage: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textTertiary,
  },

  // Delete Button
  deleteButton: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
    flexShrink: 0,
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
    fontWeight: '500',
  },
  emptyStateSubtext: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textTertiary,
    marginTop: Spacing.sm,
  },
});

