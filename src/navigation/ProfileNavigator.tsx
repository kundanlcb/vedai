/**
 * Profile Navigator
 * Navigation stack for Profile module (Overview → Edit → Progress Details)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens';
import { ProfileEditScreen } from '../screens/Profile/ProfileEditScreen';
import { ProgressDetailsScreen } from '../screens/Profile/ProgressDetailsScreen';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  ProfileEdit: { profileData?: any };
  ProgressDetails: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileHome" component={ProfileScreen} />
    <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    <Stack.Screen name="ProgressDetails" component={ProgressDetailsScreen} />
  </Stack.Navigator>
);

