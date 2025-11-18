/**
 * Profile Edit Screen
 * Edit student profile information and preferences
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants';
import { Card } from '../../components';

export const ProfileEditScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Form state
  const [fullName, setFullName] = useState('Kundan Kumar');
  const [email, setEmail] = useState('kundan@example.com');
  const [className, _setClassName] = useState('Class 10');
  const [schoolName, setSchoolName] = useState('Delhi Public School');
  const [board, _setBoard] = useState('CBSE');
  const [medium, _setMedium] = useState('English');
  const [bio, setBio] = useState('Passionate about learning and improving my grades');

  // Preferences
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Full name is required');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    Alert.alert('Success', 'Profile updated successfully', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profilePictureSection}>
          <TouchableOpacity
            style={styles.profilePictureButton}
            onPress={() => Alert.alert('Change Picture', 'Feature coming soon')}
          >
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitial}>K</Text>
            </View>
            <View style={styles.editPictureButton}>
              <MaterialIcons name="camera-alt" size={16} color={Colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.profilePictureText}>Tap to change profile picture</Text>
        </View>

        {/* Personal Information Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Card variant="filled" style={styles.formCard}>
            {/* Full Name */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor={Colors.gray400}
              />
            </View>

            {/* Email */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                keyboardType="email-address"
                placeholderTextColor={Colors.gray400}
              />
            </View>

            {/* Bio */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Bio</Text>
              <TextInput
                style={[styles.textInput, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={3}
                placeholderTextColor={Colors.gray400}
              />
            </View>
          </Card>
        </View>

        {/* Academic Information Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <Card variant="filled" style={styles.formCard}>
            {/* Class */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Class</Text>
              <View style={styles.selectContainer}>
                <TextInput
                  style={[styles.textInput, styles.noMargin]}
                  value={className}
                  editable={false}
                  placeholder="Select class"
                  placeholderTextColor={Colors.gray400}
                />
                <MaterialIcons
                  name="expand-more"
                  size={24}
                  color={Colors.gray400}
                  style={styles.selectIcon}
                />
              </View>
            </View>

            {/* Board */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Board</Text>
              <View style={styles.selectContainer}>
                <TextInput
                  style={[styles.textInput, styles.noMargin]}
                  value={board}
                  editable={false}
                  placeholder="Select board"
                  placeholderTextColor={Colors.gray400}
                />
                <MaterialIcons
                  name="expand-more"
                  size={24}
                  color={Colors.gray400}
                  style={styles.selectIcon}
                />
              </View>
            </View>

            {/* Medium */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Medium of Instruction</Text>
              <View style={styles.selectContainer}>
                <TextInput
                  style={[styles.textInput, styles.noMargin]}
                  value={medium}
                  editable={false}
                  placeholder="Select medium"
                  placeholderTextColor={Colors.gray400}
                />
                <MaterialIcons
                  name="expand-more"
                  size={24}
                  color={Colors.gray400}
                  style={styles.selectIcon}
                />
              </View>
            </View>

            {/* School Name */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>School Name</Text>
              <TextInput
                style={[styles.textInput, styles.noMargin]}
                value={schoolName}
                onChangeText={setSchoolName}
                placeholder="Enter school name"
                placeholderTextColor={Colors.gray400}
              />
            </View>
          </Card>
        </View>

        {/* Preferences Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Card variant="filled" style={styles.preferencesCard}>
            {/* Notifications */}
            <View style={styles.preferenceItem}>
              <View>
                <Text style={styles.preferenceName}>Push Notifications</Text>
                <Text style={styles.preferenceDescription}>
                  Get reminders for daily goals
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: Colors.gray300, true: Colors.primary + '50' }}
                thumbColor={notificationsEnabled ? Colors.primary : Colors.gray400}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View>
                <Text style={styles.preferenceName}>Email Reminders</Text>
                <Text style={styles.preferenceDescription}>
                  Weekly progress summaries
                </Text>
              </View>
              <Switch
                value={emailReminders}
                onValueChange={setEmailReminders}
                trackColor={{ false: Colors.gray300, true: Colors.primary + '50' }}
                thumbColor={emailReminders ? Colors.primary : Colors.gray400}
              />
            </View>

            <View style={[styles.preferenceItem, styles.noBorderBottom]}>
              <View>
                <Text style={styles.preferenceName}>Dark Mode</Text>
                <Text style={styles.preferenceDescription}>
                  Easy on the eyes at night
                </Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: Colors.gray300, true: Colors.primary + '50' }}
                thumbColor={darkMode ? Colors.primary : Colors.gray400}
              />
            </View>
          </Card>
        </View>

        {/* Danger Zone */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Card variant="filled">
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={() => Alert.alert('Change Password', 'Feature coming soon')}
            >
              <MaterialIcons name="lock" size={20} color={Colors.error} />
              <Text style={styles.dangerButtonText}>Change Password</Text>
              <MaterialIcons name="arrow-forward" size={20} color={Colors.error} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dangerButton, styles.lastButton]}
              onPress={() => {
                Alert.alert(
                  'Delete Account',
                  'Are you sure? This action cannot be undone.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => {} }
                  ]
                );
              }}
            >
              <MaterialIcons name="delete-outline" size={20} color={Colors.error} />
              <Text style={styles.dangerButtonText}>Delete Account</Text>
              <MaterialIcons name="arrow-forward" size={20} color={Colors.error} />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <MaterialIcons name="check" size={20} color={Colors.white} />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSpacer: { width: 24 },
  noMargin: { marginBottom: 0 },
  noBorderBottom: { borderBottomWidth: 0 },
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
  },
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  profilePictureButton: {
    marginBottom: Spacing.md,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileInitial: {
    fontSize: FontSizes.headlineSmall,
    fontWeight: '700',
    color: Colors.white,
  },
  editPictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  profilePictureText: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  sectionContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.titleSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  formCard: {
    padding: Spacing.lg,
  },
  formGroup: {
    marginBottom: Spacing.lg,
  },
  formLabel: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 48,
    fontSize: FontSizes.bodySmall,
    color: Colors.textPrimary,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  bioInput: {
    textAlignVertical: 'top',
    minHeight: 120,
    paddingVertical: Spacing.md,
  },
  selectContainer: {
    position: 'relative',
  },
  selectIcon: {
    position: 'absolute',
    right: Spacing.md,
    top: Spacing.sm,
  },
  preferencesCard: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  preferenceName: {
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  preferenceDescription: {
    fontSize: FontSizes.labelSmall,
    color: Colors.textSecondary,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  lastButton: {
    borderBottomWidth: 0,
  },
  dangerButtonText: {
    flex: 1,
    fontSize: FontSizes.labelLarge,
    fontWeight: '600',
    color: Colors.error,
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
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    borderColor: Colors.gray300,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary,
    gap: Spacing.sm,
  },
  saveButtonText: {
    fontSize: FontSizes.labelSmall,
    fontWeight: '600',
    color: Colors.white,
  },
});
