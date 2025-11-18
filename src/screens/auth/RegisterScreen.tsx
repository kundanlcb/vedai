/**
 * Register Screen
 * Student registration and account creation
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { TextInputField } from '../../components';
import { useForm } from '../../hooks';
import { useValidation } from '../../hooks';

interface RegisterFormData {
  [key: string]: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { validateEmail, validatePassword } = useValidation();
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    setRegistrationError(null);

    if (!form.values.fullName.trim()) {
      form.setError('fullName', 'Full name is required');
      return;
    }

    const emailError = validateEmail(form.values.email);
    if (emailError) {
      form.setError('email', emailError);
      return;
    }

    const passwordError = validatePassword(form.values.password);
    if (passwordError) {
      form.setError('password', passwordError);
      return;
    }

    if (form.values.password !== form.values.confirmPassword) {
      form.setError('confirmPassword', 'Passwords do not match');
      return;
    }

    form.setSubmitting(true);
    try {
      // TODO: Connect to backend registration API
      // await register(form.values.email, form.values.password, form.values.fullName);
      navigation.replace('Login');
    } catch (error) {
      setRegistrationError('Registration failed. Please try again.');
    } finally {
      form.setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <MaterialIcons name="school" size={40} color={Colors.primary} />
          </View>
          <Text style={styles.appName}>VedAI</Text>
          <Text style={styles.tagline}>Create Your Account</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Get Started</Text>
          <Text style={styles.formSubtitle}>Sign up to start learning today</Text>

          {registrationError && (
            <View style={styles.errorBanner}>
              <MaterialIcons
                name="error-outline"
                size={18}
                color={Colors.error}
              />
              <Text style={styles.errorText}>{registrationError}</Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <TextInputField
              label="Full Name"
              placeholder="Your full name"
              value={form.values.fullName}
              onChangeText={(fullName) => form.setValue('fullName', fullName)}
              onBlur={() => form.setFieldTouched('fullName')}
              error={form.touched.fullName ? form.errors.fullName : undefined}
              iconName="person"
              returnKeyType="next"
            />

            <TextInputField
              label="Email"
              placeholder="your.email@example.com"
              value={form.values.email}
              onChangeText={(email) => form.setValue('email', email)}
              onBlur={() => form.setFieldTouched('email')}
              error={form.touched.email ? form.errors.email : undefined}
              keyboardType="email-address"
              iconName="email"
              returnKeyType="next"
            />

            <TextInputField
              label="Password"
              placeholder="Create a strong password"
              value={form.values.password}
              onChangeText={(password) => form.setValue('password', password)}
              onBlur={() => form.setFieldTouched('password')}
              error={form.touched.password ? form.errors.password : undefined}
              secureTextEntry
              iconName="lock"
              returnKeyType="next"
            />

            <TextInputField
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={form.values.confirmPassword}
              onChangeText={(confirmPassword) =>
                form.setValue('confirmPassword', confirmPassword)
              }
              onBlur={() => form.setFieldTouched('confirmPassword')}
              error={form.touched.confirmPassword ? form.errors.confirmPassword : undefined}
              secureTextEntry
              iconName="lock-outline"
              returnKeyType="done"
              onSubmitEditing={handleRegister}
            />
          </View>

          <TouchableOpacity
            style={[styles.registerButton, form.isSubmitting && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={form.isSubmitting}
          >
            <Text style={styles.registerButtonText}>
              {form.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  appName: {
    fontSize: FontSizes.displaySmall,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
  },
  formContainer: {
    marginBottom: Spacing.lg,
  },
  formTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  formSubtitle: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error + '12',
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  errorText: {
    flex: 1,
    fontSize: FontSizes.bodySmall,
    color: Colors.error,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  registerButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  registerButtonText: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
    color: Colors.white,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },
  footerText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: FontSizes.bodySmall,
    color: Colors.primary,
    fontWeight: '700',
  },
});

