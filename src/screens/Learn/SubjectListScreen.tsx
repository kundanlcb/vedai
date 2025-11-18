/**
 * Subject List Screen
 * Shows all available subjects for learning
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

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: number;
  progress: number;
  description?: string;
}

export const SubjectListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [subjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Mathematics',
      icon: 'calculate',
      color: '#FF6B6B',
      chapters: 15,
      progress: 60,
      description: 'Algebra, Geometry, Trigonometry & more',
    },
    {
      id: '2',
      name: 'Science',
      icon: 'science',
      color: '#4ECDC4',
      chapters: 18,
      progress: 45,
      description: 'Physics, Chemistry, Biology',
    },
    {
      id: '3',
      name: 'English',
      icon: 'language',
      color: '#FFD93D',
      chapters: 12,
      progress: 75,
      description: 'Literature, Grammar, Composition',
    },
    {
      id: '4',
      name: 'History',
      icon: 'history',
      color: '#6BCB77',
      chapters: 14,
      progress: 40,
      description: 'Ancient, Medieval, Modern',
    },
    {
      id: '5',
      name: 'Geography',
      icon: 'public',
      color: '#4D96FF',
      chapters: 10,
      progress: 55,
      description: 'Physical & Human Geography',
    },
    {
      id: '6',
      name: 'Economics',
      icon: 'trending-up',
      color: '#FF8787',
      chapters: 11,
      progress: 30,
      description: 'Micro & Macroeconomics',
    },
  ]);

  const getProgressColor = (progress: number) => {
    if (progress === 100) return Colors.success;
    if (progress >= 75) return '#00BCD4';
    if (progress >= 50) return Colors.warning;
    if (progress >= 25) return '#FF9800';
    return Colors.textSecondary;
  };

  const renderSubject = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={styles.subjectCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('SubjectDetail', { subject: item })}
    >
      <View style={styles.cardContent}>
        <View style={[styles.subjectIcon, { backgroundColor: item.color + '18' }]}>
          <MaterialIcons
            name={item.icon as any}
            size={32}
            color={item.color}
          />
        </View>

        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.subjectDescription} numberOfLines={1}>
            {item.description || `${item.chapters} chapters`}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${item.progress}%`,
                    backgroundColor: getProgressColor(item.progress),
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{item.progress}%</Text>
          </View>
        </View>

        <View style={[styles.chapterBadge, { borderColor: item.color }]}>
          <Text style={[styles.chapterCount, { color: item.color }]}>
            {item.chapters}
          </Text>
          <Text style={[styles.chapterLabel, { color: item.color }]}>ch</Text>
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
          <Text style={styles.headerTitle}>Subjects</Text>
          <Text style={styles.headerSubtitle}>All available subjects</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.section}>
          <Card variant="filled" style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <MaterialIcons name="info" size={20} color={Colors.primary} />
              <Text style={styles.infoTitle}>Learning Subjects</Text>
            </View>
            <Text style={styles.infoText}>
              Select a subject to view chapters, practice questions, and track your progress.
            </Text>
          </Card>
        </View>

        {/* Subjects List */}
        <View style={styles.section}>
          <FlatList
            data={subjects}
            renderItem={renderSubject}
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
  subjectCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  subjectIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subjectDescription: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
    minWidth: 35,
    textAlign: 'right',
  },
  chapterBadge: {
    borderWidth: 2,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    flexShrink: 0,
  },
  chapterCount: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
  },
  chapterLabel: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
  },
});

