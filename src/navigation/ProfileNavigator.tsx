/**
 * Profile Navigator
 * Navigation stack for Profile module (Overview → Edit → Progress Details)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens';
import { ProfileEditScreen } from '../screens/Profile/ProfileEditScreen';
import { ProgressDetailsScreen } from '../screens/Profile/ProgressDetailsScreen';
import { ChangePasswordScreen } from '../screens/Profile/ChangePasswordScreen';
import { HelpSupportScreen } from '../screens/main/HelpSupportScreen';
import { AboutScreen } from '../screens/main/AboutScreen';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  ProfileEdit: { profileData?: any };
  ProgressDetails: undefined;
  ChangePassword: undefined;
  HelpSupport: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileHome" component={ProfileScreen} />
    <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    <Stack.Screen name="ProgressDetails" component={ProgressDetailsScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
);

