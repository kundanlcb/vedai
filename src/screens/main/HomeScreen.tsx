/**
 * Home Screen
 * Main dashboard screen showing student overview
 */

import React from 'react';
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
import { useAuth } from '../../context';

interface UpcomingExam {
  id: string;
  name: string;
  date: string;
  daysLeft: number;
}

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  // Memoized separator component
  const ItemSeparator = React.useMemo(
    () => () => <View style={styles.separator} />,
    []
  );

  // Mock data
  const upcomingExams: UpcomingExam[] = [
    {
      id: '1',
      name: 'Mathematics - Algebra',
      date: '2024-12-20',
      daysLeft: 7,
    },
    {
      id: '2',
      name: 'English - Literature',
      date: '2024-12-25',
      daysLeft: 12,
    },
    {
      id: '3',
      name: 'Science - Physics',
      date: '2024-12-28',
      daysLeft: 15,
    },
  ];

  const renderExamCard = ({ item }: { item: UpcomingExam }) => (
    <Card variant="elevated" style={styles.examCard}>
      <View style={styles.examCardContent}>
        <View style={styles.examInfo}>
          <Text style={styles.examTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.examDate}>{item.date}</Text>
        </View>
        <View style={styles.daysLeftBadge}>
          <Text style={styles.daysLeftText}>{item.daysLeft}</Text>
          <Text style={styles.daysLeftLabel}>days</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Home" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name}!
          </Text>
          <Text style={styles.encourageText}>
            Keep learning and achieving your goals
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statContent}>
              <View
                style={[styles.statIcon, { backgroundColor: Colors.primary + '20' }]}
              >
                <MaterialIcons
                  name="assignment"
                  size={28}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Assignments</Text>
            </View>
          </Card>

          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statContent}>
              <View
                style={[styles.statIcon, { backgroundColor: Colors.success + '20' }]}
              >
                <MaterialIcons
                  name="check-circle"
                  size={28}
                  color={Colors.success}
                />
              </View>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </Card>

          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statContent}>
              <View
                style={[styles.statIcon, { backgroundColor: Colors.warning + '20' }]}
              >
                <MaterialIcons
                  name="schedule"
                  size={28}
                  color={Colors.warning}
                />
              </View>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </Card>
        </View>

        {/* Upcoming Exams Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Exams</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={upcomingExams}
            renderItem={renderExamCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card variant="outlined" style={styles.activityCard}>
            <View style={styles.activityItem}>
              <MaterialIcons
                name="notification-important"
                size={24}
                color={Colors.primary}
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New Assignment Posted</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
          </Card>
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

  // Welcome Section
  welcomeSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  welcomeText: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  encourageText: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },

  // Sections
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.titleLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
  },

  // Exam Card
  examCard: {
    marginBottom: Spacing.sm,
  },
  examCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  examInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  examTitle: {
    fontSize: FontSizes.bodyLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  examDate: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
  },
  daysLeftBadge: {
    backgroundColor: Colors.primary + '20',
    borderRadius: BorderRadius.medium,
    padding: Spacing.sm,
    alignItems: 'center',
    minWidth: 50,
  },
  daysLeftText: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '700',
    color: Colors.primary,
  },
  daysLeftLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.primary,
  },

  separator: {
    height: Spacing.sm,
  },

  // Activity Card
  activityCard: {
    marginBottom: Spacing.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  activityTitle: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  activityTime: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});

