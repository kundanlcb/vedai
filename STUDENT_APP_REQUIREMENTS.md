# VedAI Student React Native App Requirements

## 1. Purpose & Vision
A mobile-first learning companion for students (classes 8–12) offering structured study progress tracking, adaptive practice (question bank + mock tests), AI-powered contextual chat (RAG + Gemini), and curriculum-aligned content access. The app leverages existing backend services without duplicating business logic.

## 2. Primary User Personas
1. Student (core user): Consumes content, practices questions, tracks progress, chats with AI assistant.
2. Returning Student: Seeks quick resumption (continue last chapter/test) and performance insights.
3. Exam-Focused Student: Wants targeted revision and mock test performance analysis.

## 3. High-Level Feature Modules
1. Authentication & Session
2. Student Profile Management
3. Subject & Chapter Explorer
4. Content Viewer (PDF/Text Chunks)
5. Question Practice (Question Bank)
6. Mock Tests (Timed Attempts)
7. Study Progress Tracking & Analytics
8. AI Chat (RAG + Gemini) with contextual filters
9. Study Plan (computed from goals & available time) [Phase 2]
10. Notifications & Reminders
11. Personalization (Bookmarks, Notes, Favorites) [Phase 2]
12. Settings & Preferences

## 4. Navigation Structure
- Root: Stack Navigator
- Tabs (main): Home, Learn, Practice, Tests, Chat, Profile
- Nested stacks:
  - Learn: SubjectList -> ChapterList -> ContentViewer
  - Practice: Filters -> QuestionSession -> ReviewAnswers
  - Tests: TestList -> Attempt (timer) -> ResultSummary -> AttemptHistory
  - Chat: Ask -> Sources -> Follow-up
  - Profile: Overview -> Edit -> ProgressDetails

## 5. API Integration Map (Backend Endpoints)
| Module | Endpoint | Method | Purpose |
|--------|----------|--------|---------|
| Profile | `/api/students/register` | POST | Create student profile |
| Profile | `/api/students/{id}` | GET | Fetch profile by ID |
| Profile | `/api/students/user/{user_id}` | GET | Fetch by user ID |
| Profile | `/api/students/{id}` | PUT | Update profile |
| Progress | `/api/progress/` | POST | Log progress |
| Progress | `/api/progress/{progress_id}` | PUT | Update progress entry |
| Progress | `/api/progress/student/{student_id}` | GET | List progress entries |
| Progress | `/api/progress/student/{student_id}/overview` | GET | Aggregated progress summary |
| Questions (student) | `/questions/` | GET | List questions (filters: subject, chapter) |
| Questions (student) | `/questions/{id}` | GET | Single question detail |
| Mock Tests | `/api/tests/` | POST | Admin creates (read-only in app) |
| Mock Tests | `/api/tests/subject/{subject}/class/{class_name}` | GET | Available tests |
| Mock Tests | `/api/tests/{test_id}` | GET | Test detail |
| Mock Tests | `/api/tests/{test_id}/start` | POST | Start attempt |
| Mock Tests | `/api/tests/attempts/{attempt_id}` | GET | Attempt detail |
| Mock Tests | `/api/tests/student/{student_id}/attempts` | GET | Attempt history |
| Mock Tests | `/api/tests/attempts/{attempt_id}/submit` | POST | Submit answers |
| Mock Tests | `/api/tests/student/{student_id}/stats` | GET | Performance stats |
| Chat | `/chat/ask` | POST | RAG + Gemini answer with sources |
| Content Ingestion (admin) | `/ingest/` | POST | Not exposed to student app |
| Content Retrieval (RAG) | Internal PGVector via `/chat/ask` |

## 6. Data & State Models (Frontend Representations)
### StudentProfile
```
{
  id, user_id, full_name, class_name, subjects[], roll_number?, school_name?, board?, medium?, avatar_url?, bio?, created_at, updated_at
}
```
### StudyProgressEntry
```
{
  id, student_id, subject, chapter, total_lessons_viewed, total_time_spent_minutes,
  completion_percentage, questions_attempted, questions_correct, notes_count,
  last_accessed?, created_at, updated_at
}
```
### MockTest
```
{ id, title, subject, chapter?, class_name, total_questions, total_marks,
  duration_minutes, passing_marks, question_ids[], is_published, description?, created_at }
```
### MockTestAttempt
```
{ id, test_id, student_id, status, start_time, end_time?, time_taken_seconds?,
  total_questions, questions_attempted, questions_correct, obtained_marks,
  percentage, is_passed, answers: { [question_id]: selected_option_id } }
```
### Question
```
{ id, text, question_type, marks, year?, source_board?, chapter?, subject?, difficulty?, generated, options: [{id,text,is_correct?}] }
```
### ChatResponse
```
{ answer, sources: [{chunk_id, source_file?, page?, snippet, similarity_score?}], metadata, llm_usage?, error? }
```

