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
  HomeScreen,
  ExamsScreen,
  ProfileScreen,
  ChatScreen,
  NotificationsScreen,
} from '../screens';

export type BottomTabParamList = {
  HomeTab: undefined;
  ExamsTab: undefined;
  ChatTab: undefined;
  NotificationsTab: undefined;
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
    height: 60,
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: FontSizes.labelSmall,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  tabBarIcon: {
    marginBottom: Spacing.xs,
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

// Icon components memoized to prevent re-renders

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      {/* Exams Tab */}
      <Tab.Screen
        name="ExamsTab"
        component={ExamsScreen}
        options={{
          tabBarLabel: 'Exams',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" color={color} size={size} />
          ),
        }}
      />

      {/* Chat Tab */}
      <Tab.Screen
        name="ChatTab"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="message" color={color} size={size} />
          ),
        }}
      />

      {/* Notifications Tab */}
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" color={color} size={size} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


