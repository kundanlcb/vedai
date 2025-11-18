/**
 * Practice Navigator
 * Navigation stack for Practice module (Home → Session → Review → Stats)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PracticeScreen } from '../screens/Practice/PracticeScreen';
import { QuestionSessionScreen } from '../screens/Practice/QuestionSessionScreen';
import { ReviewAnswersScreen } from '../screens/Practice/ReviewAnswersScreen';
import { PracticeStatsScreen } from '../screens/Practice/PracticeStatsScreen';

export type PracticeStackParamList = {
  PracticeHome: undefined;
  QuestionSession: { filters?: any };
  ReviewAnswers: { sessionId: string };
  PracticeStats: undefined;
};

const Stack = createNativeStackNavigator<PracticeStackParamList>();

export const PracticeNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PracticeHome" component={PracticeScreen} />
    <Stack.Screen name="QuestionSession" component={QuestionSessionScreen} />
    <Stack.Screen name="ReviewAnswers" component={ReviewAnswersScreen} />
    <Stack.Screen name="PracticeStats" component={PracticeStatsScreen} />
  </Stack.Navigator>
);

