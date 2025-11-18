/**
 * Question Detail Screen
 * Shows detailed view of a question with answers and exam frequency
 * Supports multiple question types: MCQ, Subjective, Fill-in-the-blank, True/False, Match
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

type QuestionType = 'mcq' | 'subjective' | 'true-false' | 'fill-blank' | 'match';

interface QuestionDetailData {
  id: string;
  title: string;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  solved: boolean;
  options?: string[];
  correctAnswer?: string;
  answer?: string;
}

export const QuestionDetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { question: initialQuestion, questionBank } = route.params as {
    question: QuestionDetailData;
    questionBank: any;
  };

  const question = { ...initialQuestion, type: initialQuestion.type || 'mcq' };

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [subjectiveAnswer, setSubjectiveAnswer] = useState('');
  const [answerFormat, setAnswerFormat] = useState<'text' | 'photo' | 'notes'>('text');
  const [hasPhoto, setHasPhoto] = useState(false);

  const getMCQOptions = () => {
    if (question.options) return question.options;
    return ['Option A: First possible answer', 'Option B: Second possible answer', 'Option C: Third possible answer', 'Option D: Fourth possible answer'];
  };

  const getCorrectAnswer = () => {
    return question.correctAnswer || 'Option B: Second possible answer';
  };

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

  const getQuestionTypeLabel = () => {
    switch (question.type) {
      case 'mcq':
        return 'Multiple Choice';
      case 'subjective':
        return 'Subjective';
      case 'true-false':
        return 'True/False';
      case 'fill-blank':
        return 'Fill in the Blank';
      case 'match':
        return 'Match the Following';
      default:
        return 'Question';
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.flex1}>
          <Text style={styles.headerTitle}>Question Detail</Text>
          <Text style={styles.headerSubtitle}>{questionBank.subject}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Card */}
        <View style={styles.section}>
          <Card variant="filled" style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(question.difficulty) + '20' }]}>
                <Text style={[styles.difficultyLabel, { color: getDifficultyColor(question.difficulty) }]}>
                  {question.difficulty.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.flex1}>
                <Text style={styles.difficultyText}>{question.difficulty.toUpperCase()}</Text>
                <Text style={styles.typeText}>{getQuestionTypeLabel()}</Text>
              </View>
              {question.solved && (
                <View style={styles.solvedBadge}>
                  <MaterialIcons name="check-circle" size={16} color={Colors.success} />
                  <Text style={styles.solvedText}>Solved</Text>
                </View>
              )}
            </View>
            <Text style={styles.questionText}>{question.title}</Text>
          </Card>
        </View>

        {/* Answer Section - Dynamic based on question type */}
        {question.type === 'mcq' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Answer Options</Text>
            <Card variant="filled" style={styles.optionsCard}>
              {getMCQOptions().map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === answer && styles.optionButtonSelected,
                    getCorrectAnswer() === answer && selectedAnswer && styles.optionButtonCorrect,
                  ]}
                  onPress={() => setSelectedAnswer(answer)}
                >
                  <View
                    style={[
                      styles.optionCircle,
                      selectedAnswer === answer && styles.optionCircleSelected,
                      getCorrectAnswer() === answer && selectedAnswer && styles.optionCircleCorrect,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionCircleText,
                        selectedAnswer === answer && styles.optionCircleTextSelected,
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      selectedAnswer === answer && styles.optionTextSelected,
                    ]}
                  >
                    {answer}
                  </Text>
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        )}

        {question.type === 'true-false' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Answer</Text>
            <Card variant="filled" style={styles.optionsCard}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedAnswer === 'true' && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedAnswer('true')}
              >
                <View
                  style={[
                    styles.optionCircle,
                    selectedAnswer === 'true' && styles.optionCircleSelected,
                  ]}
                >
                  <MaterialIcons
                    name="done"
                    size={18}
                    color={selectedAnswer === 'true' ? Colors.white : Colors.textSecondary}
                  />
                </View>
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === 'true' && styles.optionTextSelected,
                  ]}
                >
                  True
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedAnswer === 'false' && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedAnswer('false')}
              >
                <View
                  style={[
                    styles.optionCircle,
                    selectedAnswer === 'false' && styles.optionCircleSelected,
                  ]}
                >
                  <MaterialIcons
                    name="close"
                    size={18}
                    color={selectedAnswer === 'false' ? Colors.white : Colors.textSecondary}
                  />
                </View>
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === 'false' && styles.optionTextSelected,
                  ]}
                >
                  False
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        )}

        {question.type === 'subjective' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Answer</Text>

            {/* Format Selector */}
            <View style={styles.formatSelector}>
              <TouchableOpacity
                style={[
                  styles.formatButton,
                  answerFormat === 'text' && styles.formatButtonActive,
                ]}
                onPress={() => setAnswerFormat('text')}
              >
                <MaterialIcons
                  name="text-fields"
                  size={20}
                  color={answerFormat === 'text' ? Colors.white : Colors.textSecondary}
                />
                <Text
                  style={[
                    styles.formatButtonText,
                    answerFormat === 'text' && styles.formatButtonTextActive,
                  ]}
                >
                  Text
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.formatButton,
                  answerFormat === 'photo' && styles.formatButtonActive,
                ]}
                onPress={() => {
                  setAnswerFormat('photo');
                  Alert.alert('Camera', 'Open camera to capture notes/solution image', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Camera', onPress: () => setHasPhoto(true) },
                  ]);
                }}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={20}
                  color={answerFormat === 'photo' ? Colors.white : Colors.textSecondary}
                />
                <Text
                  style={[
                    styles.formatButtonText,
                    answerFormat === 'photo' && styles.formatButtonTextActive,
                  ]}
                >
                  Photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.formatButton,
                  answerFormat === 'notes' && styles.formatButtonActive,
                ]}
                onPress={() => {
                  setAnswerFormat('notes');
                  Alert.alert('Notes', 'Open notes app to write detailed solution', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Notes', onPress: () => {} },
                  ]);
                }}
              >
                <MaterialIcons
                  name="edit-note"
                  size={20}
                  color={answerFormat === 'notes' ? Colors.white : Colors.textSecondary}
                />
                <Text
                  style={[
                    styles.formatButtonText,
                    answerFormat === 'notes' && styles.formatButtonTextActive,
                  ]}
                >
                  Notes
                </Text>
              </TouchableOpacity>
            </View>

            {/* Content based on format */}
            {answerFormat === 'text' && (
              <Card variant="filled" style={styles.subjectiveCard}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Write your answer here..."
                  placeholderTextColor={Colors.gray400}
                  multiline
                  numberOfLines={6}
                  value={subjectiveAnswer}
                  onChangeText={setSubjectiveAnswer}
                  textAlignVertical="top"
                />
              </Card>
            )}

            {answerFormat === 'photo' && (
              <Card variant="filled" style={styles.photoCard}>
                <View style={styles.photoPlaceholder}>
                  {hasPhoto ? (
                    <>
                      <MaterialIcons name="check-circle" size={48} color={Colors.success} />
                      <Text style={styles.photoText}>Photo captured successfully</Text>
                      <Text style={styles.photoSubtext}>Solution image ready to submit</Text>
                    </>
                  ) : (
                    <>
                      <MaterialIcons name="photo-camera" size={48} color={Colors.textSecondary} />
                      <Text style={styles.photoText}>Tap to capture photo</Text>
                      <Text style={styles.photoSubtext}>Take a photo of your written solution</Text>
                    </>
                  )}
                </View>
              </Card>
            )}

            {answerFormat === 'notes' && (
              <Card variant="filled" style={styles.notesCard}>
                <View style={styles.notesPlaceholder}>
                  <MaterialIcons name="edit-note" size={48} color={Colors.textSecondary} />
                  <Text style={styles.photoText}>Open notes app</Text>
                  <Text style={styles.photoSubtext}>Write detailed solution in your notes app</Text>
                </View>
              </Card>
            )}
          </View>
        )}

        {question.type === 'fill-blank' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fill in the Blank</Text>
            <Card variant="filled" style={styles.subjectiveCard}>
              <TextInput
                style={[styles.textInput, styles.fillBlankInput]}
                placeholder="Enter the missing word/phrase..."
                placeholderTextColor={Colors.gray400}
                value={subjectiveAnswer}
                onChangeText={setSubjectiveAnswer}
              />
            </Card>
          </View>
        )}

        {question.type === 'match' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Match the Following</Text>
            <Card variant="filled" style={styles.matchCard}>
              <View style={styles.matchContainer}>
                <View style={styles.matchColumn}>
                  <Text style={styles.matchHeader}>Column A</Text>
                  <View style={styles.matchItem}>
                    <Text style={styles.matchText}>Item 1</Text>
                  </View>
                  <View style={styles.matchItem}>
                    <Text style={styles.matchText}>Item 2</Text>
                  </View>
                  <View style={styles.matchItem}>
                    <Text style={styles.matchText}>Item 3</Text>
                  </View>
                </View>

                <View style={styles.matchColumn}>
                  <Text style={styles.matchHeader}>Column B</Text>
                  <View style={styles.matchItem}>
                    <Text style={styles.matchText}>Option A</Text>
                  </View>
                  <View style={styles.matchItem}>
                    <Text style={styles.matchText}>Option B</Text>
                  </View>
                  <View style={styles.matchItem}>
                    <Text style={styles.matchText}>Option C</Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        )}

        {/* Correct Answer Display */}
        {(selectedAnswer || subjectiveAnswer) && (
          <View style={styles.section}>
            <Card
              variant="filled"
              style={[
                styles.resultCard,
                selectedAnswer === getCorrectAnswer() || subjectiveAnswer.length > 0
                  ? styles.resultCardCorrect
                  : styles.resultCardIncorrect,
              ]}
            >
              <View style={styles.resultHeader}>
                <MaterialIcons
                  name={selectedAnswer === getCorrectAnswer() || subjectiveAnswer.length > 0 ? 'check-circle' : 'info'}
                  size={24}
                  color={selectedAnswer === getCorrectAnswer() || subjectiveAnswer.length > 0 ? Colors.success : Colors.warning}
                />
                <Text
                  style={[
                    styles.resultText,
                    selectedAnswer === getCorrectAnswer() || subjectiveAnswer.length > 0
                      ? { color: Colors.success }
                      : { color: Colors.warning },
                  ]}
                >
                  {question.type === 'subjective' ? 'Your answer submitted' : selectedAnswer === getCorrectAnswer() ? 'Correct!' : 'Incorrect'}
                </Text>
              </View>
              {question.type !== 'subjective' && selectedAnswer && (
                <Text style={styles.resultDetail}>Correct Answer: {getCorrectAnswer()}</Text>
              )}
            </Card>
          </View>
        )}

        {/* Exam Frequency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exam Frequency</Text>
          <Card variant="filled" style={styles.frequencyCard}>
            <View style={styles.frequencyItem}>
              <View style={styles.frequencyIcon}>
                <MaterialIcons name="assignment" size={20} color={Colors.primary} />
              </View>
              <View style={styles.frequencyContent}>
                <Text style={styles.frequencyLabel}>Times Appeared</Text>
                <Text style={styles.frequencyValue}>12 exams</Text>
              </View>
            </View>

            <View style={styles.frequencyDivider} />

            <View style={styles.frequencyItem}>
              <View style={styles.frequencyIcon}>
                <MaterialIcons name="people" size={20} color={Colors.warning} />
              </View>
              <View style={styles.frequencyContent}>
                <Text style={styles.frequencyLabel}>Correct Rate</Text>
                <Text style={styles.frequencyValue}>78% (9/12)</Text>
              </View>
            </View>

            <View style={styles.frequencyDivider} />

            <View style={styles.frequencyItem}>
              <View style={styles.frequencyIcon}>
                <MaterialIcons name="trending-up" size={20} color={Colors.success} />
              </View>
              <View style={styles.frequencyContent}>
                <Text style={styles.frequencyLabel}>Difficulty Trend</Text>
                <Text style={styles.frequencyValue}>Medium (60% get it)</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Related Questions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Related Questions</Text>
          <Card variant="filled" style={styles.relatedCard}>
            <View style={styles.relatedItem}>
              <Text style={styles.relatedTitle}>Similar Question 1</Text>
              <Text style={styles.relatedSubtitle}>Same topic, medium difficulty</Text>
            </View>
            <View style={styles.relatedDivider} />
            <View style={styles.relatedItem}>
              <Text style={styles.relatedTitle}>Similar Question 2</Text>
              <Text style={styles.relatedSubtitle}>Same topic, hard difficulty</Text>
            </View>
            <View style={styles.relatedDivider} />
            <View style={styles.relatedItem}>
              <Text style={styles.relatedTitle}>Similar Question 3</Text>
              <Text style={styles.relatedSubtitle}>Same topic, easy difficulty</Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Practice Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.practiceButton}
          activeOpacity={0.7}
          onPress={() => {
            // Navigate to practice this question
          }}
        >
          <MaterialIcons name="play-arrow" size={20} color={Colors.white} />
          <Text style={styles.practiceButtonText}>Practice Similar Questions</Text>
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
  sectionTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  questionCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  difficultyBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyLabel: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
  },
  difficultyText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  typeText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '500',
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
  solvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.success + '15',
    borderRadius: BorderRadius.medium,
    gap: Spacing.xs,
  },
  solvedText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.success,
    fontWeight: '600',
  },
  questionText: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  optionsCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.medium,
    gap: Spacing.md,
  },
  optionButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  optionButtonCorrect: {
    borderColor: Colors.success,
    backgroundColor: Colors.success + '08',
  },
  optionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCircleSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  optionCircleCorrect: {
    borderColor: Colors.success,
    backgroundColor: Colors.success,
  },
  optionCircleText: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  optionCircleTextSelected: {
    color: Colors.white,
  },
  optionText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  subjectiveCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  formatSelector: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  formatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.medium,
    gap: Spacing.xs,
  },
  formatButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  formatButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  formatButtonTextActive: {
    color: Colors.white,
  },
  photoCard: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.gray200,
    borderStyle: 'dashed',
  },
  notesCard: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  notesPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.gray200,
    borderStyle: 'dashed',
  },
  photoText: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
  },
  photoSubtext: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  textInput: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  fillBlankInput: {
    height: 44,
    paddingVertical: Spacing.md,
  },
  matchCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  matchContainer: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  matchColumn: {
    flex: 1,
  },
  matchHeader: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  matchItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  matchText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
  },
  resultCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  resultCardCorrect: {
    backgroundColor: Colors.success + '08',
  },
  resultCardIncorrect: {
    backgroundColor: Colors.error + '08',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  resultText: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '700',
  },
  resultDetail: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  frequencyCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  frequencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  frequencyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frequencyContent: {
    flex: 1,
  },
  frequencyLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  frequencyValue: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  frequencyDivider: {
    height: 1,
    backgroundColor: Colors.gray100,
    marginVertical: Spacing.sm,
  },
  relatedCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  relatedItem: {
    paddingVertical: Spacing.md,
  },
  relatedTitle: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  relatedSubtitle: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  relatedDivider: {
    height: 1,
    backgroundColor: Colors.gray100,
    marginVertical: Spacing.sm,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  practiceButtonText: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.white,
  },
});

