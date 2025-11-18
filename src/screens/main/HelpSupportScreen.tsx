/**
 * Help & Support Screen
 * Support resources and contact information
 */

import React, { useState } from 'react';
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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer: 'Go to the login screen and tap "Forgot password?" to reset your password via email.',
  },
  {
    id: '2',
    question: 'Can I change my profile information?',
    answer: 'Yes, go to Profile > Edit Profile to update your personal and academic information.',
  },
  {
    id: '3',
    question: 'How are questions organized?',
    answer: 'Questions are organized by subject and chapter. You can browse question banks from the home screen.',
  },
  {
    id: '4',
    question: 'How do I track my progress?',
    answer: 'Your daily goals and chapter progress are displayed on the home screen and profile pages.',
  },
  {
    id: '5',
    question: 'Can I take practice tests?',
    answer: 'Yes! Go to the Exam tab to take practice tests and track your performance.',
  },
];

export const HelpSupportScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      // Fallback - in real app, show toast or alert
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => openLink('mailto:support@vedai.com')}
            >
              <View style={[styles.contactIcon, { backgroundColor: Colors.primary + '18' }]}>
                <MaterialIcons name="email" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@vedai.com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => openLink('tel:+919876543210')}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#4ECDC4' + '18' }]}>
                <MaterialIcons name="phone" size={24} color="#4ECDC4" />
              </View>
              <Text style={styles.contactLabel}>Call Us</Text>
              <Text style={styles.contactValue}>+91 98765 43210</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => openLink('https://vedai.com/chat')}
            >
              <View style={[styles.contactIcon, { backgroundColor: Colors.warning + '18' }]}>
                <MaterialIcons name="forum" size={24} color={Colors.warning} />
              </View>
              <Text style={styles.contactLabel}>Live Chat</Text>
              <Text style={styles.contactValue}>Available 9-6 PM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => openLink('https://twitter.com/vedaiapp')}
            >
              <View style={[styles.contactIcon, { backgroundColor: Colors.secondary + '18' }]}>
                <MaterialIcons name="share" size={24} color={Colors.secondary} />
              </View>
              <Text style={styles.contactLabel}>Twitter</Text>
              <Text style={styles.contactValue}>@vedaiapp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqItems.map((item) => (
              <Card key={item.id} variant="filled" style={styles.faqCard}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleFAQ(item.id)}
                >
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  <MaterialIcons
                    name={expandedFAQ === item.id ? 'expand-less' : 'expand-more'}
                    size={24}
                    color={Colors.primary}
                  />
                </TouchableOpacity>

                {expandedFAQ === item.id && (
                  <View style={styles.faqBody}>
                    <View style={styles.faqDivider} />
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                  </View>
                )}
              </Card>
            ))}
          </View>
        </View>

        {/* Resources Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>

          <TouchableOpacity
            style={styles.resourceCard}
            onPress={() => openLink('https://vedai.com/docs')}
          >
            <MaterialIcons name="description" size={24} color={Colors.primary} />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Documentation</Text>
              <Text style={styles.resourceSubtitle}>Learn how to use all features</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceCard}
            onPress={() => openLink('https://vedai.com/blog')}
          >
            <MaterialIcons name="article" size={24} color={Colors.warning} />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Blog</Text>
              <Text style={styles.resourceSubtitle}>Tips & updates from our team</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceCard}
            onPress={() => openLink('https://vedai.com/community')}
          >
            <MaterialIcons name="people" size={24} color={Colors.success} />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Community</Text>
              <Text style={styles.resourceSubtitle}>Connect with other students</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: FontSizes.titleMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  contactCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  contactLabel: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  contactValue: {
    fontSize: FontSizes.labelMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  faqContainer: {
    gap: Spacing.md,
  },
  faqCard: {
    padding: 0,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  faqQuestion: {
    fontSize: FontSizes.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.md,
  },
  faqBody: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  faqDivider: {
    height: 1,
    backgroundColor: Colors.gray200,
    marginBottom: Spacing.md,
  },
  faqAnswer: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.md,
  },
  resourceContent: {
    flex: 1,
    marginHorizontal: Spacing.lg,
  },
  resourceTitle: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  resourceSubtitle: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
});

