/**
 * Tests Navigator
 * Navigation stack for Tests module (Home → List → Detail → Attempt → Results)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExamsScreen } from '../screens/main/ExamsScreen';
import { TestsListScreen } from '../screens/Tests/TestsListScreen';
import { ExamDetailScreen } from '../screens/Tests/ExamDetailScreen';
import { TestAttemptScreen } from '../screens/Tests/TestAttemptScreen';
import { TestResultsScreen } from '../screens/Tests/TestResultsScreen';

export type TestsStackParamList = {
  TestsHome: undefined;
  TestsList: { filters?: any };
  ExamDetail: { exam: any };
  TestAttempt: { testId: string; testName: string };
  TestResults: { testId: string; score: number; total: number };
};

const Stack = createNativeStackNavigator<TestsStackParamList>();

export const TestsNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TestsHome" component={ExamsScreen} />
    <Stack.Screen name="TestsList" component={TestsListScreen} />
    <Stack.Screen name="ExamDetail" component={ExamDetailScreen} />
    <Stack.Screen name="TestAttempt" component={TestAttemptScreen} />
    <Stack.Screen name="TestResults" component={TestResultsScreen} />
  </Stack.Navigator>
);

