/**
 * About Screen
 * App information and credits
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

const APP_VERSION = '1.0.0';
const BUILD_NUMBER = '2024.11.18';

export const AboutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      // Fallback
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About VedAI</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Info Card */}
        <View style={styles.section}>
          <View style={styles.appInfoCard}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <MaterialIcons name="school" size={56} color={Colors.white} />
              </View>
            </View>
            <Text style={styles.appName}>VedAI</Text>
            <Text style={styles.appTagline}>Smart Learning Platform</Text>
            <Text style={styles.versionInfo}>Version {APP_VERSION} (Build {BUILD_NUMBER})</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Card variant="filled" style={styles.descriptionCard}>
            <Text style={styles.descriptionTitle}>About Us</Text>
            <Text style={styles.descriptionText}>
              VedAI is an AI-powered learning platform designed to help students excel in their
              studies. We provide personalized learning experiences, comprehensive question banks,
              and real-time progress tracking to help you achieve your academic goals.
            </Text>
          </Card>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <Card variant="filled" style={styles.featuresCard}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <MaterialIcons name="smart-toy" size={24} color={Colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>AI Assistant</Text>
                <Text style={styles.featureDescription}>Get instant answers to your questions</Text>
              </View>
            </View>

            <View style={styles.featureDivider} />

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <MaterialIcons name="assessment" size={24} color={Colors.warning} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Practice Tests</Text>
                <Text style={styles.featureDescription}>Unlimited practice questions</Text>
              </View>
            </View>

            <View style={styles.featureDivider} />

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <MaterialIcons name="trending-up" size={24} color={Colors.success} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Progress Tracking</Text>
                <Text style={styles.featureDescription}>Monitor your learning journey</Text>
              </View>
            </View>

            <View style={styles.featureDivider} />

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <MaterialIcons name="book" size={24} color={Colors.secondary} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Study Materials</Text>
                <Text style={styles.featureDescription}>Curated learning content</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Links</Text>

          <TouchableOpacity
            style={styles.linkCard}
            onPress={() => openLink('https://vedai.com')}
          >
            <MaterialIcons name="language" size={24} color={Colors.primary} />
            <View style={styles.linkContent}>
              <Text style={styles.linkTitle}>Website</Text>
              <Text style={styles.linkUrl}>vedai.com</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkCard}
            onPress={() => openLink('https://vedai.com/privacy')}
          >
            <MaterialIcons name="privacy-tip" size={24} color={Colors.warning} />
            <View style={styles.linkContent}>
              <Text style={styles.linkTitle}>Privacy Policy</Text>
              <Text style={styles.linkUrl}>vedai.com/privacy</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkCard}
            onPress={() => openLink('https://vedai.com/terms')}
          >
            <MaterialIcons name="description" size={24} color={Colors.success} />
            <View style={styles.linkContent}>
              <Text style={styles.linkTitle}>Terms of Service</Text>
              <Text style={styles.linkUrl}>vedai.com/terms</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Credits */}
        <View style={styles.section}>
          <Card variant="filled" style={styles.creditsCard}>
            <Text style={styles.creditsTitle}>Made with ❤️</Text>
            <Text style={styles.creditsText}>
              VedAI is built by a passionate team dedicated to making quality education accessible
              to everyone. Thank you for being part of our learning community!
            </Text>
          </Card>
        </View>

        {/* Copyright */}
        <View style={styles.section}>
          <Text style={styles.copyrightText}>
            © 2024 VedAI. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  headerTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.lg,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  appInfoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: FontSizes.displaySmall,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  appTagline: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  versionInfo: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  descriptionCard: {
    padding: Spacing.lg,
  },
  descriptionTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  descriptionText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  featuresCard: {
    padding: Spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  featureDivider: {
    height: 1,
    backgroundColor: Colors.gray200,
    marginVertical: Spacing.lg,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.md,
  },
  linkContent: {
    flex: 1,
    marginHorizontal: Spacing.lg,
  },
  linkTitle: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  linkUrl: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  creditsCard: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  creditsTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  creditsText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  copyrightText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

