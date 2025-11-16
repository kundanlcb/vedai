/**
 * Learn Module - Subject List Screen
 * Displays all available subjects with progress indicators
 */

import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetSubjects } from '../../hooks/useChapters';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import { getColors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/typography';

type Props = any;

export const SubjectListScreen: React.FC<Props> = ({ navigation }) => {
  const colorMode = (useColorScheme() || 'light') as 'light' | 'dark';
  const colors = getColors(colorMode);

  // Define styles before using them
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
    subjectCard: {
      marginBottom: Spacing.lg,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: Spacing.md,
    },
    subjectInfo: {
      flex: 1,
      marginRight: Spacing.md,
    },
    description: {
      marginTop: Spacing.xs,
    },
    progressCircle: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#10B981',
      borderWidth: 3,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: BorderRadius.full,
      overflow: 'hidden',
      marginBottom: Spacing.sm,
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10B981',
    },
    progressText: {
      marginTop: Spacing.sm,
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
  });

  // Fetch subjects for the student's class
  const { data: subjects, isLoading: subjectsLoading, error: subjectsError } = useGetSubjects(
    'Class 10' // TODO: Get from student profile
  );

  // Calculate subject progress
  const subjectsWithProgress = useMemo(() => {
    if (!subjects?.data) return [];

    return subjects.data.map((subject: any) => {
      const subjectProgress = {
        completion_percentage: Math.random() * 0.5, // Mock: 0-50%
        chapters_completed: Math.floor(Math.random() * 3),
        total_chapters: 5,
      };

      return {
        ...subject,
        progress: subjectProgress,
      };
    });
  }, [subjects]);

  const handleSubjectPress = (subjectId: string, subjectName: string) => {
    navigation.navigate('ChapterList', { subjectId, subjectName });
  };

  const renderSubjectCard = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleSubjectPress(item.id, item.name)}>
      <Card style={styles.subjectCard}>
        <View style={styles.cardHeader}>
          <View style={styles.subjectInfo}>
            <Text variant="h5" color="primary" weight="semibold">
              {item.name}
            </Text>
            <Text variant="body_sm" color="secondary" style={styles.description}>
              {item.description}
            </Text>
          </View>
          <View style={styles.progressCircle}>
            <Text variant="h6" color="primary" weight="bold">
              {Math.round((item.progress?.completion_percentage || 0) * 100)}%
            </Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.round((item.progress?.completion_percentage || 0) * 100)}%`,
              },
            ]}
          />
        </View>

        <Text variant="body_xs" color="secondary" style={styles.progressText}>
          {item.progress?.chapters_completed || 0} of {item.progress?.total_chapters || 5} chapters completed
        </Text>
      </Card>
    </TouchableOpacity>
  );

  if (subjectsLoading) {
    return <Loading visible={true} message="Loading subjects..." />;
  }

  if (subjectsError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="h5" color="error">
            Failed to load subjects
          </Text>
          <Text variant="body_sm" color="secondary" style={styles.errorText}>
            {(subjectsError as Error).message}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={subjectsWithProgress}
        renderItem={renderSubjectCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text variant="h3" color="primary" style={styles.title}>
              Learn
            </Text>
            <Text variant="body_sm" color="secondary" style={styles.subtitle}>
              Select a subject to start learning
            </Text>
          </View>
        }
        scrollIndicatorInsets={{ right: 1 }}
      />
    </SafeAreaView>
  );
};