## 7. State Management Strategy
- React Query for server state: caching, retries, background refresh.
- Redux Toolkit (or lightweight Zustand) for UI/session state (auth token, ephemeral selections, timers).
- Persist critical slices (profile, progress cache, last_attempt) using redux-persist or AsyncStorage.
- Immutable data shapes; normalize lists (questions, progress entries) for efficient lookup.

## 8. Offline & Caching
- Cache last viewed chapter content (text chunks) locally.
- Queue progress updates & test submissions when offline (outbox pattern). Retry on reconnect.
- Optimistic updates for progress (increment completion) then reconcile with server.

## 9. Authentication & Security
- App receives JWT / access token from a future `/auth/login` (if not present yet, Phase 0: mock token).
- Secure storage (iOS Keychain / Android EncryptedStorage) for token.
- Refresh logic (future) – token expiry detection & silent refresh.
- Never store Gemini key in the app; all AI interactions go through backend `/chat/ask`.
- Input validation client-side (length limits, sanitization).

## 10. Feature Specifications
### 10.1 Home Dashboard
- Greeting + Class + Quick stats (subjects mastered %, active chapters, pending tests).
- Cards: Continue Studying, Take Mock Test, Ask VedAI, View Progress.
- Notifications panel (latest 5). Phase 2: push notifications integration.

### 10.2 Learn Module
- Subject list (grid + progress ring per subject).
- Chapter list (show completion %, last accessed timestamp).
- Content viewer:
  - Show chunked text sequentially with pagination.
  - Bookmarks & notes (local, Phase 2 sync endpoint).
  - Mark chapter as progressed (increments completion).

### 10.3 Practice (Question Bank)
- Filters: Subject, Chapter, Difficulty.
- Session builder: select number of questions or adaptive mode.
- Question presentation: MCQ, Short Answer (input field), Numerical.
- Immediate feedback toggle (Phase 2) vs end-of-session review.
- Performance summary: accuracy %, time spent, weak areas.

### 10.4 Mock Tests
- Available test list (subject/chapter filters, search).
- Attempt flow:
  - Pre-start screen: duration, total questions, passing marks.
  - In-test UI: timer, navigation drawer, flag question, auto-save answers.
  - Auto submit on timeout.
- Post-test: result summary (score, percentage, pass/fail, time taken), analytics (accuracy by chapter/difficulty).
- Attempt history with trend graph.

### 10.5 Study Progress
- Progress overview per subject (aggregate from `/overview`).
- Drill-down: chapter timeline, improvement over time, question correctness ratio.
- Gamification hooks (Phase 2): badges for milestones.

### 10.6 AI Chat (VedAI Assistant)
- Input: question, optional filters (class, subject, chapter), top_k slider.
- Streaming answer (Phase 2) or full reply.
- Source citations expandable – tap to view chunk preview.
- Follow-up mode (shows previous context, user can refine question).
- Retry & “Regenerate” action.

### 10.7 Study Plan (Phase 2)
- Inputs: exam date, daily available minutes, weak subjects.
- Output: weekly schedule (chapters prioritized by completion & difficulty).
- Integration: writes planned targets to local state, progress updates compare plan vs actual.

### 10.8 Settings
- Profile editing (name, medium, subjects chosen).
- Theme: light/dark.
- Privacy (data usage explanation).

### 10.9 Notifications (Phase 2)
- Local scheduled reminders (study session start, test prep).
- Server push (new published content, test availability).

## 11. Non-Functional Requirements
| Category | Requirement |
|----------|------------|
| Performance | Initial load < 3s, screen transitions < 250ms |
| Responsiveness | Works on phones & tablets (adaptive layout) |
| Accessibility | Font scaling support, high-contrast theme |
| Reliability | Offline queue retries exponential backoff |
| Security | All API over HTTPS, tokens stored securely |
| Maintainability | Feature modules separated; hooks-based data fetching |
| Observability | Basic analytics events (screen_view, test_completed) |

## 12. Error Handling Strategy
- API errors: parse `detail` field; user-friendly message + retry.
- Network offline: global banner + queue operations.
- Chat failure: show fallback answer with retry option.
- Timer drift (tests): store start timestamp; recompute remaining based on server time on resume.

## 13. Edge Cases
1. Mock test resumed after app crash – restore answers from local draft.
2. Chapter with zero content chunks – show placeholder & report backend issue.
3. Chat with no sources – show educational hint to refine query.
4. Duplicate progress updates queued offline – merge by (student_id, subject, chapter) keeping latest timestamp.
5. Token expiration mid-test – allow completion, then refresh before submission.

