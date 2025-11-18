/**
 * Learn Navigator
 * Navigation stack for Learn module (Home → Subjects → Chapters → Content)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LearnScreen } from '../screens/Learn/LearnScreen';
import { SubjectListScreen } from '../screens/Learn/SubjectListScreen';
import { ChapterListScreen } from '../screens/Learn/ChapterListScreen';
import { ContentViewerScreen } from '../screens/Learn/ContentViewerScreen';

export type LearnStackParamList = {
  LearnHome: undefined;
  SubjectList: undefined;
  ChapterList: { subjectId: string; subjectName: string };
  ContentViewer: { chapterId: string; chapterName: string; subjectName: string };
};

const Stack = createNativeStackNavigator<LearnStackParamList>();

export const LearnNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LearnHome" component={LearnScreen} />
    <Stack.Screen name="SubjectList" component={SubjectListScreen} />
    <Stack.Screen name="ChapterList" component={ChapterListScreen} />
    <Stack.Screen name="ContentViewer" component={ContentViewerScreen} />
  </Stack.Navigator>
);

