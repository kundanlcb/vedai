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
}

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
    },
    {
      id: 'ch2',
      name: 'Chapter 2: Fundamentals',
      progress: 75,
      lessonsCompleted: 3,
      totalLessons: 4,
      duration: 60,
    },
    {
      id: 'ch3',
      name: 'Chapter 3: Advanced Concepts',
      progress: 50,
      lessonsCompleted: 2,
      totalLessons: 4,
      duration: 75,
    },
    {
      id: 'ch4',
      name: 'Chapter 4: Applications',
      progress: 25,
      lessonsCompleted: 1,
      totalLessons: 4,
      duration: 60,
    },
    {
      id: 'ch5',
      name: 'Chapter 5: Practice & Review',
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 3,
      duration: 45,
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
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ContentViewer', { chapter: item })}>
      <Card variant="filled" style={styles.chapterCard}>
        {/* Chapter Header */}
        <View style={styles.chapterHeader}>
          <View style={styles.flex1}>
            <Text style={styles.chapterName}>{item.name}</Text>
            <Text style={styles.chapterMeta}>
              {item.lessonsCompleted}/{item.totalLessons} lessons • {item.duration} min
            </Text>
          </View>
          <View style={styles.progressCircle}>
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

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.actionButton, item.progress === 100 && styles.actionButtonCompleted]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ContentViewer', { chapter: item })}
        >
          <MaterialIcons
            name={item.progress === 100 ? 'done-all' : 'play-arrow'}
            size={16}
            color={item.progress === 100 ? Colors.success : Colors.white}
          />
          <Text style={[styles.actionButtonText, item.progress === 100 && styles.actionButtonTextCompleted]}>
            {item.progress === 100 ? 'Completed' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
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
          <Text style={styles.headerSubtitle}>{chapters.length} chapters</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Subject Overview Card */}
        <View style={styles.section}>
          <Card variant="filled" style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <View style={[styles.subjectIconLarge, { backgroundColor: subject.color + '15' }]}>
                <MaterialIcons name={subject.icon} size={40} color={subject.color} />
              </View>
              <View style={styles.flex1}>
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
                <MaterialIcons name="library-books" size={16} color={Colors.textSecondary} />
                <Text style={styles.statValue}>{chapters.length}</Text>
                <Text style={styles.statLabel}>Chapters</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <MaterialIcons name="check-circle" size={16} color={Colors.success} />
                <Text style={styles.statValue}>{chapters.filter(ch => ch.progress === 100).length}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <MaterialIcons name="schedule" size={16} color={Colors.warning} />
                <Text style={styles.statValue}>{chapters.reduce((sum, ch) => sum + ch.duration, 0)}</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
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
            ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
          />
        </View>
      </ScrollView>
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
    height: 8,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
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
  },
  statValue: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.gray200,
  },
  chapterCard: {
    padding: Spacing.md,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  chapterName: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  chapterMeta: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  actionButtonCompleted: {
    backgroundColor: Colors.success + '15',
    borderWidth: 1,
    borderColor: Colors.success,
  },
  actionButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
  actionButtonTextCompleted: {
    color: Colors.success,
  },
});

