/**
 * Chat API Endpoints
 * Manages AI chat with RAG (Retrieval Augmented Generation)
 */

import { api } from '../client';

export const chatAPI = {
  /**
   * Send message and get AI response with sources
   */
  askQuestion: async (_data: {
    question: string;
    student_id: string;
    subject?: string;
    chapter?: string;
  }) => {
    // Mock response for Phase 0
    const mockResponse = {
      answer: 'This is a mock response from the AI assistant. In production, this will be powered by RAG + Gemini API.',
      sources: [
        {
          chunk_id: 'chunk-1',
          source_file: 'Chapter 1: Matter Around Us',
          snippet: 'Matter is anything that has mass and occupies space.',
          similarity_score: 0.95,
        },
      ],
      metadata: {
        processing_time_ms: 234,
        model: 'gemini-pro',
      },
    };

    // In production, replace with: return api.post('/chat/ask', data);
    return {
      data: mockResponse,
      success: true,
    };
  },

  /**
   * Get chat history for a student
   */
  getChatHistory: async (studentId: string) => {
    return api.get(`/chat/history/${studentId}`);
  },

  /**
   * Clear chat history
   */
  clearHistory: async (studentId: string) => {
    return api.delete(`/chat/history/${studentId}`);
  },
};