## 14. Tech Stack
- React Native (Expo or plain RN) – Phase 0: Plain RN for full native modules.
- TypeScript mandatory.
- State: React Query + Redux Toolkit.
- Charts: `react-native-svg` + `react-native-svg-charts` or `victory-native`.
- Navigation: `@react-navigation/native` (Stack + Bottom Tabs + Drawer optional).
- Secure storage: `react-native-encrypted-storage`.
- Forms: `react-hook-form`.
- Testing: Jest + React Native Testing Library; Detox for E2E (Phase 2).

## 15. Folder Structure Proposal
```
app/
  api/ (axios client, endpoint wrappers)
  screens/
    Home/ Learn/ Practice/ Tests/ Chat/ Profile/
  components/ (UI primitives, charts, loaders)
  hooks/ (useQuestions, useMockTestAttempt, useProgress)
  store/ (slices: auth, ui, testSession)
  navigation/ (root navigators)
  utils/ (formatters, timers)
  theme/ (colors, typography)
  services/ (studyPlanEngine.ts, offlineQueue.ts)
  types/ (DTO typings)
```

## 16. DTO Typings (Example)
```ts
export interface QuestionOption { id: number; text: string; is_correct?: boolean }
export interface Question { id: number; text: string; question_type: string; marks?: number; subject?: string; chapter?: string; options?: QuestionOption[] }
export interface MockTest { id: number; title: string; subject: string; chapter?: string; class_name: number; total_questions: number; total_marks: number; duration_minutes: number; passing_marks: number; is_published: boolean }
export interface MockTestAttempt { id: number; test_id: number; student_id: number; status: string; start_time: string; end_time?: string; questions_attempted: number; questions_correct: number; obtained_marks: number; percentage: number; answers?: Record<string, number> }
export interface ChatSource { chunk_id: number; source_file?: string; page?: number; snippet: string; similarity_score?: number }
export interface ChatReply { answer: string; sources: ChatSource[]; metadata: any; error?: string }
```

## 17. Performance Optimizations
- Use FlatList with keyExtractor for large question sets.
- Memoize chunk rendering; lazy-load long content.
- Debounce filters & chat input.
- Pre-fetch next chapter content after nearing end of current.

## 18. Analytics Events (Phase 2)
- `app_launch`, `login_success`, `chapter_open`, `chapter_complete`, `practice_session_start`, `practice_session_complete`, `mock_test_start`, `mock_test_submit`, `chat_question`, `chat_failure`.

## 19. Testing Strategy
- Unit: pure helpers (study plan engine, timer calculations).
- Component: QuestionCard, TimerBar, ProgressChart.
- Integration: Mock test attempt flow.
- E2E (Detox Phase 2): Start test -> answer -> submit -> view results.

## 20. Release Phases
| Phase | Scope |
|-------|-------|
| 0 | Auth (mock), Profile, Subjects/Chapters, Basic Content Viewer |
| 1 | Question Practice, Progress Tracking, Chat (RAG) |
| 2 | Mock Tests full flow, Offline queue, Study Plan, Analytics |
| 3 | Notifications, Personalization (Notes, Bookmarks), Gamification |

## 21. Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Large PDF chunk load | Paginate & lazy load; pre-split server-side |
| Token refresh race | Queue API calls during refresh; single-flight logic |
| Mobile performance on low-end devices | Avoid heavy animations; limit simultaneous network requests |
| Backend schema evolution | Version endpoint wrappers; defensive parsing |

## 22. Open Questions
- Is there a dedicated auth service with refresh tokens? (If not, must add later.)
- Study plan generation logic details (algorithm + constraints) – to define with pedagogy input.
- Notes & bookmarks backend endpoints – need design before Phase 2.

## 23. Out of Scope (Initial Release)
- Live classes / video streaming.
- Peer discussion forums.
- Parent/guardian dashboard.

## 24. Acceptance Criteria (Phase 1 Core)
1. Student can view subjects, chapters, and content chunks.
2. Student can attempt question practice and see performance summary.
3. Student can start, submit, and view at least one mock test attempt.
4. Chat returns answers with at least one source citation when available.
5. Progress overview displays aggregated data per subject.
6. All API failures produce friendly retry UI.

## 25. Maintenance & Extensibility Guidelines
- Keep API layer isolated; single place for endpoint path changes.
- Feature flags for experimental modules (study plan, analytics) using config object.
- Avoid hard-coding embedding specifics; treat chunk metadata generically.

---
This document is intended to fully guide implementation of the React Native student app without additional clarification. It aligns strictly with existing backend capabilities and anticipates near-term expansions.

