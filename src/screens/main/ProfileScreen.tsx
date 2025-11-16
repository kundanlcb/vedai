/**
 * Profile Screen
 * User profile, settings, and preferences - minimal design matching HomeScreen
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';
import { useAuth } from '../../context';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  onPress: () => void;
}

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = React.useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => logout(),
          style: 'destructive',
        },
      ]
    );
  };

  const menuItems: MenuItem[] = [
    {
      id: '1',
      icon: 'edit',
      label: 'Edit Profile',
      onPress: () => {},
    },
    {
      id: '2',
      icon: 'lock',
      label: 'Change Password',
      onPress: () => {},
    },
    {
      id: '3',
      icon: 'help',
      label: 'Help & Support',
      onPress: () => {},
    },
    {
      id: '4',
      icon: 'info',
      label: 'About VedAI',
      onPress: () => {},
    },
  ];

  const renderMenuItem = (item: MenuItem, isLast: boolean) => (
    <View key={item.id}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuLeft}>
          <View style={styles.menuIcon}>
            <MaterialIcons
              name={item.icon as any}
              size={20}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.menuLabel}>{item.label}</Text>
        </View>
        <MaterialIcons
          name="chevron-right"
          size={20}
          color={Colors.gray400}
        />
      </TouchableOpacity>
      {!isLast && <View style={styles.menuDivider} />}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.titleBar}>
        <Text style={styles.screenTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info Card */}
        <View style={styles.section}>
          <Card variant="elevated" style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <MaterialIcons
                  name="account-circle"
                  size={56}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.class}>Student • Class 10</Text>
                <Text style={styles.email}>{user?.email}</Text>
              </View>
              <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Chapters</Text>
            </View>
          </Card>
          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Average</Text>
            </View>
          </Card>
          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>24h</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
          </Card>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Card variant="filled">
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <MaterialIcons
                  name="notifications"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.preferenceLabel}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{
                  false: Colors.gray300,
                  true: Colors.primary + '40',
                }}
                thumbColor={notifications ? Colors.primary : Colors.gray400}
              />
            </View>
          </Card>
        </View>

        {/* Settings Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Card variant="filled">
            {menuItems.map((item, idx) => renderMenuItem(item, idx === menuItems.length - 1))}
          </Card>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="logout"
              size={18}
              color={Colors.error}
            />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.version}>VedAI v1.0.0</Text>
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

  // Header
  titleBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  screenTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  scrollView: {
    flex: 1,
  },

  // Profile Card
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  profileCard: {
    overflow: 'hidden',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  class: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  email: {
    fontSize: FontSizes.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.white,
  },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.headlineMedium,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },

  // Section
  sectionTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },

  // Preference
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  preferenceLabel: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '500',
    color: Colors.textPrimary,
  },

  // Menu Items
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.gray100,
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error + '15',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '600',
    color: Colors.error,
  },

  // Footer
  footer: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  version: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textTertiary,
  },
});

