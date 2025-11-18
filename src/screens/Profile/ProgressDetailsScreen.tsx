/**
 * Progress Details Screen
 * Shows detailed study progress analytics and charts
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';


interface SubjectProgress {
  name: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  chaptersCompleted: number;
  chaptersTotal: number;
  timeSpent: number;
  lastAccessed: string;
}

export const ProgressDetailsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Mock progress data
  const overallProgress = {
    profileCompleteness: 85,
    coursesStarted: 4,
    coursesCompleted: 1,
    lessonsCompleted: 42,
    totalLessons: 120,
    chaptersCompleted: 12,
    totalChapters: 45,
    totalStudyTime: 28800, // seconds (8 hours)
  };

  const subjectProgress: SubjectProgress[] = [
    {
      name: 'Mathematics',
      lessonsCompleted: 18,
      lessonsTotal: 30,
      chaptersCompleted: 5,
      chaptersTotal: 10,
      timeSpent: 14400, // 4 hours
      lastAccessed: '2 hours ago',
    },
    {
      name: 'Science',
      lessonsCompleted: 12,
      lessonsTotal: 28,
      chaptersCompleted: 4,
      chaptersTotal: 9,
      timeSpent: 10800, // 3 hours
      lastAccessed: '1 day ago',
    },
    {
      name: 'English',
      lessonsCompleted: 8,
      lessonsTotal: 25,
      chaptersCompleted: 2,
      chaptersTotal: 8,
      timeSpent: 3600, // 1 hour
      lastAccessed: '3 days ago',
    },
    {
      name: 'Social Studies',
      lessonsCompleted: 4,
      lessonsTotal: 37,
      chaptersCompleted: 1,
      chaptersTotal: 18,
      timeSpent: 0,
      lastAccessed: 'Not started',
    },
  ];

  const [selectedTimeFrame, setSelectedTimeFrame] = useState<'week' | 'month' | 'all'>('week');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Progress</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overall Progress Card */}
        <View style={styles.overallSection}>
          <Card variant="filled" style={styles.overallCard}>
            <View style={styles.overallHeader}>
              <Text style={styles.overallTitle}>Overall Progress</Text>
              <View style={styles.overallPercentage}>
                <Text style={styles.overallPercentageValue}>
                  {getProgressPercentage(
                    overallProgress.lessonsCompleted,
                    overallProgress.totalLessons
                  )}
                </Text>
                <Text style={styles.overallPercentageLabel}>%</Text>
              </View>
            </View>

            {/* Main Progress Bar */}
            <View style={styles.mainProgressBar}>
              <View
                style={[
                  styles.mainProgressFill,
                  {
                    width: `${getProgressPercentage(
                      overallProgress.lessonsCompleted,
                      overallProgress.totalLessons
                    )}%`,
                  },
                ]}
              />
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{overallProgress.chaptersCompleted}</Text>
                <Text style={styles.statLabel}>Chapters Done</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{overallProgress.coursesStarted}</Text>
                <Text style={styles.statLabel}>Courses Started</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {formatTime(overallProgress.totalStudyTime)}
                </Text>
                <Text style={styles.statLabel}>Study Time</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Time Frame Selector */}
        <View style={styles.timeFrameSection}>
          {(['week', 'month', 'all'] as const).map(frame => (
            <TouchableOpacity
              key={frame}
              style={[styles.timeFrameButton, selectedTimeFrame === frame && styles.timeFrameButtonActive]}
              onPress={() => setSelectedTimeFrame(frame)}
            >
              <Text
                style={[
                  styles.timeFrameText,
                  selectedTimeFrame === frame && styles.timeFrameTextActive,
                ]}
              >
                {frame === 'week' ? 'This Week' : frame === 'month' ? 'This Month' : 'All Time'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subject-wise Progress */}
        <View style={styles.subjectsSection}>
          <View style={styles.subjectsHeader}>
            <Text style={styles.subjectsTitle}>Subject Progress</Text>
            <TouchableOpacity>
              <MaterialIcons name="info-outline" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {subjectProgress.map((subject, index) => {
            const chapterProgress = getProgressPercentage(
              subject.chaptersCompleted,
              subject.chaptersTotal
            );
            const lessonProgress = getProgressPercentage(
              subject.lessonsCompleted,
              subject.lessonsTotal
            );

            return (
              <Card key={index} variant="filled" style={styles.subjectCard}>
                {/* Subject Header */}
                <View style={styles.subjectHeaderContent}>
                  <View style={styles.subjectHeaderText}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.lastAccessedText}>
                      Last accessed: {subject.lastAccessed}
                    </Text>
                  </View>
                  {subject.timeSpent > 0 && (
                    <View style={styles.timeSpentBadge}>
                      <MaterialIcons name="schedule" size={14} color={Colors.warning} />
                      <Text style={styles.timeSpentText}>{formatTime(subject.timeSpent)}</Text>
                    </View>
                  )}
                </View>

                {/* Chapter Progress */}
                <View style={styles.progressItem}>
                  <View style={styles.progressItemHeader}>
                    <View style={styles.progressItemIcon}>
                      <MaterialIcons name="book" size={16} color={Colors.primary} />
                    </View>
                    <Text style={styles.progressItemLabel}>Chapters</Text>
                    <Text style={styles.progressItemValue}>
                      {subject.chaptersCompleted}/{subject.chaptersTotal}
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${chapterProgress}%`,
                          backgroundColor: Colors.primary,
                        },
                      ]}
                    />
                  </View>
                </View>

                {/* Lesson Progress */}
                <View style={styles.progressItem}>
                  <View style={styles.progressItemHeader}>
                    <View style={styles.progressItemIcon}>
                      <MaterialIcons name="description" size={16} color={Colors.success} />
                    </View>
                    <Text style={styles.progressItemLabel}>Lessons</Text>
                    <Text style={styles.progressItemValue}>
                      {subject.lessonsCompleted}/{subject.lessonsTotal}
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${lessonProgress}%`,
                          backgroundColor: Colors.success,
                        },
                      ]}
                    />
                  </View>
                </View>
              </Card>
            );
          })}
        </View>

        {/* Learning Goals Section */}
        <View style={styles.goalsSection}>
          <Text style={styles.goalsTitle}>Learning Goals</Text>
          <Card variant="filled" style={styles.goalCard}>
            <View style={styles.goalItem}>
              <View style={styles.goalCheckbox}>
                <MaterialIcons name="check-circle" size={24} color={Colors.success} />
              </View>
              <View style={styles.goalItemText}>
                <Text style={styles.goalText}>Complete 50 lessons</Text>
                <Text style={styles.goalProgress}>42 of 50 completed</Text>
              </View>
              <Text style={styles.goalPercentage}>84%</Text>
            </View>

            <View style={styles.goalItem}>
              <View style={styles.goalCheckbox}>
                <View style={styles.goalCheckboxEmpty} />
              </View>
              <View style={styles.goalItemText}>
                <Text style={styles.goalText}>Study 40 hours</Text>
                <Text style={styles.goalProgress}>8 hours of 40 completed</Text>
              </View>
              <Text style={styles.goalPercentage}>20%</Text>
            </View>

            <View style={styles.goalItemLast}>
              <View style={styles.goalCheckbox}>
                <View style={styles.goalCheckboxEmpty} />
              </View>
              <View style={styles.goalItemText}>
                <Text style={styles.goalText}>Maintain 90% accuracy</Text>
                <Text style={styles.goalProgress}>Current: 76% accuracy</Text>
              </View>
              <Text style={styles.goalPercentage}>84%</Text>
            </View>
          </Card>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.recommendationsTitle}>Recommended Actions</Text>
          <Card variant="filled" style={styles.recommendationCard}>
            <View style={styles.recommendationItem}>
              <View style={styles.recommendationIconBox}>
                <MaterialIcons name="lightbulb" size={20} color={Colors.warning} />
              </View>
              <View style={styles.recommendationItemText}>
                <Text style={styles.recommendationText}>
                  Start Social Studies - you haven't begun this subject yet
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="arrow-forward" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.recommendationItem}>
              <View style={styles.recommendationIconBox}>
                <MaterialIcons name="trending-down" size={20} color={Colors.error} />
              </View>
              <View style={styles.recommendationItemText}>
                <Text style={styles.recommendationText}>
                  Improve English - focus on difficult chapters
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="arrow-forward" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.recommendationItemLast}>
              <View style={styles.recommendationIconBox}>
                <MaterialIcons name="repeat" size={20} color={Colors.success} />
              </View>
              <View style={styles.recommendationItemText}>
                <Text style={styles.recommendationText}>
                  Great progress in Mathematics! Keep it up
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="arrow-forward" size={20} color={Colors.primary} />
              </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  headerTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  headerPlaceholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  overallSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  overallCard: {
    padding: Spacing.lg,
  },
  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  overallTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  overallPercentage: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  overallPercentageValue: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.primary,
  },
  overallPercentageLabel: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 2,
  },
  mainProgressBar: {
    height: 12,
    backgroundColor: Colors.gray200,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  mainProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.primary + '10',
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  timeFrameSection: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  timeFrameButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  timeFrameButtonActive: {
    borderBottomColor: Colors.primary,
  },
  timeFrameText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  timeFrameTextActive: {
    color: Colors.primary,
  },
  subjectsSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  subjectsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  subjectsTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  subjectCard: {
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  subjectHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  subjectHeaderText: {
    flex: 1,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  subjectName: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  lastAccessedText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  timeSpentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.medium,
    gap: 4,
  },
  timeSpentText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.warning,
  },
  progressItem: {
    marginBottom: Spacing.md,
  },
  progressItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  progressItemIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressItemLabel: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  progressItemValue: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  goalsSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  goalsTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  goalCard: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    gap: Spacing.md,
  },
  goalCheckbox: {
    width: 24,
    height: 24,
  },
  goalCheckboxEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray300,
  },
  goalItemText: {
    flex: 1,
  },
  goalItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  goalText: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  goalProgress: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  goalPercentage: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.primary,
  },
  recommendationsSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  recommendationsTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  recommendationCard: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    gap: Spacing.md,
  },
  recommendationIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationItemText: {
    flex: 1,
  },
  recommendationItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  recommendationText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
});

