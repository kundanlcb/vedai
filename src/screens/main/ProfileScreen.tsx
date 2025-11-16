/**
 * Profile Screen
 * User profile information and settings
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Header, Card } from '../../components';
import { useAuth } from '../../context';

interface ProfileMenuItem {
  id: string;
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
}

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const profileMenuItems: ProfileMenuItem[] = [
    {
      id: '1',
      icon: 'edit',
      label: 'Edit Profile',
      onPress: () => console.log('Edit Profile'),
    },
    {
      id: '2',
      icon: 'lock',
      label: 'Change Password',
      onPress: () => console.log('Change Password'),
    },
    {
      id: '3',
      icon: 'download',
      label: 'Download Resources',
      onPress: () => console.log('Download Resources'),
    },
    {
      id: '4',
      icon: 'help-outline',
      label: 'Help & Support',
      onPress: () => console.log('Help & Support'),
    },
    {
      id: '5',
      icon: 'info-outline',
      label: 'About',
      onPress: () => console.log('About'),
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Profile" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileSection}>
          <Card variant="elevated" style={styles.profileCard}>
            <View style={styles.profileContent}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <MaterialIcons
                    name="account-circle"
                    size={64}
                    color={Colors.primary}
                  />
                </View>
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
                <View style={styles.roleBadge}>
                  <MaterialIcons
                    name="school"
                    size={14}
                    color={Colors.white}
                  />
                  <Text style={styles.roleBadgeText}>Student</Text>
                </View>
              </View>
            </View>

            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Courses</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8.5</Text>
                <Text style={styles.statLabel}>GPA</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>95%</Text>
                <Text style={styles.statLabel}>Attendance</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Card variant="filled">
            <View style={styles.notificationItem}>
              <View style={styles.notificationLeft}>
                <MaterialIcons
                  name="notifications"
                  size={24}
                  color={Colors.primary}
                />
                <Text style={styles.notificationLabel}>
                  Enable Notifications
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{
                  false: Colors.gray300,
                  true: Colors.primary + '40',
                }}
                thumbColor={notificationsEnabled ? Colors.primary : Colors.gray400}
              />
            </View>
          </Card>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {profileMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              style={styles.menuItemTouchable}
            >
              <Card variant="filled">
                <View style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <MaterialIcons
                        name={item.icon}
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color={Colors.textSecondary}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <MaterialIcons
              name="logout"
              size={24}
              color={Colors.error}
            />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },

  // Profile Section
  profileSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  profileCard: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  profileContent: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  avatarContainer: {
    marginRight: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: FontSizes.titleLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.large,
    alignSelf: 'flex-start',
    gap: Spacing.xs,
  },
  roleBadgeText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },

  // Stats
  profileStats: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.titleLarge,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.gray200,
  },

  // Sections
  section: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },

  // Notification Item
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  notificationLabel: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '500',
    color: Colors.textPrimary,
  },

  // Menu Items
  menuItemTouchable: {
    marginBottom: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '500',
    color: Colors.textPrimary,
  },

  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.error + '15',
    borderRadius: BorderRadius.medium,
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  logoutButtonText: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '600',
    color: Colors.error,
  },
});

