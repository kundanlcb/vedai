/**
 * Navigation Type Definitions
 * Type-safe navigation parameters and screens
 */


// Root Navigation Stack
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Home: undefined;
  Tabs: undefined;
};

// Tabs Navigation
export type TabParamList = {
  Home: undefined;
  Learn: undefined;
  Practice: undefined;
  Tests: undefined;
  Chat: undefined;
  Profile: undefined;
};

// Learn Stack
export type LearnStackParamList = {
  SubjectList: undefined;
  ChapterList: { subject: string };
  ContentViewer: { subject: string; chapter: string };
};

// Practice Stack
export type PracticeStackParamList = {
  Filters: undefined;
  QuestionSession: { subject?: string; chapter?: string };
  ReviewAnswers: undefined;
};

// Tests Stack
export type TestsStackParamList = {
  TestList: undefined;
  TestPreview: { testId: string };
  TestAttempt: { testId: string; attemptId?: string };
  TestResults: { attemptId: string };
  AttemptHistory: undefined;
};

// Chat Stack
export type ChatStackParamList = {
  ChatScreen: undefined;
};

// Profile Stack
export type ProfileStackParamList = {
  Overview: undefined;
  EditProfile: undefined;
  ProgressDetails: undefined;
};

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type RootStackScreenProps = {
  Home: undefined;
  Tabs: undefined;
  Auth: undefined;
};

