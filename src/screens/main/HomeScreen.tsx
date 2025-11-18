/**
 * Home Screen
 * Student dashboard with daily progress, subjects, and question banks
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';
import { useAuth } from '../../context';

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: number;
  progress: number;
}

interface QuestionBank {
  id: string;
  subject: string;
  count: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  color: string;
}

interface DailyGoal {
  id: string;
  label: string;
  target: number;
  current: number;
  unit: string;
  icon: string;
  color: string;
}

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [dailyGoals] = useState<DailyGoal[]>([
    {
      id: '1',
      label: 'Minutes Studied',
      target: 120,
      current: 85,
      unit: 'min',
      icon: 'schedule',
      color: Colors.primary,
    },
    {
      id: '2',
      label: 'Chapters',
      target: 2,
      current: 1,
      unit: 'ch',
      icon: 'book',
      color: '#4ECDC4',
    },
    {
      id: '3',
      label: 'Questions',
      target: 20,
      current: 12,
      unit: 'q',
      icon: 'quiz',
      color: '#FF6B6B',
    },
  ]);

  const subjects: Subject[] = [
    {
      id: '1',
      name: 'Mathematics',
      icon: 'calculate',
      color: '#FF6B6B',
      chapters: 15,
      progress: 60,
    },
    {
      id: '2',
      name: 'Science',
      icon: 'science',
      color: '#4ECDC4',
      chapters: 18,
      progress: 45,
    },
    {
      id: '3',
      name: 'English',
      icon: 'language',
      color: '#FFB84D',
      chapters: 12,
      progress: 75,
    },
    {
      id: '4',
      name: 'Social Studies',
      icon: 'public',
      color: '#95E1D3',
      chapters: 20,
      progress: 30,
    },
  ];

  const questionBanks: QuestionBank[] = [
    {
      id: '1',
      subject: 'Mathematics',
      count: 450,
      difficulty: 'mixed',
      color: '#FF6B6B',
    },
    {
      id: '2',
      subject: 'Science',
      count: 380,
      difficulty: 'mixed',
      color: '#4ECDC4',
    },
    {
      id: '3',
      subject: 'English',
      count: 250,
      difficulty: 'mixed',
      color: '#FFB84D',
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return Colors.success;
      case 'medium':
        return Colors.warning;
      case 'hard':
        return Colors.error;
      case 'mixed':
        return Colors.primary;
      default:
        return Colors.primary;
    }
  };

  const renderDailyGoal = ({ item, index }: { item: DailyGoal; index: number }) => {
    const progress = item.current / item.target;
    const isCompleted = progress >= 1;
    const isFirstCard = index === 0;

    if (isFirstCard) {
      return (
        <Card variant="filled" style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={[styles.goalIcon, { backgroundColor: item.color + '20' }]}>
              <MaterialIcons
                name={item.icon as any}
                size={20}
                color={item.color}
              />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalLabel}>{item.label}</Text>
              <Text style={styles.goalProgress}>
                {item.current}/{item.target} {item.unit}
              </Text>
            </View>
            {isCompleted && (
              <MaterialIcons
                name="check-circle"
                size={24}
                color={Colors.success}
              />
            )}
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(progress * 100, 100)}%`,
                  backgroundColor: isCompleted ? Colors.success : item.color,
                },
              ]}
            />
          </View>
        </Card>
      );
    }

    // Circular tile for remaining goals
    return (
      <View style={styles.circularGoalTile}>
        <View style={styles.circularGoalProgressContainer}>
          {/* Background circle with light color */}
          <View
            style={[
              styles.circularGoalProgressBg,
              { borderColor: item.color + '30', backgroundColor: item.color + '10' },
            ]}
          />

          {/* Progress arc overlay - only bottom */}
          <Animated.View
            style={[
              styles.circularGoalProgress,
              {
                borderBottomColor: item.color,
                transform: [
                  {
                    rotate: `${progress * 360}deg`,
                  },
                ],
              },
            ]}
          />

          {/* Center content */}
          <View style={styles.circularGoalContentCenter}>
            <MaterialIcons
              name={item.icon as any}
              size={20}
              color={item.color}
            />
          </View>
        </View>
        <Text style={styles.circularGoalLabel}>{item.label}</Text>
      </View>
    );
  };

  const renderSubject = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={styles.subjectTile}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('SubjectDetail', { subject: item })}
    >
      <View style={[styles.subjectIcon, { backgroundColor: item.color + '18' }]}>
        <MaterialIcons
          name={item.icon as any}
          size={40}
          color={item.color}
        />
      </View>
      <Text style={styles.subjectName} numberOfLines={1}>{item.name}</Text>
      <View style={styles.subjectMeta}>
        <Text style={styles.subjectChapters}>{item.chapters} ch</Text>
        <View style={styles.progressPill}>
          <Text style={styles.progressPillText}>{item.progress}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuestionBank = ({ item }: { item: QuestionBank }) => (
    <TouchableOpacity
      style={[styles.bankCard, { borderLeftColor: item.color, borderLeftWidth: 4 }]}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('QuestionBankDetail', { questionBank: item })}
    >
      <View style={styles.bankHeader}>
        <Text style={styles.bankSubject}>{item.subject}</Text>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(item.difficulty) + '20' },
          ]}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: getDifficultyColor(item.difficulty) },
            ]}
          >
            {item.difficulty}
          </Text>
        </View>
      </View>
      <Text style={styles.bankCount}>{item.count} questions</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Minimal Header */}
      <View style={styles.statusBar} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingContainer}>
            <View style={styles.profilePicture}>
              {user?.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.profileInitial}>
                  {user?.name?.charAt(0).toUpperCase() || 'S'}
                </Text>
              )}
            </View>
            <View style={styles.greetingText}>
              <Text style={styles.greeting}>
                {getGreeting()}, {user?.name?.split(' ')[0]}!
              </Text>
              <Text style={styles.encouragement}>
                Stay consistent with your daily goals 🎯
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Progress Tracker */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Goals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
              <Text style={styles.seeAll}>Edit</Text>
            </TouchableOpacity>
          </View>
          {/* First goal card */}
          {dailyGoals.length > 0 && renderDailyGoal({ item: dailyGoals[0], index: 0 })}

          {/* Remaining goals in horizontal row */}
          {dailyGoals.length > 1 && (
            <View style={styles.horizontalGoalsRow}>
              <FlatList
                data={dailyGoals.slice(1)}
                renderItem={({ item, index }) => renderDailyGoal({ item, index: index + 1 })}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </View>

        {/* Subjects */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Subjects</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ExamTab')}>
              <Text style={styles.seeAll}>Browse all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={subjects}
            renderItem={renderSubject}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={styles.subjectGrid}
          />
        </View>

        {/* Question Banks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Practice Question Banks</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ExamTab')}>
              <Text style={styles.seeAll}>All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={questionBanks}
            renderItem={renderQuestionBank}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
          />
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
  statusBar: {
    backgroundColor: Colors.background,
    height: 0,
  },
  scrollView: {
    flex: 1,
  },

  // Greeting
  greetingSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  profilePicture: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: Spacing.xs,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  profileInitial: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.white,
  },
  greetingText: {
    flex: 1,
  },
  greeting: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  encouragement: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
  },

  // Daily Goals
  goalCard: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: 0,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalInfo: {
    flex: 1,
  },
  goalLabel: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  goalProgress: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  horizontalGoalCard: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: 0,
    marginBottom: 0,
    overflow: 'hidden',
  },
  horizontalGoalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  horizontalGoalInfo: {
    flex: 1,
  },
  horizontalProgressBarContainer: {
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
    overflow: 'hidden',
  },

  // Circular Goal Tiles
  horizontalGoalsRow: {
    marginTop: Spacing.md,
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  circularGoalTile: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
    minWidth: 90,
  },
  circularGoalProgressContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  circularGoalProgressBg: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderWidth: 2,
    borderRadius: 32,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularGoalProgress: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderWidth: 2,
    borderRadius: 32,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularGoalContentCenter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.gray100,
  },
  circularGoalLabel: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    maxWidth: 90,
  },

  // Section
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
  seeAll: {
    fontSize: FontSizes.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
  },

  // Subjects
  subjectGrid: {
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  subjectTile: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray100,
    minWidth: 0,
  },
  subjectIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  subjectName: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    width: '100%',
  },
  subjectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  subjectChapters: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  progressPill: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    backgroundColor: Colors.gray100,
    borderRadius: BorderRadius.large,
  },
  progressPillText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  // Question Banks
  bankCard: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.medium,
    marginBottom: 0,
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  bankSubject: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
  },
  difficultyText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bankCount: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
  },
});

