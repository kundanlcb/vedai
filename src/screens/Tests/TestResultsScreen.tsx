/**
 * Test Results Screen
 * Detailed test results and performance analysis
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

export const TestResultsScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { score, total } = route.params as {
    testId: string;
    score: number;
    total: number;
  };

  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 60;

  const getPerformanceLevel = () => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return Colors.success;
    if (percentage >= 75) return '#00BCD4';
    if (percentage >= 60) return Colors.warning;
    return Colors.error;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Test Results</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Result Card */}
        <Card variant="filled" style={styles.resultCard}>
          {/* Status Badge */}
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isPassed ? Colors.success + '20' : Colors.error + '20' },
            ]}
          >
            <MaterialIcons
              name={isPassed ? 'check-circle' : 'cancel'}
              size={20}
              color={isPassed ? Colors.success : Colors.error}
            />
            <Text
              style={[
                styles.statusText,
                { color: isPassed ? Colors.success : Colors.error },
              ]}
            >
              {isPassed ? 'Test Passed' : 'Test Failed'}
            </Text>
          </View>

          {/* Score Circle */}
          <View
            style={[
              styles.scoreCircle,
              { borderColor: getPerformanceColor() },
            ]}
          >
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>

          {/* Score Details */}
          <View style={styles.scoreDetails}>
            <View style={styles.scoreDetailItem}>
              <Text style={styles.scoreDetailLabel}>Correct</Text>
              <Text style={[styles.scoreDetailValue, { color: Colors.success }]}>
                {score}
              </Text>
            </View>
            <View style={styles.scoreDetailDivider} />
            <View style={styles.scoreDetailItem}>
              <Text style={styles.scoreDetailLabel}>Incorrect</Text>
              <Text style={[styles.scoreDetailValue, { color: Colors.error }]}>
                {total - score}
              </Text>
            </View>
            <View style={styles.scoreDetailDivider} />
            <View style={styles.scoreDetailItem}>
              <Text style={styles.scoreDetailLabel}>Total</Text>
              <Text style={styles.scoreDetailValue}>{total}</Text>
            </View>
          </View>

          {/* Performance Level */}
          <View style={styles.performanceSection}>
            <Text style={styles.performanceLabel}>Performance</Text>
            <Text
              style={[
                styles.performanceLevel,
                { color: getPerformanceColor() },
              ]}
            >
              {getPerformanceLevel()}
            </Text>
          </View>
        </Card>

        {/* Analysis Card */}
        <Card variant="filled" style={styles.analysisCard}>
          <View style={styles.analysisHeader}>
            <MaterialIcons name="insights" size={20} color={Colors.primary} />
            <Text style={styles.analysisTitle}>Analysis</Text>
          </View>

          <View style={styles.analysisItem}>
            <Text style={styles.analysisLabel}>Accuracy</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${percentage}%`, backgroundColor: getPerformanceColor() },
                ]}
              />
            </View>
            <Text style={styles.analysisValue}>{percentage}% Accurate</Text>
          </View>

          <View style={styles.analysisItem}>
            <Text style={styles.analysisLabel}>Passing Score</Text>
            <Text style={styles.analysisValue}>60% Required</Text>
            {isPassed ? (
              <Text style={[styles.resultText, { color: Colors.success }]}>
                ✓ Above passing score
              </Text>
            ) : (
              <Text style={[styles.resultText, { color: Colors.error }]}>
                ✗ Below passing score
              </Text>
            )}
          </View>

          <View style={styles.analysisItem}>
            <Text style={styles.analysisLabel}>Next Steps</Text>
            <View style={styles.nextStepsContainer}>
              <View style={styles.nextStepItem}>
                <MaterialIcons name="play-circle" size={16} color={Colors.primary} />
                <Text style={styles.nextStepText}>Review weak areas</Text>
              </View>
              <View style={styles.nextStepItem}>
                <MaterialIcons name="play-circle" size={16} color={Colors.primary} />
                <Text style={styles.nextStepText}>Practice more questions</Text>
              </View>
              <View style={styles.nextStepItem}>
                <MaterialIcons name="play-circle" size={16} color={Colors.primary} />
                <Text style={styles.nextStepText}>Retake test</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Recommendations Card */}
        <Card variant="filled" style={styles.recommendationsCard}>
          <View style={styles.recommendationsHeader}>
            <MaterialIcons name="lightbulb" size={20} color={Colors.warning} />
            <Text style={styles.recommendationsTitle}>Recommendations</Text>
          </View>

          <View style={styles.recommendationItem}>
            <View style={styles.recommendationNumber}>1</View>
            <Text style={styles.recommendationText}>
              Focus on topics with low accuracy
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <View style={styles.recommendationNumber}>2</View>
            <Text style={styles.recommendationText}>
              Practice similar test patterns
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <View style={styles.recommendationNumber}>3</View>
            <Text style={styles.recommendationText}>
              Take timed mock tests regularly
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <View style={styles.recommendationNumber}>4</View>
            <Text style={styles.recommendationText}>
              Review your mistakes carefully
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color={Colors.primary} />
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.popToTop()}
        >
          <MaterialIcons name="home" size={20} color={Colors.white} />
          <Text style={styles.primaryButtonText}>Home</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  resultCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  statusText: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  scorePercentage: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  scoreLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  scoreDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  scoreDetailItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreDetailLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  scoreDetailValue: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  scoreDetailDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.gray200,
  },
  performanceSection: {
    alignItems: 'center',
    width: '100%',
  },
  performanceLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  performanceLevel: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '700',
  },
  analysisCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  analysisTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  analysisItem: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  analysisLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  analysisValue: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: Spacing.sm,
  },
  progressFill: {
    height: '100%',
  },
  resultText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  nextStepsContainer: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  nextStepText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
  },
  recommendationsCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  recommendationsTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  recommendationNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '700',
  },
  recommendationText: {
    flex: 1,
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.primary,
    gap: Spacing.sm,
  },
  secondaryButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.primary,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    gap: Spacing.sm,
  },
  primaryButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
});

