/**
 * Login Screen
 * Modern Material Design login interface
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
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Button, TextInputField } from '../../components';
import { useForm } from '../../hooks';
import { useValidation } from '../../hooks';
import { useAuth } from '../../context';

interface LoginFormData {
  [key: string]: string;
  email: string;
  password: string;
}

export const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
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
    const emailError = validateEmail(form.values.email);
    const passwordError = validatePassword(form.values.password);

    if (emailError) {
      form.setError('email', emailError);
    }
    if (passwordError) {
      form.setError('password', passwordError);
    }

    if (!emailError && !passwordError) {
      form.setSubmitting(true);
      try {
        await login(form.values.email, form.values.password);
      } catch {
        setLoginError('Login failed. Please try again.');
      } finally {
        form.setSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <MaterialIcons
                  name="school"
                  size={48}
                  color={Colors.white}
                />
              </View>
            </View>
            <Text style={styles.appTitle}>VEDAI</Text>
            <Text style={styles.appSubtitle}>Student Learning Platform</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.formTitle}>Welcome Back</Text>
            <Text style={styles.formSubtitle}>
              Sign in to your account to continue
            </Text>

            {loginError && (
              <View style={styles.errorContainer}>
                <MaterialIcons
                  name="error-outline"
                  size={20}
                  color={Colors.error}
                />
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            )}

            <TextInputField
              label="Email Address"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="primary"
              size="large"
              loading={form.isSubmitting}
              style={styles.loginButton}
            />
          </View>

          <View style={styles.signupSection}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: FontSizes.headlineLarge,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  appSubtitle: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
  },
  formSection: {
    marginBottom: Spacing.xl,
  },
  formTitle: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  formSubtitle: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error + '15',
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.lg,
  },
  errorText: {
    flex: 1,
    fontSize: FontSizes.bodySmall,
    color: Colors.error,
    marginLeft: Spacing.md,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotPasswordText: {
    fontSize: FontSizes.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: Spacing.md,
  },
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.lg,
  },
  signupText: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.textSecondary,
  },
  signupLink: {
    fontSize: FontSizes.bodyMedium,
    color: Colors.primary,
    fontWeight: '600',
  },
});

