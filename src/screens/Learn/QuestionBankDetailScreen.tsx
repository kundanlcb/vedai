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
  type: 'mcq' | 'subjective' | 'true-false' | 'fill-blank' | 'match';
  difficulty: 'easy' | 'medium' | 'hard';
  solved: boolean;
  options?: string[]; // For MCQ
  correctAnswer?: string; // For any type
  answer?: string; // For subjective
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

  // Mock questions organized by chapter with different types
  const [sections] = useState<ChapterQuestions[]>([
    {
      chapter: 'Chapter 1: Basics',
      data: [
        {
          id: 'q1',
          title: 'What is the fundamental concept of photosynthesis?',
          type: 'mcq',
          options: ['Energy conversion', 'Nutrient absorption', 'Water filtration', 'Oxygen consumption'],
          correctAnswer: 'Energy conversion',
          difficulty: 'easy',
          solved: true,
        },
        {
          id: 'q2',
          title: 'Explain the basic principles of evolution',
          type: 'subjective',
          difficulty: 'easy',
          solved: true,
        },
        {
          id: 'q3',
          title: 'Mitochondria is called the powerhouse of the cell',
          type: 'true-false',
          correctAnswer: 'true',
          difficulty: 'medium',
          solved: false,
        },
      ],
    },
    {
      chapter: 'Chapter 2: Intermediate',
      data: [
        {
          id: 'q4',
          title: 'The process of breaking down glucose to release energy is called _______',
          type: 'fill-blank',
          correctAnswer: 'respiration',
          difficulty: 'medium',
          solved: true,
        },
        {
          id: 'q5',
          title: 'Which organelle is responsible for protein synthesis?',
          type: 'mcq',
          options: ['Ribosome', 'Golgi apparatus', 'Endoplasmic reticulum', 'Lysosome'],
          correctAnswer: 'Ribosome',
          difficulty: 'medium',
          solved: true,
        },
        {
          id: 'q6',
          title: 'Match the following biological terms with their definitions',
          type: 'match',
          difficulty: 'hard',
          solved: false,
        },
      ],
    },
    {
      chapter: 'Chapter 3: Advanced',
      data: [
        {
          id: 'q7',
          title: 'Analyze the impact of climate change on biodiversity',
          type: 'subjective',
          difficulty: 'hard',
          solved: false,
        },
        {
          id: 'q8',
          title: 'DNA is the primary genetic material in all organisms',
          type: 'true-false',
          correctAnswer: 'false',
          difficulty: 'hard',
          solved: false,
        },
        {
          id: 'q9',
          title: 'What is the process by which plants convert light energy into chemical energy?',
          type: 'mcq',
          options: ['Photosynthesis', 'Respiration', 'Fermentation', 'Transpiration'],
          correctAnswer: 'Photosynthesis',
          difficulty: 'hard',
          solved: false,
        },
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
    <View style={styles.questionCard}>
      <View style={styles.questionTop}>
        <View style={styles.flex1}>
          <Text style={styles.questionTitle} numberOfLines={2}>{item.title}</Text>
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
                <MaterialIcons name="check" size={10} color={Colors.success} />
                <Text style={styles.solvedText}>Solved</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.quickActionButton}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('QuestionDetail', { question: item, questionBank });
          }}
        >
          <MaterialIcons name="arrow-forward" size={14} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
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
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            SectionSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        </View>
      </ScrollView>
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
    marginBottom: Spacing.md,
  },
  statsCard: {
    padding: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
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
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.gray100,
    minHeight: 80,
  },
  questionTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    flexWrap: 'wrap',
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.medium,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  solvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    backgroundColor: Colors.success + '15',
    borderRadius: BorderRadius.medium,
    gap: 2,
  },
  solvedText: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: '600',
  },
  quickActionButton: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

