/**
 * Practice Session Redux Slice
 * Manages practice session state, answers, and scoring
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PracticeState {
  sessionId: string | null;
  questionIds: string[];
  answers: Record<string, string>; // questionId -> selectedAnswer
  currentQuestionIndex: number;
  startTime: number | null;
  endTime: number | null;
  isComplete: boolean;
  score: number;
  totalMarks: number;
}

const initialState: PracticeState = {
  sessionId: null,
  questionIds: [],
  answers: {},
  currentQuestionIndex: 0,
  startTime: null,
  endTime: null,
  isComplete: false,
  score: 0,
  totalMarks: 0,
};

export const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    // Start a new practice session
    startPracticeSession: (
      state,
      action: PayloadAction<{ questionIds: string[]; totalMarks: number }>
    ) => {
      state.sessionId = `session_${Date.now()}`;
      state.questionIds = action.payload.questionIds;
      state.totalMarks = action.payload.totalMarks;
      state.startTime = Date.now();
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.score = 0;
      state.isComplete = false;
    },

    // Update answer for current question
    updateAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },

    // Move to next question
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questionIds.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },

    // Move to previous question
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },

    // Jump to specific question
    jumpToQuestion: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.questionIds.length) {
        state.currentQuestionIndex = action.payload;
      }
    },

    // Complete practice session
    completePracticeSession: (state, action: PayloadAction<{ score: number }>) => {
      state.isComplete = true;
      state.endTime = Date.now();
      state.score = action.payload.score;
    },

    // Reset practice session
    resetPracticeSession: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  startPracticeSession,
  updateAnswer,
  nextQuestion,
  previousQuestion,
  jumpToQuestion,
  completePracticeSession,
  resetPracticeSession,
} = practiceSlice.actions;

export default practiceSlice.reducer;

