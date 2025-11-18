/**
 * Question Bank Detail Screen
 * Shows questions organized by chapters
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

interface Question {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  solved: boolean;
}

interface ChapterQuestions {
  chapter: string;
  data: Question[];
}

export const QuestionBankDetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { questionBank } = route.params as { questionBank: any };

  // Mock questions organized by chapter
  const [sections] = useState<ChapterQuestions[]>([
    {
      chapter: 'Chapter 1: Basics',
      data: [
        { id: 'q1', title: 'What is the fundamental concept?', difficulty: 'easy', solved: true },
        { id: 'q2', title: 'Explain the basic principles', difficulty: 'easy', solved: true },
        { id: 'q3', title: 'Define key terms', difficulty: 'medium', solved: false },
      ],
    },
    {
      chapter: 'Chapter 2: Intermediate',
      data: [
        { id: 'q4', title: 'Apply concepts to examples', difficulty: 'medium', solved: true },
        { id: 'q5', title: 'Analyze the problem', difficulty: 'medium', solved: true },
        { id: 'q6', title: 'Solve complex scenarios', difficulty: 'hard', solved: false },
      ],
    },
    {
      chapter: 'Chapter 3: Advanced',
      data: [
        { id: 'q7', title: 'Critical thinking question', difficulty: 'hard', solved: false },
        { id: 'q8', title: 'Multi-step problem solving', difficulty: 'hard', solved: false },
        { id: 'q9', title: 'Integration and synthesis', difficulty: 'hard', solved: false },
      ],
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return Colors.success;
      case 'medium':
        return Colors.warning;
      case 'hard':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const totalQuestions = sections.reduce((sum, sec) => sum + sec.data.length, 0);
  const solvedQuestions = sections.reduce(
    (sum, sec) => sum + sec.data.filter(q => q.solved).length,
    0
  );

  const renderQuestion = ({ item }: { item: Question }) => (
    <TouchableOpacity
      style={styles.questionCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ExamTab')}
    >
      <View style={styles.questionHeader}>
        <View style={styles.flex1}>
          <Text style={styles.questionTitle}>{item.title}</Text>
          <View style={styles.questionMeta}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(item.difficulty) + '15' },
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
            {item.solved && (
              <View style={styles.solvedBadge}>
                <MaterialIcons name="check" size={12} color={Colors.success} />
                <Text style={styles.solvedText}>Solved</Text>
              </View>
            )}
          </View>
        </View>
        <MaterialIcons
          name={item.solved ? 'check-circle' : 'radio-button-unchecked'}
          size={24}
          color={item.solved ? Colors.success : Colors.gray300}
        />
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: ChapterQuestions }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.chapter}</Text>
      <Text style={styles.sectionCount}>{section.data.length} questions</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.flex1}>
          <Text style={styles.headerTitle}>{questionBank.subject}</Text>
          <Text style={styles.headerSubtitle}>Question Bank</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        <View style={styles.section}>
          <Card variant="filled" style={styles.statsCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total</Text>
                <Text style={styles.statNumber}>{totalQuestions}</Text>
                <Text style={styles.statUnit}>Questions</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Solved</Text>
                <Text style={[styles.statNumber, { color: Colors.success }]}>{solvedQuestions}</Text>
                <Text style={styles.statUnit}>Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Progress</Text>
                <Text style={[styles.statNumber, { color: Colors.primary }]}>
                  {Math.round((solvedQuestions / totalQuestions) * 100)}%
                </Text>
                <Text style={styles.statUnit}>Complete</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${(solvedQuestions / totalQuestions) * 100}%`,
                    backgroundColor: Colors.primary,
                  },
                ]}
              />
            </View>
          </Card>
        </View>

        {/* Questions by Chapter */}
        <View style={styles.section}>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={renderQuestion}
            renderSectionHeader={renderSectionHeader}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
            SectionSeparatorComponent={() => <View style={{ height: Spacing.lg }} />}
          />
        </View>
      </ScrollView>

      {/* Start Practice Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ExamTab')}
        >
          <MaterialIcons name="play-arrow" size={20} color={Colors.white} />
          <Text style={styles.startButtonText}>Start Practice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
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
    gap: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.lg,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsCard: {
    padding: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  statNumber: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statUnit: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: Colors.gray200,
    marginHorizontal: Spacing.md,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  sectionCount: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  questionCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.gray100,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  questionTitle: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.medium,
  },
  difficultyText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  solvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    backgroundColor: Colors.success + '15',
    borderRadius: BorderRadius.medium,
    gap: 2,
  },
  solvedText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.success,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  startButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
});

