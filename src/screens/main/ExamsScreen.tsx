/**
 * Exams Screen
 * Display all exams and exam management
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
import { Header, Card } from '../../components';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export const ExamsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed'>(
    'upcoming'
  );

  // Memoized separator component
  const ItemSeparator = React.useMemo(
    () => () => <View style={styles.separator} />,
    []
  );

  // Mock data
  const exams: Exam[] = [
    {
      id: '1',
      name: 'Final Exam - Mathematics',
      subject: 'Mathematics',
      date: '2024-12-20',
      time: '10:00 AM',
      duration: 120,
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'Midterm - English',
      subject: 'English',
      date: '2024-12-15',
      time: '2:00 PM',
      duration: 90,
      status: 'upcoming',
    },
    {
      id: '3',
      name: 'Quiz - Science',
      subject: 'Science',
      date: '2024-12-10',
      time: '11:30 AM',
      duration: 45,
      status: 'completed',
    },
  ];

  const filteredExams = exams.filter(
    (exam) => exam.status === selectedTab || exam.status === 'completed'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return Colors.warning;
      case 'ongoing':
        return Colors.info;
      case 'completed':
        return Colors.success;
      default:
        return Colors.gray500;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'schedule';
      case 'ongoing':
        return 'play-circle-outline';
      case 'completed':
        return 'check-circle';
      default:
        return 'info';
    }
  };

  const renderExamCard = ({ item }: { item: Exam }) => (
    <Card variant="elevated" style={styles.examCard}>
      <View style={styles.examCardHeader}>
        <View style={styles.examInfo}>
          <Text style={styles.examName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.examSubject}>{item.subject}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + '20' },
          ]}
        >
          <MaterialIcons
            name={getStatusIcon(item.status)}
            size={20}
            color={getStatusColor(item.status)}
          />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.examDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons
            name="event"
            size={18}
            color={Colors.textSecondary}
          />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons
            name="access-time"
            size={18}
            color={Colors.textSecondary}
          />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons
            name="timer"
            size={18}
            color={Colors.textSecondary}
          />
          <Text style={styles.detailText}>{item.duration} minutes</Text>
        </View>
      </View>

      {item.status === 'upcoming' && (
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Preparation</Text>
        </TouchableOpacity>
      )}
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Exams" />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'upcoming' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'completed' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'completed' && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {filteredExams.length > 0 ? (
            <FlatList
              data={filteredExams}
              renderItem={renderExamCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={ItemSeparator}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons
                name="event-busy"
                size={48}
                color={Colors.gray300}
              />
              <Text style={styles.emptyStateText}>No exams found</Text>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  examCard: {
    marginBottom: Spacing.sm,
  },
  examCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  examInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  examName: {
    fontSize: FontSizes.bodyLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  examSubject: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
  },
  statusBadge: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray200,
    marginVertical: Spacing.md,
  },
  examDetails: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  startButtonText: {
    fontSize: FontSizes.bodyMedium,
    fontWeight: '600',
    color: Colors.white,
  },
  separator: {
    height: Spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyStateText: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
});

