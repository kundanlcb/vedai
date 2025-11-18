/**
 * Question Session Screen
 * Interactive question answering with instant feedback
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const QuestionSessionScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route: _route,
}) => {
  const insets = useSafeAreaInsets();

  // Mock questions
  const questions: Question[] = [
    {
      id: 'q1',
      text: 'What is the derivative of x²?',
      options: ['2x', 'x', '2x²', 'x³'],
      correctAnswer: '2x',
      explanation: 'Using the power rule: d/dx(x^n) = n*x^(n-1)',
      difficulty: 'easy',
    },
    {
      id: 'q2',
      text: 'Solve: 3x + 5 = 20',
      options: ['x = 5', 'x = 10', 'x = 15', 'x = 3'],
      correctAnswer: 'x = 5',
      explanation: '3x = 20 - 5 = 15, so x = 15/3 = 5',
      difficulty: 'easy',
    },
    {
      id: 'q3',
      text: 'What is the integral of 2x?',
      options: ['x²', 'x² + C', '2x²', '2x² + C'],
      correctAnswer: 'x² + C',
      explanation: 'The integral includes the constant of integration C',
      difficulty: 'medium',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [isLoading] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isAnswered = answers[currentQuestion.id];
  const isCorrect = isAnswered === currentQuestion.correctAnswer;

  const handleSelectAnswer = (option: string) => {
    if (!showResult) {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
      setShowResult(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
    } else {
      // End of session - navigate to review
      navigation.navigate('ReviewAnswers', { sessionId: Date.now().toString() });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowResult(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Practice Questions</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Card */}
        <Card variant="filled" style={styles.questionCard}>
          <View style={styles.difficultyBadge}>
            <Text
              style={[
                styles.difficultyText,
                currentQuestion.difficulty === 'easy' && styles.easyText,
                currentQuestion.difficulty === 'medium' && styles.mediumText,
                currentQuestion.difficulty === 'hard' && styles.hardText,
              ]}
            >
              {currentQuestion.difficulty.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.questionText}>{currentQuestion.text}</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = isAnswered === option;
              const showCorrect = showResult && option === currentQuestion.correctAnswer;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption,
                    showCorrect && styles.correctOption,
                    showWrong && styles.wrongOption,
                  ]}
                  onPress={() => handleSelectAnswer(option)}
                  disabled={showResult}
                >
                  <View
                    style={[
                      styles.optionCircle,
                      isSelected && styles.selectedCircle,
                      showCorrect && styles.correctCircle,
                      showWrong && styles.wrongCircle,
                    ]}
                  >
                    {showCorrect && <MaterialIcons name="check" size={16} color={Colors.white} />}
                    {showWrong && <MaterialIcons name="close" size={16} color={Colors.white} />}
                  </View>
                  <Text style={[styles.optionText, isSelected && styles.selectedText]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Feedback */}
          {showResult && (
            <View
              style={[
                styles.feedbackBox,
                isCorrect ? styles.correctFeedback : styles.wrongFeedback,
              ]}
            >
              <View style={styles.feedbackHeader}>
                <MaterialIcons
                  name={isCorrect ? 'check-circle' : 'cancel'}
                  size={20}
                  color={isCorrect ? Colors.success : Colors.error}
                />
                <Text
                  style={[
                    styles.feedbackTitle,
                    isCorrect ? styles.correctTitle : styles.wrongTitle,
                  ]}
                >
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </Text>
              </View>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            </View>
          )}
        </Card>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <MaterialIcons
            name="arrow-back"
            size={20}
            color={currentIndex === 0 ? Colors.gray400 : Colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
            !isAnswered && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!isAnswered || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <>
              <Text style={styles.nextButtonText}>
                {currentIndex === questions.length - 1 ? 'Review' : 'Next'}
              </Text>
              <MaterialIcons name="arrow-forward" size={20} color={Colors.white} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerSpacer: { width: 24 },
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
  progressSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  questionCard: {
    padding: Spacing.lg,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.md,
    backgroundColor: Colors.gray100,
  },
  difficultyText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
  },
  easyText: {
    color: Colors.success,
  },
  mediumText: {
    color: Colors.warning,
  },
  hardText: {
    color: Colors.error,
  },
  questionText: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.gray200,
    gap: Spacing.md,
  },
  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  correctOption: {
    borderColor: Colors.success,
    backgroundColor: Colors.success + '10',
  },
  wrongOption: {
    borderColor: Colors.error,
    backgroundColor: Colors.error + '10',
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderColor: Colors.primary,
  },
  correctCircle: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  wrongCircle: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  optionText: {
    flex: 1,
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  selectedText: {
    color: Colors.primary,
  },
  feedbackBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    marginTop: Spacing.md,
  },
  correctFeedback: {
    backgroundColor: Colors.success + '15',
  },
  wrongFeedback: {
    backgroundColor: Colors.error + '15',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  feedbackTitle: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
  },
  correctTitle: {
    color: Colors.success,
  },
  wrongTitle: {
    color: Colors.error,
  },
  explanationText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.5,
    borderColor: Colors.gray300,
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    gap: Spacing.sm,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
});

