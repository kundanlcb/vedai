/**
 * API Response DTOs - Server-side representations
 * These types match the backend API contract
 */

// ============= Authentication =============
export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
}

export interface AuthRefreshRequest {
  refresh_token: string;
}

export interface AuthRefreshResponse {
  access_token: string;
  token_type: string;
}

// ============= Student Profile =============
export interface StudentProfileResponse {
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
  created_at: string;
  updated_at: string;
}

export interface StudentProfileCreateRequest {
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
}

export interface StudentProfileUpdateRequest {
  full_name?: string;
  class_name?: string;
  subjects?: string[];
  roll_number?: string;
  school_name?: string;
  board?: string;
  medium?: string;
  avatar_url?: string;
  bio?: string;
}

// ============= Progress Tracking =============
export interface ProgressEntryResponse {
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
  last_accessed?: string;
  created_at: string;
  updated_at: string;
}

export interface ProgressEntryCreateRequest {
  student_id: string;
  subject: string;
  chapter: string;
  total_lessons_viewed?: number;
  total_time_spent_minutes?: number;
  completion_percentage?: number;
  questions_attempted?: number;
  questions_correct?: number;
  notes_count?: number;
}

export interface ProgressEntryUpdateRequest {
  total_lessons_viewed?: number;
  total_time_spent_minutes?: number;
  completion_percentage?: number;
  questions_attempted?: number;
  questions_correct?: number;
  notes_count?: number;
}

export interface ProgressOverviewResponse {
  student_id: string;
  summary_by_subject: {
    [subject: string]: {
      total_chapters: number;
      chapters_completed: number;
      completion_percentage: number;
      total_questions_attempted: number;
      total_questions_correct: number;
      accuracy_percentage: number;
    };
  };
  last_updated: string;
}

// ============= Questions =============
export interface QuestionOption {
  id: string | number;
  text: string;
  is_correct?: boolean;
}

export interface QuestionResponse {
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

export interface QuestionsListRequest {
  subject?: string;
  chapter?: string;
  difficulty?: string;
  limit?: number;
  offset?: number;
}

export interface QuestionsListResponse {
  data: QuestionResponse[];
  total: number;
  limit: number;
  offset: number;
}

// ============= Mock Tests =============
export interface MockTestResponse {
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
  created_at: string;
}

export interface MockTestListRequest {
  subject?: string;
  chapter?: string;
  class_name?: string;
  limit?: number;
  offset?: number;
}

export interface MockTestListResponse {
  data: MockTestResponse[];
  total: number;
  limit: number;
  offset: number;
}

export interface MockTestStartRequest {
  test_id: string | number;
  student_id: string;
}

export interface MockTestStartResponse {
  attempt_id: string;
  test_id: string | number;
  student_id: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'SUBMITTED';
  start_time: string;
  end_time?: string;
  time_taken_seconds?: number;
  questions_attempted: number;
  questions_correct: number;
  obtained_marks: number;
  percentage: number;
  is_passed: boolean;
  answers: Record<string, string | number>;
}

export interface MockTestAttemptResponse {
  id: string;
  test_id: string | number;
  student_id: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'SUBMITTED';
  start_time: string;
  end_time?: string;
  time_taken_seconds?: number;
  total_questions: number;
  questions_attempted: number;
  questions_correct: number;
  obtained_marks: number;
  percentage: number;
  is_passed: boolean;
  answers: Record<string, string | number>;
}

export interface MockTestSubmitRequest {
  attempt_id: string;
  answers: Record<string, string | number>;
}

export interface MockTestSubmitResponse {
  id: string;
  test_id: string | number;
  student_id: string;
  status: 'SUBMITTED';
  start_time: string;
  end_time: string;
  time_taken_seconds: number;
  total_questions: number;
  questions_attempted: number;
  questions_correct: number;
  obtained_marks: number;
  percentage: number;
  is_passed: boolean;
}

export interface MockTestAttemptsHistoryResponse {
  data: MockTestAttemptResponse[];
  total: number;
}

export interface MockTestStatsResponse {
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

// ============= Chat (RAG + Gemini) =============
export interface ChatSource {
  chunk_id: string | number;
  source_file?: string;
  page?: number;
  snippet: string;
  similarity_score?: number;
}

export interface ChatAskRequest {
  question: string;
  student_id: string;
  class_name?: string;
  subject?: string;
  chapter?: string;
  top_k?: number;
}

export interface ChatAskResponse {
  answer: string;
  sources: ChatSource[];
  metadata?: {
    llm_model?: string;
    response_time_ms?: number;
    tokens_used?: number;
  };
  error?: string;
}

// ============= Generic API Response Wrapper =============
export interface ApiErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
  status?: number;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

