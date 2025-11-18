/**
 * Home Navigator
 * Navigation stack for Home module (Home → Subject Detail → Question Bank Detail → Content Viewer)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';
import { SubjectDetailScreen } from '../screens/Learn/SubjectDetailScreen';
import { QuestionBankDetailScreen } from '../screens/Learn/QuestionBankDetailScreen';
import { ContentViewerScreen } from '../screens/Learn/ContentViewerScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  SubjectDetail: { subject: any };
  QuestionBankDetail: { questionBank: any };
  ContentViewer: { chapter: any };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} />
    <Stack.Screen name="QuestionBankDetail" component={QuestionBankDetailScreen} />
    <Stack.Screen name="ContentViewer" component={ContentViewerScreen} />
  </Stack.Navigator>
);

