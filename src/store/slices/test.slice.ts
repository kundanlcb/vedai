/**
 * Test Session Redux Slice
 * Manages mock test attempt state
 * Phase 2 feature
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestSessionState {
  currentAttemptId: string | null;
  testId: string | number | null;
  startTime: number | null; // Unix timestamp
  endTime: number | null;
  totalDurationSeconds: number | null;
  currentQuestionIndex: number;
  answers: Record<string | number, string | number | null>; // question_id -> answer
  flagged: (string | number)[]; // flagged question IDs
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'PAUSED' | 'SUBMITTED';
  totalQuestions: number;
}

const initialState: TestSessionState = {
  currentAttemptId: null,
  testId: null,
  startTime: null,
  endTime: null,
  totalDurationSeconds: null,
  currentQuestionIndex: 0,
  answers: {},
  flagged: [],
  status: 'NOT_STARTED',
  totalQuestions: 0,
};

const testSessionSlice = createSlice({
  name: 'testSession',
  initialState,
  reducers: {
    initializeTest: (
      state,
      action: PayloadAction<{
        attemptId: string;
        testId: string | number;
        totalQuestions: number;
        durationSeconds: number;
      }>
    ) => {
      state.currentAttemptId = action.payload.attemptId;
      state.testId = action.payload.testId;
      state.totalQuestions = action.payload.totalQuestions;
      state.totalDurationSeconds = action.payload.durationSeconds;
      state.startTime = Date.now();
      state.status = 'IN_PROGRESS';
      state.answers = {};
      state.flagged = [];
      state.currentQuestionIndex = 0;
    },

    setAnswer: (
      state,
      action: PayloadAction<{
        questionId: string | number;
        answer: string | number | null;
      }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },

    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },

    toggleFlagged: (state, action: PayloadAction<string | number>) => {
      const index = state.flagged.indexOf(action.payload);
      if (index > -1) {
        state.flagged.splice(index, 1);
      } else {
        state.flagged.push(action.payload);
      }
    },

    pauseTest: (state) => {
      state.status = 'PAUSED';
    },

    resumeTest: (state) => {
      state.status = 'IN_PROGRESS';
    },

    submitTest: (state) => {
      state.status = 'SUBMITTED';
      state.endTime = Date.now();
    },

    restoreSession: (
      state,
      action: PayloadAction<{
        attemptId: string;
        testId: string | number;
        answers: Record<string | number, string | number | null>;
        flagged: (string | number)[];
      }>
    ) => {
      state.currentAttemptId = action.payload.attemptId;
      state.testId = action.payload.testId;
      state.answers = action.payload.answers;
      state.flagged = action.payload.flagged;
      state.status = 'IN_PROGRESS';
    },

    clearSession: (_state) => {
      return initialState;
    },
  },
});

export const {
  initializeTest,
  setAnswer,
  setCurrentQuestion,
  toggleFlagged,
  pauseTest,
  resumeTest,
  submitTest,
  restoreSession,
  clearSession,
} = testSessionSlice.actions;

export default testSessionSlice.reducer;

