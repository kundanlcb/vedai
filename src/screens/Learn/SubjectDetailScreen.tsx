/**
 * Subject Detail Screen
 * Shows all chapters in a subject with progress tracking
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

interface Chapter {
  id: string;
  name: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  duration: number; // in minutes
  topics?: string[];
}

// Separator component
const ChapterSeparator = () => <View style={{ height: Spacing.md }} />;

export const SubjectDetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { subject } = route.params as { subject: any };

  // Mock chapters data based on subject
  const [chapters] = useState<Chapter[]>([
    {
      id: 'ch1',
      name: 'Chapter 1: Introduction',
      progress: 100,
      lessonsCompleted: 5,
      totalLessons: 5,
      duration: 45,
      topics: ['Overview', 'Fundamentals', 'Key Concepts'],
    },
    {
      id: 'ch2',
      name: 'Chapter 2: Fundamentals',
      progress: 75,
      lessonsCompleted: 3,
      totalLessons: 4,
      duration: 60,
      topics: ['Core Principles', 'Basic Methods', 'Practice Problems'],
    },
    {
      id: 'ch3',
      name: 'Chapter 3: Advanced Concepts',
      progress: 50,
      lessonsCompleted: 2,
      totalLessons: 4,
      duration: 75,
      topics: ['Advanced Topics', 'Theory', 'Applications'],
    },
    {
      id: 'ch4',
      name: 'Chapter 4: Applications',
      progress: 25,
      lessonsCompleted: 1,
      totalLessons: 4,
      duration: 60,
      topics: ['Real-world Uses', 'Case Studies', 'Problem Solving'],
    },
    {
      id: 'ch5',
      name: 'Chapter 5: Practice & Review',
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 3,
      duration: 45,
      topics: ['Exercises', 'Mock Tests', 'Summary'],
    },
  ]);

  const getProgressColor = (progress: number) => {
    if (progress === 100) return Colors.success;
    if (progress >= 75) return '#00BCD4';
    if (progress >= 50) return Colors.warning;
    if (progress >= 25) return '#FF9800';
    return Colors.textSecondary;
  };

  const renderChapter = ({ item }: { item: Chapter }) => (
    <Card variant="filled" style={styles.chapterCard}>
      {/* Chapter Header with Progress */}
      <View style={styles.chapterTop}>
        <View style={styles.flex1}>
          <Text style={styles.chapterName} numberOfLines={2}>{item.name}</Text>
          <View style={styles.chapterMetaRow}>
            <View style={styles.metaItem}>
              <MaterialIcons name="book" size={12} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{item.lessonsCompleted}/{item.totalLessons}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={12} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{item.duration}m</Text>
            </View>
          </View>
        </View>
        <View style={[styles.progressCircle, { borderColor: getProgressColor(item.progress) }]}>
          <Text style={[styles.progressText, { color: getProgressColor(item.progress) }]}>
            {item.progress}%
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${item.progress}%`,
              backgroundColor: getProgressColor(item.progress),
            },
          ]}
        />
      </View>

      {/* Topics */}
      {item.topics && item.topics.length > 0 && (
        <View style={styles.topicsSection}>
          <Text style={styles.topicsSectionTitle}>Topics:</Text>
          <View style={styles.topicsRow}>
            {item.topics.slice(0, 2).map((topic, idx) => (
              <View key={idx} style={styles.topicTag}>
                <Text style={styles.topicText} numberOfLines={1}>{topic}</Text>
              </View>
            ))}
            {item.topics.length > 2 && (
              <Text style={styles.moreTopics}>+{item.topics.length - 2}</Text>
            )}
          </View>
        </View>
      )}

      {/* Bottom Row - Status and Button */}
      <View style={styles.chapterBottom}>
        <View>
          {item.progress === 100 ? (
            <View style={styles.completedBadge}>
              <MaterialIcons name="check-circle" size={14} color={Colors.success} />
              <Text style={styles.completedText}>Completed</Text>
            </View>
          ) : (
            <Text style={styles.statusText}>
              {item.lessonsCompleted === 0 ? 'Not Started' : 'In Progress'}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.smallButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ContentViewer', {
            chapter: { ...item, subject: subject.name }
          })}
        >
          <MaterialIcons
            name={item.progress === 100 ? 'replay' : 'play-arrow'}
            size={14}
            color={Colors.white}
          />
          <Text style={styles.smallButtonText}>
            {item.progress === 100 ? 'Review' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const totalProgress = Math.round(
    chapters.reduce((sum, ch) => sum + ch.progress, 0) / chapters.length
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.flex1}>
          <Text style={styles.headerTitle}>{subject.name}</Text>
          <Text style={styles.headerSubtitle}>{chapters.length} chapters • {chapters.reduce((sum, ch) => sum + ch.duration, 0)} min</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Subject Overview Card */}
        <View style={styles.section}>
          <Card variant="filled" style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <View style={[styles.subjectIconLarge, { backgroundColor: subject.color + '15' }]}>
                <MaterialIcons name={subject.icon} size={40} color={subject.color} />
              </View>
              <View style={styles.overviewInfo}>
                <Text style={styles.overviewTitle}>Overall Progress</Text>
                <Text style={styles.overviewProgress}>{totalProgress}%</Text>
              </View>
            </View>

            {/* Overall Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${totalProgress}%`,
                    backgroundColor: subject.color,
                  },
                ]}
              />
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <MaterialIcons name="library-books" size={14} color={Colors.primary} />
                <Text style={styles.statValue}>{chapters.length}</Text>
                <Text style={styles.statLabel}>Chapters</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <MaterialIcons name="check-circle" size={14} color={Colors.success} />
                <Text style={styles.statValue}>{chapters.filter(ch => ch.progress === 100).length}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <MaterialIcons name="schedule" size={14} color={Colors.warning} />
                <Text style={styles.statValue}>{chapters.reduce((sum, ch) => sum + ch.duration, 0)}</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Learning Objectives */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Path</Text>
          <Card variant="filled" style={styles.infoCard}>
            <View style={styles.objectiveItem}>
              <MaterialIcons name="check" size={16} color={Colors.success} />
              <Text style={styles.objectiveText}>Master core concepts and foundations</Text>
            </View>
            <View style={styles.objectiveItem}>
              <MaterialIcons name="check" size={16} color={Colors.success} />
              <Text style={styles.objectiveText}>Apply knowledge through real examples</Text>
            </View>
            <View style={styles.objectiveItem}>
              <MaterialIcons name="check" size={16} color={Colors.success} />
              <Text style={styles.objectiveText}>Practice with exercises and assessments</Text>
            </View>
          </Card>
        </View>

        {/* Chapters List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chapters</Text>
          <FlatList
            data={chapters}
            renderItem={renderChapter}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={ChapterSeparator}
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
  sectionTitle: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  overviewCard: {
    padding: Spacing.lg,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  subjectIconLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewInfo: {
    flex: 1,
  },
  overviewTitle: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  overviewProgress: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.gray200,
  },
  infoCard: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  objectiveText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    flex: 1,
  },
  chapterCard: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  chapterTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  chapterName: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  chapterMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  progressText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
  },
  topicsSection: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  topicsSectionTitle: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  topicsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  topicTag: {
    backgroundColor: Colors.primary + '12',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
  },
  topicText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.primary,
    fontWeight: '500',
  },
  moreTopics: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  chapterBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  completedText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.success,
    fontWeight: '600',
  },
  statusText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  smallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
  },
  smallButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.white,
  },
});

