/**
 * Content Redux Slice
 * Manages content state (subjects, chapters, current selection)
 * Phase 1 feature
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentState {
  selectedSubject: string | null;
  selectedChapter: string | null;
  currentChunkIndex: number;
  bookmarks: string[]; // chapter IDs
  notes: Record<string, string>; // chapter_id -> notes
}

const initialState: ContentState = {
  selectedSubject: null,
  selectedChapter: null,
  currentChunkIndex: 0,
  bookmarks: [],
  notes: {},
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSelectedSubject: (state, action: PayloadAction<string>) => {
      state.selectedSubject = action.payload;
      state.selectedChapter = null; // Reset chapter when subject changes
    },

    setSelectedChapter: (state, action: PayloadAction<string>) => {
      state.selectedChapter = action.payload;
      state.currentChunkIndex = 0; // Reset to first chunk
    },

    setCurrentChunkIndex: (state, action: PayloadAction<number>) => {
      state.currentChunkIndex = action.payload;
    },

    addBookmark: (state, action: PayloadAction<string>) => {
      if (!state.bookmarks.includes(action.payload)) {
        state.bookmarks.push(action.payload);
      }
    },

    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter((b) => b !== action.payload);
    },

    setNote: (state, action: PayloadAction<{ chapterId: string; note: string }>) => {
      state.notes[action.payload.chapterId] = action.payload.note;
    },

    removeNote: (state, action: PayloadAction<string>) => {
      delete state.notes[action.payload];
    },

    clearContent: (state) => {
      state.selectedSubject = null;
      state.selectedChapter = null;
      state.currentChunkIndex = 0;
    },
  },
});

export const {
  setSelectedSubject,
  setSelectedChapter,
  setCurrentChunkIndex,
  addBookmark,
  removeBookmark,
  setNote,
  removeNote,
  clearContent,
} = contentSlice.actions;

export default contentSlice.reducer;

