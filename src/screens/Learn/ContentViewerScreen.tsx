/**
 * Content Viewer Screen
 * Displays chapter content (text, lessons) with navigation and progress tracking
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Share,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
}

export const ContentViewerScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { chapterName, subjectName } = route.params as {
    chapterId: string;
    chapterName: string;
    subjectName: string;
  };

  // Mock lesson data
  const lessons: Lesson[] = [
    {
      id: 'l1',
      title: 'What is Algebra?',
      content:
        'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols. In algebra, those symbols (often letters) represent numbers, and operations that work on those numbers.\n\nAlgebra is useful because it:\n• Allows us to write general rules and patterns\n• Helps solve problems where we don\'t know all the values\n• Makes it easy to express complicated relationships\n\nFor example, if you know the cost per item and the number of items, you can write: Total Cost = Cost per item × Number of items\n\nThis is much more useful than just stating one specific example!',
      order: 1,
    },
    {
      id: 'l2',
      title: 'Variables and Constants',
      content:
        'In algebra, we use letters (called variables) to represent unknown numbers or quantities that can change.\n\nVariables:\n• Usually represented by letters (x, y, a, b, etc.)\n• Can take different values\n• Allow us to write formulas and equations\n\nConstants:\n• Are fixed numbers\n• Don\'t change value\n• Examples: 5, -3, π, etc.\n\nExample:\n• In the equation 2x + 5 = 11, x is a variable and 5 and 11 are constants\n• We can solve this equation to find that x = 3',
      order: 2,
    },
    {
      id: 'l3',
      title: 'Basic Operations',
      content:
        'Just like in arithmetic, algebra uses the same basic operations:\n\nAddition: a + b\nSubtraction: a - b\nMultiplication: a × b or ab\nDivision: a ÷ b or a/b\n\nOrder of Operations (PEMDAS):\n1. Parentheses\n2. Exponents\n3. Multiplication and Division (left to right)\n4. Addition and Subtraction (left to right)\n\nExample: Solve 3(2 + 4) - 5\nStep 1: 3(6) - 5 = 18 - 5 = 13\n\nPractice: Try to solve 2x + 3 = 7\nSolution: x = 2',
      order: 3,
    },
  ];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [_notes, _setNotes] = useState('');

  const currentLesson = lessons[currentLessonIndex];
  const totalLessons = lessons.length;
  const progress = ((currentLessonIndex + 1) / totalLessons) * 100;

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this lesson: ${currentLesson.title} from ${chapterName}`,
        url: undefined,
        title: currentLesson.title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkComplete = () => {
    // Mark chapter as complete and move to next
    if (currentLessonIndex < lessons.length - 1) {
      handleNextLesson();
    } else {
      // Show completion dialog or navigate back
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={[styles.headerTextWrap]}>
          <Text style={styles.headerSubject}>{subjectName}</Text>
          <Text style={styles.headerChapter}>{chapterName}</Text>
        </View>
        <TouchableOpacity onPress={handleBookmark}>
          <MaterialIcons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={bookmarked ? Colors.primary : Colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Lesson {currentLessonIndex + 1} of {totalLessons}
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Lesson Title */}
        <View style={styles.titleSection}>
          <Text style={styles.lessonTitle}>{currentLesson.title}</Text>
        </View>

        {/* Lesson Content Card */}
        <Card variant="filled" style={styles.contentCard}>
          <Text style={styles.contentText}>{currentLesson.content}</Text>
        </Card>

        {/* Key Takeaways Box */}
        <View style={styles.takeawaysSection}>
          <View style={styles.takeawaysHeader}>
            <MaterialIcons name="lightbulb" size={20} color={Colors.warning} />
            <Text style={styles.takeawaysTitle}>Key Takeaways</Text>
          </View>
          <Card variant="filled" style={styles.takeawaysCard}>
            <View style={styles.takeawayItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.takeawayText}>
                Understanding the fundamentals is crucial for advanced topics
              </Text>
            </View>
            <View style={styles.takeawayItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.takeawayText}>
                Practice with different types of problems to build confidence
              </Text>
            </View>
            <View style={styles.takeawayItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.takeawayText}>
                Don't rush - take time to understand each concept deeply
              </Text>
            </View>
          </Card>
        </View>

        {/* Related Questions Section */}
        <View style={styles.questionsSection}>
          <View style={styles.questionsHeader}>
            <MaterialIcons name="quiz" size={20} color={Colors.primary} />
            <Text style={styles.questionsTitle}>Practice Questions</Text>
          </View>
          <Card variant="filled" style={styles.questionsCard}>
            <TouchableOpacity style={styles.questionButton}>
              <Text style={styles.questionButtonText}>Start Practice (5 questions)</Text>
              <MaterialIcons name="arrow-forward" size={16} color={Colors.white} />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentLessonIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePreviousLesson}
          disabled={currentLessonIndex === 0}
        >
          <MaterialIcons
            name="arrow-back"
            size={20}
            color={currentLessonIndex === 0 ? Colors.gray400 : Colors.primary}
          />
          <Text
            style={[
              styles.navButtonText,
              currentLessonIndex === 0 && styles.navButtonTextDisabled,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <MaterialIcons name="share" size={20} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            currentLessonIndex === lessons.length - 1 && styles.completeButton,
          ]}
          onPress={handleMarkComplete}
        >
          <Text
            style={[
              styles.navButtonText,
              currentLessonIndex === lessons.length - 1 && styles.completeButtonText,
            ]}
          >
            {currentLessonIndex === lessons.length - 1 ? 'Complete' : 'Next'}
          </Text>
          <MaterialIcons
            name={
              currentLessonIndex === lessons.length - 1 ? 'check-circle' : 'arrow-forward'
            }
            size={20}
            color={
              currentLessonIndex === lessons.length - 1 ? Colors.white : Colors.primary
            }
          />
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
  headerTextWrap: { flex: 1, marginLeft: Spacing.md },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  headerSubject: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  headerChapter: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  progressSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: 3,
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
    paddingTop: Spacing.lg,
  },
  titleSection: {
    marginBottom: Spacing.lg,
  },
  lessonTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  contentCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  contentText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  takeawaysSection: {
    marginBottom: Spacing.lg,
  },
  takeawaysHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  takeawaysTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  takeawaysCard: {
    padding: Spacing.lg,
  },
  takeawayItem: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: Spacing.sm,
  },
  takeawayText: {
    flex: 1,
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  questionsSection: {
    marginBottom: Spacing.xl,
  },
  questionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  questionsTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  questionsCard: {
    padding: Spacing.lg,
  },
  questionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  questionButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    gap: Spacing.md,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.primary,
  },
  navButtonTextDisabled: {
    color: Colors.gray400,
  },
  shareButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  nextButton: {
    backgroundColor: Colors.primary + '15',
    borderRadius: BorderRadius.medium,
  },
  completeButton: {
    backgroundColor: Colors.success,
  },
  completeButtonText: {
    color: Colors.white,
  },
});

