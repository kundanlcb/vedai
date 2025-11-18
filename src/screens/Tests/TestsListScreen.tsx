/**
 * Tests List Screen
 * Browse and filter available tests
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

interface Test {
  id: string;
  name: string;
  subject: string;
  duration: number; // minutes
  totalQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  passingScore: number;
  description: string;
}

export const TestsListScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route: _route,
}) => {
  const insets = useSafeAreaInsets();

  // Mock tests data
  const tests: Test[] = [
    {
      id: 't1',
      name: 'Mathematics Unit Test 1',
      subject: 'Mathematics',
      duration: 60,
      totalQuestions: 30,
      difficulty: 'medium',
      passingScore: 60,
      description: 'Test your knowledge on Algebra and Quadratic Equations',
    },
    {
      id: 't2',
      name: 'Science Chapter 5',
      subject: 'Science',
      duration: 45,
      totalQuestions: 25,
      difficulty: 'easy',
      passingScore: 70,
      description: 'Quick assessment on Physics fundamentals',
    },
    {
      id: 't3',
      name: 'Full Syllabus Mock Test',
      subject: 'Mathematics',
      duration: 120,
      totalQuestions: 50,
      difficulty: 'hard',
      passingScore: 65,
      description: 'Complete mock test covering entire syllabus',
    },
    {
      id: 't4',
      name: 'English Literature Quiz',
      subject: 'English',
      duration: 30,
      totalQuestions: 15,
      difficulty: 'easy',
      passingScore: 70,
      description: 'Quick quiz on poetry and prose',
    },
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredTests = selectedDifficulty
    ? tests.filter(t => t.difficulty === selectedDifficulty)
    : tests;

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

  const renderTestCard = ({ item }: { item: Test }) => (
    <Card variant="filled" style={[styles.testCard, { borderLeftColor: getDifficultyColor(item.difficulty), borderLeftWidth: 4 }]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.flex1}>
          <Text style={styles.testName}>{item.name}</Text>
          <Text style={styles.testSubject}>{item.subject}</Text>
        </View>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(item.difficulty) + '18' },
          ]}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: getDifficultyColor(item.difficulty) },
            ]}
          >
            {item.difficulty.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Details Row */}
      <View style={styles.detailsRow}>
        <View style={styles.detail}>
          <MaterialIcons name="schedule" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{item.duration}m</Text>
        </View>
        <View style={styles.detail}>
          <MaterialIcons name="quiz" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{item.totalQuestions}Q</Text>
        </View>
        <View style={styles.detail}>
          <MaterialIcons name="check-circle" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{item.passingScore}%</Text>
        </View>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() =>
          navigation.navigate('TestAttempt', {
            testId: item.id,
            testName: item.name,
          })
        }
        activeOpacity={0.7}
      >
        <MaterialIcons name="play-arrow" size={18} color={Colors.white} />
        <Text style={styles.startButtonText}>Start Test</Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Tests</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedDifficulty === null && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedDifficulty(null)}
        >
          <Text
            style={[
              styles.filterText,
              selectedDifficulty === null && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {['easy', 'medium', 'hard'].map(difficulty => (
          <TouchableOpacity
            key={difficulty}
            style={[
              styles.filterButton,
              selectedDifficulty === difficulty && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedDifficulty(difficulty)}
          >
            <Text
              style={[
                styles.filterText,
                selectedDifficulty === difficulty && styles.filterTextActive,
              ]}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tests List */}
      <FlatList
        data={filteredTests}
        renderItem={renderTestCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  },
  headerTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  filtersSection: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    backgroundColor: Colors.white,
  },
  filterButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  filterButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  filterText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.primary,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  testCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  testName: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  testSubject: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
  },
  difficultyText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
  },
  description: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 18,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    gap: Spacing.xs,
  },
  startButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
});

