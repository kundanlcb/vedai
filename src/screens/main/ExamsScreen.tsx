/**
 * Exams Screen (Tests)
 * Browse all mock tests - pending and completed, sorted chronologically
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

interface TestItem {
  id: string;
  title: string;
  subject: string;
  questions: number;
  duration: number;
  marks: number;
  status: 'pending' | 'completed';
  score?: number;
  percentage?: number;
  daysLeft?: number;
}

// Separator component
const ItemSeparator = () => <View style={styles.separator} />;

export const ExamsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Sort: pending first, then completed
  const sortedTests = useMemo(() => {
    const allTests: TestItem[] = [
      // Pending tests
      {
        id: '1',
        title: 'Mathematics Full Mock',
        subject: 'Mathematics',
        questions: 30,
        duration: 90,
        marks: 100,
        status: 'pending',
        daysLeft: 3,
      },
      {
        id: '2',
        title: 'Science Combined',
        subject: 'Science',
        questions: 35,
        duration: 120,
        marks: 120,
        status: 'pending',
        daysLeft: 7,
      },
      {
        id: '3',
        title: 'English Comprehension',
        subject: 'English',
        questions: 25,
        duration: 60,
        marks: 80,
        status: 'pending',
        daysLeft: 5,
      },
      // Completed tests
      {
        id: '4',
        title: 'Social Studies Full Test',
        subject: 'Social Studies',
        questions: 40,
        duration: 100,
        marks: 100,
        status: 'completed',
        score: 78,
        percentage: 78,
      },
      {
        id: '5',
        title: 'Mathematics Chapter Test',
        subject: 'Mathematics',
        questions: 15,
        duration: 45,
        marks: 50,
        status: 'completed',
        score: 42,
        percentage: 84,
      },
      {
        id: '6',
        title: 'English Grammar Test',
        subject: 'English',
        questions: 20,
        duration: 30,
        marks: 60,
        status: 'completed',
        score: 54,
        percentage: 90,
      },
    ];

    return [...allTests].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      if (a.status === 'pending' && b.status === 'pending') {
        return (a.daysLeft || 999) - (b.daysLeft || 999);
      }
      return 0;
    });
  }, []);

  const filteredTests = useMemo(() => {
    return sortedTests.filter(
      (test) =>
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedTests]);

  const renderTestCard = ({ item }: { item: TestItem }) => {
    const isPending = item.status === 'pending';
    // Color coding by subject
    const subjectColors: { [key: string]: string } = {
      'Mathematics': '#FF6B6B',
      'Science': '#4ECDC4',
      'English': '#FFB84D',
      'Social Studies': '#95E1D3',
    };
    const cardColor = subjectColors[item.subject] || Colors.primary;

    return (
      <TouchableOpacity activeOpacity={0.7}>
        <Card
          variant="filled"
          style={[
            styles.testCard,
            { borderLeftColor: cardColor, borderLeftWidth: 4 }
          ]}
        >
          {/* Header with Title and Badge */}
          <View style={styles.cardHeader}>
            <View style={styles.titleSection}>
              <Text style={styles.testTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.testSubject}>{item.subject}</Text>
            </View>
            {isPending ? (
              <View style={styles.daysLeftBadge}>
                <MaterialIcons
                  name="schedule"
                  size={14}
                  color={Colors.warning}
                />
                <Text style={styles.daysLeftText}>{item.daysLeft}d</Text>
              </View>
            ) : (
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreValue}>{item.percentage}%</Text>
              </View>
            )}
          </View>

          {/* Details Row and Button */}
          <View style={styles.cardFooter}>
            <View style={styles.detailsRow}>
              <View style={styles.detail}>
                <MaterialIcons
                  name="help-outline"
                  size={14}
                  color={Colors.textSecondary}
                />
                <Text style={styles.detailText}>{item.questions}Q</Text>
              </View>
              <Text style={styles.detailSeparator}>•</Text>
              <View style={styles.detail}>
                <MaterialIcons
                  name="schedule"
                  size={14}
                  color={Colors.textSecondary}
                />
                <Text style={styles.detailText}>{item.duration}m</Text>
              </View>
              <Text style={styles.detailSeparator}>•</Text>
              <View style={styles.detail}>
                <MaterialIcons
                  name="star"
                  size={14}
                  color={Colors.textSecondary}
                />
                <Text style={styles.detailText}>{item.marks}</Text>
              </View>
            </View>

            {/* Action Button - Right aligned */}
            <TouchableOpacity
              style={[styles.actionButton, !isPending && styles.actionButtonCompleted]}
              activeOpacity={0.7}
            >
              <Text style={[styles.actionButtonText, !isPending && styles.actionButtonTextCompleted]}>
                {isPending ? 'Start' : 'Details'}
              </Text>
              <MaterialIcons
                name={isPending ? 'play-arrow' : 'arrow-forward'}
                size={14}
                color={isPending ? Colors.white : Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
    filteredTests.filter((t) => t.status === 'pending').length;
    filteredTests.filter((t) => t.status === 'completed').length;
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.titleBar}>
        <Text style={styles.screenTitle}>Tests</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={20}
          color={Colors.textSecondary}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tests..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons
              name="close"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>


      {/* Tests List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {filteredTests.length > 0 ? (
            <FlatList
              data={filteredTests}
              renderItem={renderTestCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={ItemSeparator}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons
                name="assignment-ind"
                size={48}
                color={Colors.gray300}
              />
              <Text style={styles.emptyText}>No tests found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  titleBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  screenTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    borderColor: Colors.gray100,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.bodyMedium,
    color: Colors.textPrimary,
  },


  // List
  scrollView: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  // Test Card
  testCard: {
    overflow: 'hidden',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  titleSection: {
    flex: 1,
  },
  testTitle: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    lineHeight: 20,
  },
  testSubject: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  daysLeftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning + '25',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.medium,
    gap: Spacing.xs,
    minWidth: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.warning,
  },
  daysLeftText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
    color: Colors.warning,
  },
  scoreBadge: {
    backgroundColor: Colors.success + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.medium,
    minWidth: 50,
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
    color: Colors.success,
  },

  // Card Footer - Details and Button
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },

  // Details
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  detailSeparator: {
    fontSize: FontSizes.labelSmall,
    color: Colors.gray300,
  },

  // Action Button - Compact, Right-aligned
  actionButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 70,
  },
  actionButtonCompleted: {
    backgroundColor: Colors.success + '20',
    borderWidth: 1,
    borderColor: Colors.success,
  },
  actionButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '700',
    color: Colors.white,
  },
  actionButtonTextCompleted: {
    color: Colors.success,
  },

  // Separator
  separator: {
    height: Spacing.md,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
});

