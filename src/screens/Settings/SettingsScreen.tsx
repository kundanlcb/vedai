import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Spacing } from '../../constants';

export const SettingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    // Logout logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Sound Effects</Text>
            <Text style={styles.settingDescription}>Notification sounds</Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: Colors.gray300, true: Colors.primary + '50' }}
            thumbColor={soundEnabled ? Colors.primary : Colors.gray400}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Easy on the eyes</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: Colors.gray300, true: Colors.primary + '50' }}
            thumbColor={darkMode ? Colors.primary : Colors.gray400}
          />
        </View>

        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Privacy Policy</Text>
          </View>
          <MaterialIcons name="arrow-forward" size={20} color={Colors.gray400} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingButton, styles.noBorderBottom]}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Terms of Service</Text>
          </View>
          <MaterialIcons name="arrow-forward" size={20} color={Colors.gray400} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <MaterialIcons name="lock" size={20} color={Colors.primary} />
          <Text style={[styles.settingName, styles.mlMd]}>Change Password</Text>
          <MaterialIcons
            name="arrow-forward"
            size={20}
            color={Colors.gray400}
            style={styles.autoMarginLeft}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingButton, styles.noBorderBottom]}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={20} color={Colors.error} />
          <Text style={[styles.settingName, { color: Colors.error }, styles.mlMd]}>Logout</Text>
          <MaterialIcons
            name="arrow-forward"
            size={20}
            color={Colors.error}
            style={styles.autoMarginLeft}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSpacer: { width: 24 },
  noBorderBottom: { borderBottomWidth: 0 },
  autoMarginLeft: { marginLeft: 'auto' },
  mlMd: { marginLeft: Spacing.md },
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
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.gray200,
  },
  settingInfo: {
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderColor: Colors.gray200,
  },
});
