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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
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

type SortOption = 'default' | 'subject' | 'date' | 'status';
type FilterStatus = 'all' | 'pending' | 'completed';

interface FilterState {
  status: FilterStatus;
  subjects: string[];
}

export const ExamsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    subjects: [],
  });

  const allSubjects = ['Mathematics', 'Science', 'English', 'Social Studies'];

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

    let sorted = [...allTests];

    // Apply filters
    if (filters.status !== 'all') {
      sorted = sorted.filter((t) => t.status === filters.status);
    }

    if (filters.subjects.length > 0) {
      sorted = sorted.filter((t) => filters.subjects.includes(t.subject));
    }

    // Apply sorting
    if (sortBy === 'subject') {
      sorted.sort((a, b) => a.subject.localeCompare(b.subject));
    } else if (sortBy === 'date') {
      sorted.sort((a, b) => {
        const daysA = a.daysLeft || 999;
        const daysB = b.daysLeft || 999;
        return daysA - daysB;
      });
    } else if (sortBy === 'status') {
      sorted.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return 0;
      });
    } else {
      // default: pending first, then completed
      sorted.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        if (a.status === 'pending' && b.status === 'pending') {
          return (a.daysLeft || 999) - (b.daysLeft || 999);
        }
        return 0;
      });
    }

    return sorted;
  }, [sortBy, filters]);

  const filteredTests = useMemo(() => {
    return sortedTests;
  }, [sortedTests]);

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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ExamTab', {
          screen: 'ExamDetail',
          params: { exam: {
            id: item.id,
            name: item.title,
            subject: item.subject,
            duration: item.duration,
            totalQuestions: item.questions,
            passingScore: 60,
            difficulty: 'medium',
            description: `Test your knowledge on ${item.subject}`,
            attempts: item.status === 'completed' ? 1 : undefined,
            bestScore: item.percentage,
          }}
        })}
      >
        <Card
          variant="filled"
          style={[
            styles.testCard,
            { borderLeftColor: cardColor }
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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with Title and Controls */}
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Tests</Text>
        <View style={styles.headerControls}>
          {/* Sort Button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <MaterialIcons
              name="tune"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>

          {/* Filter Button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <MaterialIcons
              name="filter-list"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
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

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort & Filter</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <MaterialIcons
                name="close"
                size={24}
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Sort Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              {(['default', 'subject', 'date', 'status'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.filterOption}
                  onPress={() => {
                    setSortBy(option);
                  }}
                >
                  <View style={styles.filterOptionContent}>
                    <Text style={styles.filterOptionText}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </View>
                  {sortBy === option && (
                    <MaterialIcons
                      name="check"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Status Filter Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              {(['all', 'pending', 'completed'] as const).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.filterOption}
                  onPress={() => {
                    setFilters({ ...filters, status });
                  }}
                >
                  <View style={styles.filterOptionContent}>
                    <Text style={styles.filterOptionText}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  </View>
                  {filters.status === status && (
                    <MaterialIcons
                      name="check"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Subject Filter Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Subjects</Text>
              {allSubjects.map((subject) => (
                <TouchableOpacity
                  key={subject}
                  style={styles.filterOption}
                  onPress={() => {
                    setFilters((prev) => {
                      const isSelected = prev.subjects.includes(subject);
                      return {
                        ...prev,
                        subjects: isSelected
                          ? prev.subjects.filter((s) => s !== subject)
                          : [...prev.subjects, subject],
                      };
                    });
                  }}
                >
                  <View style={styles.filterOptionContent}>
                    <Text style={styles.filterOptionText}>{subject}</Text>
                  </View>
                  {filters.subjects.includes(subject) && (
                    <MaterialIcons
                      name="check"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Reset Filters Button */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSortBy('default');
                setFilters({ status: 'all', subjects: [] });
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  screenTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerControls: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  controlButton: {
    padding: Spacing.sm,
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
    borderLeftWidth: 4,
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

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  modalTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.sm,
  },
  filterOptionContent: {
    flex: 1,
  },
  filterOptionText: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textPrimary,
  },
  resetButton: {
    marginVertical: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '700',
    color: Colors.white,
  },
});

