/**
 * Practice Module Screen
 * Question practice with filters, session management, and scoring
 */

import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useGetQuestions } from '../../hooks/useQuestions';
import { startPracticeSession, resetPracticeSession } from '../../store/slices/practice.slice';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import { getColors } from '../../theme/colors';
import { Spacing } from '../../theme/typography';

type ViewMode = 'filters' | 'session' | 'results';

export const PracticeScreen = () => {
  const colorMode = (useColorScheme() || 'light') as 'light' | 'dark';
  const colors = getColors(colorMode);
  const dispatch = useAppDispatch();

  // Local state
  const [viewMode, setViewMode] = useState<ViewMode>('filters');
  const [selectedSubject, setSelectedSubject] = useState('science-8');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // Redux state
  const practiceSession = useAppSelector((state) => state.practice);

  // Fetch questions
  const { data: questions, isLoading, error } = useGetQuestions({
    subject: selectedSubject,
    difficulty: selectedDifficulty,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: Spacing.lg,
    },
    header: {
      marginBottom: Spacing.lg,
    },
    title: {
      marginBottom: Spacing.sm,
    },
    subtitle: {
      marginBottom: Spacing.lg,
    },
    filterCard: {
      marginBottom: Spacing.lg,
    },
    filterGroup: {
      marginBottom: Spacing.md,
    },
    filterLabel: {
      marginBottom: Spacing.sm,
    },
    optionContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    optionButton: {
      flex: 1,
      minWidth: '45%',
    },
    questionCount: {
      marginVertical: Spacing.md,
    },
    startButton: {
      marginTop: Spacing.lg,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.lg,
    },
    errorText: {
      marginTop: Spacing.md,
      textAlign: 'center',
    },
    progressBar: {
      backgroundColor: colors.border,
      height: 6,
      borderRadius: 3,
      marginBottom: Spacing.md,
    },
    progressFill: {
      backgroundColor: '#10B981',
      height: 6,
      borderRadius: 3,
    },
    navigationContainer: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginTop: Spacing.lg,
    },
    navigationButton: {
      flex: 1,
    },
    questionCard: {
      marginBottom: Spacing.lg,
    },
  });

  const handleStartPractice = () => {
    if (questions && questions.length > 0) {
      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
      dispatch(startPracticeSession({
        questionIds: questions.map((q) => q.id),
        totalMarks,
      }));
      setViewMode('session');
    }
  };

  const handleEndSession = () => {
    // Calculate score (simple: 1 point per correct answer)
    // In a real app, would submit this to backend
    dispatch(resetPracticeSession());
    setViewMode('filters');
  };

  // Filters View
  if (viewMode === 'filters') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text variant="h3" color="primary" style={styles.title}>
              Practice
            </Text>
            <Text variant="body_sm" color="secondary" style={styles.subtitle}>
              Choose difficulty and start practicing
            </Text>
          </View>

          <Card style={styles.filterCard}>
            <View style={styles.filterGroup}>
              <Text variant="h6" color="primary" style={styles.filterLabel}>
                Subject
              </Text>
              <View style={styles.optionContainer}>
                <Button
                  label="Science"
                  variant={selectedSubject === 'science-8' ? 'primary' : 'outline'}
                  onPress={() => setSelectedSubject('science-8')}
                  size="sm"
                  style={styles.optionButton}
                />
                <Button
                  label="Mathematics"
                  variant={selectedSubject === 'math-8' ? 'primary' : 'outline'}
                  onPress={() => setSelectedSubject('math-8')}
                  size="sm"
                  style={styles.optionButton}
                />
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text variant="h6" color="primary" style={styles.filterLabel}>
                Difficulty
              </Text>
              <View style={styles.optionContainer}>
                <Button
                  label="Easy"
                  variant={selectedDifficulty === 'easy' ? 'primary' : 'outline'}
                  onPress={() => setSelectedDifficulty('easy')}
                  size="sm"
                  style={styles.optionButton}
                />
                <Button
                  label="Medium"
                  variant={selectedDifficulty === 'medium' ? 'primary' : 'outline'}
                  onPress={() => setSelectedDifficulty('medium')}
                  size="sm"
                  style={styles.optionButton}
                />
                <Button
                  label="Hard"
                  variant={selectedDifficulty === 'hard' ? 'primary' : 'outline'}
                  onPress={() => setSelectedDifficulty('hard')}
                  size="sm"
                  style={styles.optionButton}
                />
              </View>
            </View>
          </Card>

          {isLoading && <Loading visible={true} message="Loading questions..." />}

          {error && (
            <View style={styles.errorContainer}>
              <Text variant="h5" color="error">
                Failed to load questions
              </Text>
              <Text variant="body_sm" color="secondary" style={styles.errorText}>
                {(error as Error).message}
              </Text>
            </View>
          )}

          {questions && questions.length > 0 && (
            <>
              <Text variant="body_base" color="primary" style={styles.questionCount}>
                {questions.length} questions available
              </Text>
              <Button
                label={`Start Practice (${questions.length} questions)`}
                onPress={handleStartPractice}
                variant="primary"
                style={styles.startButton}
              />
            </>
          )}

          {questions && questions.length === 0 && (
            <Card>
              <Text variant="body_base" color="secondary">
                No questions found. Try different filters.
              </Text>
            </Card>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Session View
  if (viewMode === 'session' && practiceSession.sessionId) {
    const currentQuestion = questions?.[practiceSession.currentQuestionIndex];
    const progress = ((practiceSession.currentQuestionIndex + 1) / practiceSession.questionIds.length) * 100;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Progress */}
          <View style={styles.header}>
            <Text variant="h5" color="primary" style={styles.title}>
              Question {practiceSession.currentQuestionIndex + 1} of {practiceSession.questionIds.length}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress}%`,
                  },
                ]}
              />
            </View>
          </View>

          {currentQuestion && (
            <Card style={styles.questionCard}>
              <Text variant="h6" color="primary" style={{ marginBottom: Spacing.md }}>
                {currentQuestion.text}
              </Text>
              <Text variant="body_xs" color="secondary">
                {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''} | {currentQuestion.difficulty}
              </Text>

              {currentQuestion.type === 'mcq' && currentQuestion.options.length > 0 && (
                <View style={{ marginTop: Spacing.lg }}>
                  {currentQuestion.options.map((option: any, idx: number) => (
                    <Button
                      key={option.id}
                      label={`${String.fromCharCode(65 + idx)}) ${option.text}`}
                      onPress={() => {
                        // In a real app, would track the answer
                      }}
                      variant={
                        practiceSession.answers[currentQuestion.id] === option.id
                          ? 'primary'
                          : 'outline'
                      }
                      style={{ marginBottom: Spacing.sm }}
                    />
                  ))}
                </View>
              )}

              {currentQuestion.type === 'short' && (
                <Text variant="body_sm" color="secondary" style={{ marginTop: Spacing.md }}>
                  Please write your answer in the answer sheet
                </Text>
              )}
            </Card>
          )}

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <Button
              label="← Previous"
              onPress={() => {
                // Navigate previous
              }}
              disabled={practiceSession.currentQuestionIndex === 0}
              variant={practiceSession.currentQuestionIndex === 0 ? 'outline' : 'primary'}
              style={styles.navigationButton}
            />
            <Button
              label="Next →"
              onPress={() => {
                // Navigate next
              }}
              disabled={practiceSession.currentQuestionIndex >= practiceSession.questionIds.length - 1}
              variant={
                practiceSession.currentQuestionIndex >= practiceSession.questionIds.length - 1
                  ? 'outline'
                  : 'primary'
              }
              style={styles.navigationButton}
            />
          </View>

          {practiceSession.currentQuestionIndex === practiceSession.questionIds.length - 1 && (
            <Button
              label="✓ Submit"
              onPress={handleEndSession}
              variant="primary"
              style={{ marginTop: Spacing.lg }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return <Loading visible={true} message="Initializing practice..." />;
};

