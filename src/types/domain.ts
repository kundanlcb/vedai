/**
 * Domain Models - Business entities used across the app
 * These are transformed from API responses for internal use
 */

// ============= Authentication =============
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user_id: string | null;
  loading: boolean;
  error: string | null;
}

// ============= Student Profile =============
export interface StudentProfile {
  id: string;
  user_id: string;
  full_name: string;
  class_name: string;
  subjects: string[];
  roll_number?: string;
  school_name?: string;
  board?: string;
  medium?: string;
  avatar_url?: string;
  bio?: string;
  created_at: Date;
  updated_at: Date;
}

// ============= Progress =============
export interface StudyProgress {
  id: string;
  student_id: string;
  subject: string;
  chapter: string;
  total_lessons_viewed: number;
  total_time_spent_minutes: number;
  completion_percentage: number;
  questions_attempted: number;
  questions_correct: number;
  notes_count: number;
  last_accessed?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ProgressOverview {
  student_id: string;
  by_subject: {
    [subject: string]: {
      total_chapters: number;
      chapters_completed: number;
      completion_percentage: number;
      accuracy_percentage: number;
    };
  };
  last_updated: Date;
}

// ============= Content =============
export interface Subject {
  id?: string;
  name: string;
  class_name: string;
  description?: string;
}

export interface Chapter {
  id?: string;
  name: string;
  subject: string;
  order?: number;
  description?: string;
}

export interface ContentChunk {
  id?: string;
  chapter: string;
  chunk_index: number;
  text: string;
  metadata?: Record<string, unknown>;
}

// ============= Questions =============
export interface QuestionOption {
  id: string | number;
  text: string;
  is_correct?: boolean;
}

export interface Question {
  id: string | number;
  text: string;
  question_type: 'MCQ' | 'SHORT_ANSWER' | 'NUMERICAL';
  marks?: number;
  year?: number;
  source_board?: string;
  chapter?: string;
  subject?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  generated: boolean;
  options?: QuestionOption[];
}

export interface PracticeSession {
  questions: Question[];
  answers: Record<string | number, string | number | null>;
  current_index: number;
  flagged_indices: number[];
  start_time: Date;
}

// ============= Mock Tests =============
export interface MockTest {
  id: string | number;
  title: string;
  subject: string;
  chapter?: string;
  class_name: string;
  total_questions: number;
  total_marks: number;
  duration_minutes: number;
  passing_marks: number;
  question_ids: (string | number)[];
  is_published: boolean;
  description?: string;
  created_at: Date;
}

export interface TestAttempt {
  id: string;
  test_id: string | number;
  student_id: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'SUBMITTED';
  start_time: Date;
  end_time?: Date;
  time_taken_seconds?: number;
  total_questions: number;
  questions_attempted: number;
  questions_correct: number;
  obtained_marks: number;
  percentage: number;
  is_passed: boolean;
  answers: Record<string, string | number>;
}

export interface TestResult {
  attempt_id: string;
  test_id: string | number;
  test_title: string;
  student_id: string;
  total_questions: number;
  questions_attempted: number;
  questions_correct: number;
  obtained_marks: number;
  total_marks: number;
  percentage: number;
  is_passed: boolean;
  time_taken_seconds: number;
  start_time: Date;
  end_time: Date;
}

export interface TestStats {
  student_id: string;
  total_tests: number;
  total_attempts: number;
  average_percentage: number;
  success_rate: number;
  by_subject: {
    [subject: string]: {
      total_attempts: number;
      average_percentage: number;
      success_rate: number;
    };
  };
}

// ============= Chat =============
export interface ChatSource {
  chunk_id: string | number;
  source_file?: string;
  page?: number;
  snippet: string;
  similarity_score?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
  timestamp: Date;
}

export interface ChatConversation {
  id: string;
  student_id: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
}

// ============= UI State =============
export interface UIState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

// ============= Offline Queue =============
export interface QueuedAction {
  id: string;
  type: 'PROGRESS_UPDATE' | 'TEST_SUBMIT' | 'CHAT_QUESTION' | 'ANSWER_LOG';
  payload: Record<string, unknown>;
  timestamp: Date;
  retries: number;
  last_error?: string;
}

