/**
 * Question Bank List Screen
 * Shows all available question banks for practice
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

interface QuestionBank {
  id: string;
  subject: string;
  count: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  color: string;
}

export const QuestionBankListScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const [questionBanks] = useState<QuestionBank[]>([
    { id: '1', subject: 'Mathematics', count: 45, difficulty: 'mixed', color: '#FF6B6B' },
    { id: '2', subject: 'Science', count: 38, difficulty: 'medium', color: '#4ECDC4' },
    { id: '3', subject: 'English', count: 32, difficulty: 'easy', color: '#FFD93D' },
    { id: '4', subject: 'History', count: 28, difficulty: 'hard', color: '#6BCB77' },
    { id: '5', subject: 'Geography', count: 25, difficulty: 'medium', color: '#4D96FF' },
    { id: '6', subject: 'Economics', count: 35, difficulty: 'hard', color: '#FF8787' },
  ]);

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
        return Colors.textSecondary;
    }
  };

  const renderQuestionBank = ({ item }: { item: QuestionBank }) => (
    <TouchableOpacity
      style={[styles.bankCard, { borderLeftColor: item.color, borderLeftWidth: 4 }]}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('QuestionBankDetail', { questionBank: item })}
    >
      <View style={styles.bankHeader}>
        <View style={[styles.bankIcon, { backgroundColor: item.color + '18' }]}>
          <MaterialIcons name="quiz" size={24} color={item.color} />
        </View>
        <View style={styles.bankInfo}>
          <Text style={styles.bankSubject}>{item.subject}</Text>
          <Text style={styles.bankCount}>{item.count} Questions</Text>
        </View>
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
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.flex1}>
          <Text style={styles.headerTitle}>Question Banks</Text>
          <Text style={styles.headerSubtitle}>Practice by topic</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.section}>
          <Card variant="filled" style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <MaterialIcons name="info" size={20} color={Colors.primary} />
              <Text style={styles.infoTitle}>Practice Questions</Text>
            </View>
            <Text style={styles.infoText}>
              Select a question bank to practice questions organized by topic and difficulty level.
            </Text>
          </Card>
        </View>

        {/* Question Banks List */}
        <View style={styles.section}>
          <FlatList
            data={questionBanks}
            renderItem={renderQuestionBank}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
          />
        </View>
      </ScrollView>
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
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.lg,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  infoCard: {
    padding: Spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  infoTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  infoText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bankCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bankIcon: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankInfo: {
    flex: 1,
  },
  bankSubject: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  bankCount: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
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
});

