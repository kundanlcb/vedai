/**
 * Test Attempt Screen
 * Full test-taking interface with timer and progress tracking
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
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
}

export const TestAttemptScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { testId, testName } = route.params as { testId: string; testName: string };

  // Mock questions - memoized to prevent dependency changes
  const questions: Question[] = useMemo(() => [
    {
      id: 'q1',
      text: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      id: 'q2',
      text: 'What is the derivative of x²?',
      options: ['x', '2x', '2x²', 'x³'],
      correctAnswer: '2x',
    },
    {
      id: 'q3',
      text: 'Solve: 3x = 15',
      options: ['x = 3', 'x = 5', 'x = 10', 'x = 15'],
      correctAnswer: 'x = 5',
    },
  ], []);

  const totalDuration = 60 * 1000; // 60 seconds in milliseconds
  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit handler - memoized
  const handleSubmitTest = useCallback(async () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      const score = Object.entries(answers).filter(
        ([id, answer]) =>
          questions.find(q => q.id === id)?.correctAnswer === answer
      ).length;

      navigation.navigate('TestResults', {
        testId,
        score,
        total: questions.length,
      });
    }, 1000);
  }, [answers, questions, navigation, testId]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmitTest]);

  const currentQuestion = questions[currentIndex];
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const handleExit = () => {
    Alert.alert('Exit Test', 'Are you sure you want to exit? Progress will be lost.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };
  const timeWarning = timeLeft < 60000; // Less than 1 minute

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with Timer */}
      <View style={[styles.header, timeWarning && styles.headerWarning]}>
        <TouchableOpacity onPress={handleExit}>
          <MaterialIcons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.titleSection}>
          <Text style={styles.testTitle} numberOfLines={1}>
            {testName}
          </Text>
          <Text style={styles.questionCounter}>
            Q {currentIndex + 1}/{questions.length}
          </Text>
        </View>
        <View
          style={[
            styles.timerBadge,
            timeWarning && styles.timerBadgeWarning,
          ]}
        >
          <MaterialIcons name="schedule" size={16} color={Colors.white} />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      {/* Question */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card variant="filled" style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  answers[currentQuestion.id] === option &&
                    styles.optionButtonSelected,
                ]}
                onPress={() => handleSelectAnswer(option)}
              >
                <View
                  style={[
                    styles.optionCircle,
                    answers[currentQuestion.id] === option &&
                      styles.optionCircleSelected,
                  ]}
                >
                  {answers[currentQuestion.id] === option && (
                    <View style={styles.optionDot} />
                  )}
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
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

        <View style={styles.questionStatus}>
          {questions.map((q, idx) => (
            <TouchableOpacity
              key={q.id}
              onPress={() => setCurrentIndex(idx)}
              style={[
                styles.questionDot,
                idx === currentIndex && styles.questionDotActive,
                answers[q.id] && styles.questionDotAnswered,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={currentIndex === questions.length - 1 ? styles.submitButton : styles.navButton}
          onPress={currentIndex === questions.length - 1 ? handleSubmitTest : handleNext}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : currentIndex === questions.length - 1 ? (
            <>
              <MaterialIcons name="done" size={20} color={Colors.white} />
              <Text style={styles.submitButtonText}>Submit</Text>
            </>
          ) : (
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color={Colors.primary}
            />
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
  closeButton: {
    padding: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  headerWarning: {
    backgroundColor: Colors.error + '08',
    borderBottomColor: Colors.error,
  },
  titleSection: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  testTitle: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  questionCounter: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    gap: Spacing.xs,
  },
  timerBadgeWarning: {
    backgroundColor: Colors.error,
  },
  timerText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
    color: Colors.white,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.gray200,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.gray200,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  questionCard: {
    padding: Spacing.lg,
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
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    gap: Spacing.md,
  },
  optionButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCircleSelected: {
    borderColor: Colors.primary,
  },
  optionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  navButton: {
    width: 44,
    height: 44,
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
  questionStatus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  questionDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.gray300,
  },
  questionDotActive: {
    backgroundColor: Colors.primary,
  },
  questionDotAnswered: {
    backgroundColor: Colors.success,
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  submitButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
});

