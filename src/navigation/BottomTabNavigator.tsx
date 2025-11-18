/**
 * Bottom Tab Navigator
 * Main navigation with 5 tabs following Material Design 3
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Spacing, FontSizes } from '../constants';
import {
  ChatScreen,
  NotificationsScreen,
} from '../screens';
import { HomeNavigator } from './HomeNavigator';
import { TestsNavigator } from './TestsNavigator';
import { ProfileNavigator } from './ProfileNavigator';

export type BottomTabParamList = {
  HomeTab: undefined;
  ExamTab: undefined;
  ChatTab: undefined;
  NotificationTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    height: 70,
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: FontSizes.labelSmall,
    marginTop: 2,
    fontWeight: '500',
    marginBottom: 0,
  },
  tabBarIcon: {
    marginBottom: 0,
  },
});

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.textSecondary,
  tabBarStyle: styles.tabBar,
  tabBarLabelStyle: styles.tabBarLabel,
  tabBarIconStyle: styles.tabBarIcon,
};

// Icon renderers - extracted to prevent unstable nested component warnings
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcons name="home" color={color} size={size} />
);

const ExamIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcons name="assignment" color={color} size={size} />
);

const ChatIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcons name="chat-bubble" color={color} size={size} />
);

const NotificationIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcons name="notifications" color={color} size={size} />
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcons name="person" color={color} size={size} />
);

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />

      {/* Exam Tab */}
      <Tab.Screen
        name="ExamTab"
        component={TestsNavigator}
        options={{
          tabBarLabel: 'Exam',
          tabBarIcon: ExamIcon,
        }}
      />

      {/* Chat Tab */}
      <Tab.Screen
        name="ChatTab"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ChatIcon,
        }}
      />

      {/* Notification Tab */}
      <Tab.Screen
        name="NotificationTab"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: NotificationIcon,
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};


