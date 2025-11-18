/**
 * Login Screen
 * Modern minimal login interface for students
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
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { TextInputField } from '../../components';
import { useForm } from '../../hooks';
import { useValidation } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context';

interface LoginFormData {
  [key: string]: string;
  email: string;
  password: string;
}

// TODO: Change this to false to enable validation after testing
const DISABLE_VALIDATION = true;

export const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { login } = useAuth();
  const { validateEmail, validatePassword } = useValidation();
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<LoginFormData>(
    {
      email: '',
      password: '',
    }
  );

  const handleLogin = async () => {
    // Validation can be disabled for testing by changing DISABLE_VALIDATION flag
    if (!DISABLE_VALIDATION) {
      const emailError = validateEmail(form.values.email);
      const passwordError = validatePassword(form.values.password);

      if (emailError) {
        form.setError('email', emailError);
      }
      if (passwordError) {
        form.setError('password', passwordError);
      }

      if (emailError || passwordError) {
        return;
      }
    }

    form.setSubmitting(true);
    try {
      await login(form.values.email, form.values.password);
    } catch {
      setLoginError('Login failed. Please try again.');
    } finally {
      form.setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
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
            <Text style={styles.tagline}>Learn Smart, Score Better</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Welcome Back</Text>
            <Text style={styles.formSubtitle}>Sign in to continue learning</Text>

            {loginError && (
              <View style={styles.errorBanner}>
                <MaterialIcons
                  name="error-outline"
                  size={18}
                  color={Colors.error}
                />
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <TextInputField
                label="Email"
                placeholder="your.email@example.com"
                value={form.values.email}
                onChangeText={(email) => form.setValue('email', email)}
                onBlur={() => form.setFieldTouched('email')}
                error={form.touched.email ? form.errors.email : undefined}
                keyboardType="default"
                iconName="email"
                returnKeyType="next"
              />

              <TextInputField
                label="Password"
                placeholder="Enter password"
                value={form.values.password}
                onChangeText={(password) => form.setValue('password', password)}
                onBlur={() => form.setFieldTouched('password')}
                error={form.touched.password ? form.errors.password : undefined}
                secureTextEntry
                iconName="lock"
                keyboardType="default"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>

            <TouchableOpacity style={styles.forgotLink}>
              <Text style={styles.forgotText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signInButton, form.isSubmitting && styles.signInButtonDisabled]}
              onPress={handleLogin}
              disabled={form.isSubmitting}
              activeOpacity={0.8}
            >
              <View style={styles.signInButtonContent}>
                {form.isSubmitting ? (
                  <>
                    <ActivityIndicator color={Colors.white} size="small" style={styles.buttonLoader} />
                    <Text style={styles.signInButtonText}>Signing in...</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                    <MaterialIcons name="arrow-forward" size={18} color={Colors.white} style={styles.buttonIcon} />
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>New to VedAI? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}>Create account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
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

  // Header
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

  // Form
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

  forgotLink: {
    alignItems: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
  },

  signInButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    elevation: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  signInButtonText: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: Spacing.xs,
  },
  buttonLoader: {
    marginRight: Spacing.xs,
  },

  // Footer
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
  signupLink: {
    fontSize: FontSizes.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
});

