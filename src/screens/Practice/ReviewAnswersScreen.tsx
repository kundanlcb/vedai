/**
 * Review Answers Screen
 * Shows detailed review of practice session answers with explanations
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

interface ReviewQuestion {
  id: string;
  text: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  marks: number;
}

export const ReviewAnswersScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route: _route,
}) => {
  const insets = useSafeAreaInsets();
  // const { sessionId } = route.params as { sessionId: string };

  // Mock review data
  const reviewQuestions: ReviewQuestion[] = [
    {
      id: 'q1',
      text: 'What is the derivative of x²?',
      selectedAnswer: 'a) 2x',
      correctAnswer: 'a) 2x',
      isCorrect: true,
      explanation:
        'Using the power rule, d/dx(x²) = 2x. The power rule states that d/dx(x^n) = n*x^(n-1).',
      marks: 1,
    },
    {
      id: 'q2',
      text: 'What is the integral of 2x?',
      selectedAnswer: 'b) x²',
      correctAnswer: 'a) x² + C',
      isCorrect: false,
      explanation:
        'The correct answer is x² + C. You forgot the constant of integration (C), which is essential in indefinite integrals.',
      marks: 1,
    },
    {
      id: 'q3',
      text: 'Solve: 3x + 5 = 20',
      selectedAnswer: 'c) 5',
      correctAnswer: 'c) 5',
      isCorrect: true,
      explanation:
        '3x + 5 = 20 → 3x = 15 → x = 5. Simple linear equation solving using inverse operations.',
      marks: 1,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const filteredQuestions = reviewQuestions.filter(q => {
    if (selectedTab === 'correct') return q.isCorrect;
    if (selectedTab === 'incorrect') return !q.isCorrect;
    return true;
  });

  const renderQuestionCard = ({ item, index }: { item: ReviewQuestion; index: number }) => (
    <TouchableOpacity
      onPress={() =>
        setExpandedQuestion(expandedQuestion === item.id ? null : item.id)
      }
      activeOpacity={0.7}
    >
      <Card
        variant="filled"
        style={[
          styles.questionCard,
          ...(item.isCorrect ? [styles.correctCard] : []),
          ...(!item.isCorrect ? [styles.incorrectCard] : []),
        ]}
      >
        {/* Question Header */}
        <View style={styles.questionHeader}>
          <View style={styles.questionNumberContainer}>
            <Text style={styles.questionNumber}>{index + 1}</Text>
          </View>

          <View style={styles.flex1}>
            <Text style={styles.questionText} numberOfLines={2}>
              {item.text}
            </Text>
          </View>

          <View
            style={[
              styles.statusIndicator,
              item.isCorrect && styles.correctIndicator,
              !item.isCorrect && styles.incorrectIndicator,
            ]}
          >
            <MaterialIcons
              name={item.isCorrect ? 'check-circle' : 'cancel'}
              size={20}
              color={item.isCorrect ? Colors.white : Colors.white}
            />
          </View>
        </View>

        {/* Question Details (Expanded) */}
        {expandedQuestion === item.id && (
          <>
            <View style={styles.divider} />

            {/* Your Answer */}
            <View style={styles.answerSection}>
              <View style={styles.answerHeader}>
                <MaterialIcons name="person" size={16} color={Colors.textSecondary} />
                <Text style={styles.answerLabel}>Your Answer</Text>
              </View>
              <View
                style={[
                  styles.answerBox,
                  !item.isCorrect && { backgroundColor: Colors.error + '15' },
                ]}
              >
                <Text style={styles.answerText}>{item.selectedAnswer}</Text>
              </View>
            </View>

            {/* Correct Answer (if wrong) */}
            {!item.isCorrect && (
              <View style={styles.answerSection}>
                <View style={styles.answerHeader}>
                  <MaterialIcons name="done" size={16} color={Colors.success} />
                  <Text style={[styles.answerLabel, { color: Colors.success }]}>
                    Correct Answer
                  </Text>
                </View>
                <View style={[styles.answerBox, { backgroundColor: Colors.success + '15' }]}>
                  <Text style={styles.answerText}>{item.correctAnswer}</Text>
                </View>
              </View>
            )}

            {/* Explanation */}
            <View style={styles.explanationSection}>
              <View style={styles.explanationHeader}>
                <MaterialIcons name="lightbulb" size={16} color={Colors.info} />
                <Text style={styles.explanationLabel}>Explanation</Text>
              </View>
              <View style={styles.explanationBox}>
                <Text style={styles.explanationText}>{item.explanation}</Text>
              </View>
            </View>

            {/* Marks */}
            <View style={styles.marksSection}>
              <Text style={styles.marksLabel}>Marks:</Text>
              <Text
                style={[
                  styles.marksValue,
                  item.isCorrect && { color: Colors.success },
                  !item.isCorrect && { color: Colors.error },
                ]}
              >
                {item.isCorrect ? `+${item.marks}` : '0'} / {item.marks}
              </Text>
            </View>
          </>
        )}

        {/* Collapsed View - Show Selection */}
        {expandedQuestion !== item.id && (
          <View style={styles.collapsedContent}>
            <Text style={styles.selectedAnswerLabel}>Your answer:</Text>
            <Text style={styles.selectedAnswerText}>{item.selectedAnswer}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  const correctCount = reviewQuestions.filter(q => q.isCorrect).length;
  const incorrectCount = reviewQuestions.filter(q => !q.isCorrect).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Answers</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Summary Card */}
      <View style={styles.summarySection}>
        <Card variant="filled" style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <MaterialIcons name="done-all" size={20} color={Colors.success} />
              <Text style={styles.summaryLabel}>Correct</Text>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>
                {correctCount}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <MaterialIcons name="close" size={20} color={Colors.error} />
              <Text style={styles.summaryLabel}>Incorrect</Text>
              <Text style={[styles.summaryValue, { color: Colors.error }]}>
                {incorrectCount}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <MaterialIcons name="percent" size={20} color={Colors.primary} />
              <Text style={styles.summaryLabel}>Accuracy</Text>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>
                {Math.round((correctCount / reviewQuestions.length) * 100)}%
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsSection}>
        {(['all', 'correct', 'incorrect'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.tabActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab === 'all' ? 'All' : tab === 'correct' ? 'Correct' : 'Incorrect'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Questions List */}
      <FlatList
        data={filteredQuestions}
        renderItem={renderQuestionCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />

      {/* Action Buttons */}
      <View style={styles.actionButtonsSection}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="home" size={20} color={Colors.primary} />
          <Text style={styles.secondaryButtonText}>Go Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="repeat" size={20} color={Colors.white} />
          <Text style={styles.primaryButtonText}>Practice Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  headerSpacer: { width: 24 },
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
  summarySection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  summaryCard: {
    padding: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  summaryLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '700',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.gray200,
  },
  tabsSection: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
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
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  questionCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  correctCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  incorrectCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  questionNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
    color: Colors.primary,
  },
  questionText: {
    flex: 1,
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  statusIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctIndicator: {
    backgroundColor: Colors.success,
  },
  incorrectIndicator: {
    backgroundColor: Colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray200,
    marginVertical: Spacing.md,
  },
  collapsedContent: {
    marginTop: Spacing.sm,
  },
  selectedAnswerLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  selectedAnswerText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  answerSection: {
    marginBottom: Spacing.lg,
  },
  answerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  answerLabel: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  answerBox: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.gray100,
  },
  answerText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
  },
  explanationSection: {
    marginBottom: Spacing.lg,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  explanationLabel: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.info,
  },
  explanationBox: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.info + '10',
    borderLeftWidth: 3,
    borderLeftColor: Colors.info,
  },
  explanationText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  marksSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
  },
  marksLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  marksValue: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
  },
  actionButtonsSection: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.primary,
    gap: Spacing.sm,
  },
  secondaryButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.primary,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    gap: Spacing.sm,
  },
  primaryButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
});
