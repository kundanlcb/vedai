/**
 * Home Navigator
 * Navigation stack for Home module (Home → Subject Detail → Question Bank Detail → Content Viewer)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';
import { SubjectListScreen } from '../screens/Learn/SubjectListScreen';
import { SubjectDetailScreen } from '../screens/Learn/SubjectDetailScreen';
import { QuestionBankListScreen } from '../screens/Learn/QuestionBankListScreen';
import { QuestionBankDetailScreen } from '../screens/Learn/QuestionBankDetailScreen';
import { QuestionDetailScreen } from '../screens/Learn/QuestionDetailScreen';
import { ContentViewerScreen } from '../screens/Learn/ContentViewerScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  SubjectList: undefined;
  SubjectDetail: { subject: any };
  QuestionBankList: undefined;
  QuestionBankDetail: { questionBank: any };
  QuestionDetail: { question: any; questionBank: any };
  ContentViewer: { chapter: any };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="SubjectList" component={SubjectListScreen} />
    <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} />
    <Stack.Screen name="QuestionBankList" component={QuestionBankListScreen} />
    <Stack.Screen name="QuestionBankDetail" component={QuestionBankDetailScreen} />
    <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} />
    <Stack.Screen name="ContentViewer" component={ContentViewerScreen} />
  </Stack.Navigator>
);

