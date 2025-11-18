/**
 * Practice Stats Screen
 * Shows detailed performance metrics and learning progress
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

interface SubjectStats {
  name: string;
  attempted: number;
  correct: number;
  accuracy: number;
  improvement: number;
}

interface DifficultyStats {
  level: 'easy' | 'medium' | 'hard';
  attempted: number;
  correct: number;
  accuracy: number;
}

export const PracticeStatsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Mock stats data
  const overallStats = {
    totalQuestionsAttempted: 245,
    correctAnswers: 187,
    accuracy: 76.3,
    bestStreak: 12,
    currentStreak: 5,
    totalTimeSpent: 3420, // seconds
    averageTimePerQuestion: 14, // seconds
  };

  const subjectStats: SubjectStats[] = [
    {
      name: 'Mathematics',
      attempted: 85,
      correct: 68,
      accuracy: 80,
      improvement: 12,
    },
    {
      name: 'Science',
      attempted: 95,
      correct: 71,
      accuracy: 74.7,
      improvement: -5,
    },
    {
      name: 'English',
      attempted: 65,
      correct: 48,
      accuracy: 73.8,
      improvement: 8,
    },
  ];

  const difficultyStats: DifficultyStats[] = [
    { level: 'easy', attempted: 80, correct: 75, accuracy: 93.75 },
    { level: 'medium', attempted: 120, correct: 85, accuracy: 70.8 },
    { level: 'hard', attempted: 45, correct: 27, accuracy: 60 },
  ];

  const [selectedTab, setSelectedTab] = useState<'subject' | 'difficulty'>('subject');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return Colors.success;
    if (accuracy >= 70) return '#F59E0B';
    return Colors.error;
  };

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return 'trending-up';
    if (improvement < 0) return 'trending-down';
    return 'trending-flat';
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return Colors.success;
    if (improvement < 0) return Colors.error;
    return Colors.textSecondary;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Performance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overall Score Card */}
        <View style={styles.scoreSection}>
          <Card variant="filled" style={styles.scoreCard}>
            <View style={styles.scoreContent}>
              {/* Main Score */}
              <View style={styles.mainScoreContainer}>
                <View
                  style={[
                    styles.scoreCircle,
                    {
                      borderColor: getAccuracyColor(overallStats.accuracy),
                    },
                  ]}
                >
                  <Text style={styles.scorePercentage}>
                    {Math.round(overallStats.accuracy)}%
                  </Text>
                  <Text style={styles.scoreLabel}>Accuracy</Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{overallStats.totalQuestionsAttempted}</Text>
                    <Text style={styles.statLabel}>Questions</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{overallStats.correctAnswers}</Text>
                    <Text style={styles.statLabel}>Correct</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{overallStats.bestStreak}</Text>
                    <Text style={styles.statLabel}>Best Streak</Text>
                  </View>
                </View>
              </View>

              {/* Time Stats */}
              <View style={styles.timeSection}>
                <View style={styles.timeItem}>
                  <MaterialIcons name="schedule" size={20} color={Colors.primary} />
                  <View style={[styles.flex1, styles.mlSm]}>
                    <Text style={styles.timeLabel}>Total Time Spent</Text>
                    <Text style={styles.timeValue}>
                      {formatTime(overallStats.totalTimeSpent)}
                    </Text>
                  </View>
                </View>
                <View style={styles.timeItem}>
                  <MaterialIcons name="timer" size={20} color={Colors.warning} />
                  <View style={[styles.flex1, styles.mlSm]}>
                    <Text style={styles.timeLabel}>Avg per Question</Text>
                    <Text style={styles.timeValue}>{overallStats.averageTimePerQuestion}s</Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Streak Section */}
        <View style={styles.streakSection}>
          <View style={styles.streakHeader}>
            <MaterialIcons name="local-fire-department" size={20} color={Colors.warning} />
            <Text style={styles.streakTitle}>Current Streak</Text>
          </View>
          <Card variant="filled" style={styles.streakCard}>
            <View style={styles.streakContent}>
              <View style={styles.streakItem}>
                <Text style={styles.streakValue}>{overallStats.currentStreak}</Text>
                <Text style={styles.streakLabel}>Days</Text>
              </View>
              <View style={styles.streakDivider} />
              <View style={styles.streakItem}>
                <Text style={styles.streakValue}>{overallStats.bestStreak}</Text>
                <Text style={styles.streakLabel}>Best</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Tabs */}
        <View style={styles.tabsSection}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'subject' && styles.tabActive]}
            onPress={() => setSelectedTab('subject')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'subject' && styles.tabTextActive,
              ]}
            >
              By Subject
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'difficulty' && styles.tabActive]}
            onPress={() => setSelectedTab('difficulty')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'difficulty' && styles.tabTextActive,
              ]}
            >
              By Difficulty
            </Text>
          </TouchableOpacity>
        </View>

        {/* Subject Stats */}
        {selectedTab === 'subject' && (
          <View style={styles.statsListSection}>
            {subjectStats.map((subject, index) => (
              <Card key={index} variant="filled" style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={styles.flex1}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.attemptedText}>
                      {subject.correct}/{subject.attempted} correct
                    </Text>
                  </View>
                  <View style={styles.accuracyContainer}>
                    <Text
                      style={[
                        styles.accuracyText,
                        { color: getAccuracyColor(subject.accuracy) },
                      ]}
                    >
                      {Math.round(subject.accuracy)}%
                    </Text>
                    <View
                      style={[
                        styles.improvementBadge,
                        {
                          backgroundColor:
                            subject.improvement > 0
                              ? Colors.success + '20'
                              : subject.improvement < 0
                              ? Colors.error + '20'
                              : Colors.gray100,
                        },
                      ]}
                    >
                      <MaterialIcons
                        name={getImprovementIcon(subject.improvement)}
                        size={14}
                        color={getImprovementColor(subject.improvement)}
                      />
                      <Text
                        style={[
                          styles.improvementText,
                          { color: getImprovementColor(subject.improvement) },
                        ]}
                      >
                        {Math.abs(subject.improvement)}%
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${subject.accuracy}%`,
                        backgroundColor: getAccuracyColor(subject.accuracy),
                      },
                    ]}
                  />
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Difficulty Stats */}
        {selectedTab === 'difficulty' && (
          <View style={styles.statsListSection}>
            {difficultyStats.map((stat, index) => (
              <Card key={index} variant="filled" style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={styles.flex1}>
                    <Text style={styles.subjectName}>
                      {stat.level.charAt(0).toUpperCase() + stat.level.slice(1)}
                    </Text>
                    <Text style={styles.attemptedText}>
                      {stat.correct}/{stat.attempted} correct
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.accuracyText,
                      { color: getAccuracyColor(stat.accuracy) },
                    ]}
                  >
                    {Math.round(stat.accuracy)}%
                  </Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${stat.accuracy}%`,
                        backgroundColor: getAccuracyColor(stat.accuracy),
                      },
                    ]}
                  />
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <View style={styles.tipsHeader}>
            <MaterialIcons name="lightbulb" size={20} color={Colors.warning} />
            <Text style={styles.tipsTitle}>Learning Tips</Text>
          </View>
          <Card variant="filled" style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>1</View>
              <Text style={styles.tipText}>Focus on weak areas - Practice more difficult questions</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>2</View>
              <Text style={styles.tipText}>Review explanations - Learn from your mistakes</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>3</View>
              <Text style={styles.tipText}>Consistent practice - Build your streak</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSpacer: { width: 24 },
  flex1: { flex: 1 },
  mlSm: { marginLeft: Spacing.sm },
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
  content: {
    flex: 1,
  },
  scoreSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  scoreCard: {
    padding: Spacing.lg,
  },
  scoreContent: {
    gap: Spacing.lg,
  },
  mainScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scorePercentage: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  scoreLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statsGrid: {
    flex: 1,
  },
  statItem: {
    marginBottom: Spacing.md,
  },
  statValue: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  timeSection: {
    gap: Spacing.md,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  timeValue: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  streakSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  streakTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  streakCard: {
    padding: Spacing.lg,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakItem: {
    flex: 1,
    alignItems: 'center',
  },
  streakValue: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.warning,
  },
  streakLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  streakDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.gray200,
  },
  tabsSection: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  statsListSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  statCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  subjectName: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  attemptedText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  accuracyContainer: {
    alignItems: 'flex-end',
  },
  accuracyText: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  improvementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.medium,
    gap: 2,
  },
  improvementText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  tipsSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tipsTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  tipsCard: {
    padding: Spacing.lg,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
  },
  tipText: {
    flex: 1,
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
});
