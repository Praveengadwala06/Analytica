/**
 * Mock API service for React-only version of Social Analytics Dashboard
 */

import { generateMockData } from './mockData';

export async function fetchProfileMetrics(userId = 'guest') {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = generateMockData(userId, 'InternalPerformance');
      resolve({
        impressions: mockData.metrics?.impressions || 23412,
        engagements: mockData.metrics?.engagements || 11750,
        clicks: mockData.metrics?.clicks || 157,
        audienceGrowth: mockData.audienceGrowth || {
          twitter: [10, 20, 30, 40, 35, 45, 50],
          facebook: [5, 15, 25, 35, 30, 40, 45],
          instagram: [8, 18, 28, 38, 33, 43, 48],
          linkedin: [12, 22, 32, 42, 37, 47, 52],
        },
        dates: mockData.dates || ['2023-10-25', '2023-10-26', '2023-10-27', '2023-10-28', '2023-10-29', '2023-10-30', '2023-10-31'],
      });
    }, 500);
  });
}

export async function mockChatbotResponse(userMessage) {
  // Simple mock chatbot response logic
  return new Promise((resolve) => {
    setTimeout(() => {
      let response = "Sorry, I am currently running in offline mode and cannot provide detailed answers.";
      if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        response = "Hello! How can I assist you today?";
      } else if (userMessage.toLowerCase().includes('open homepage')) {
        response = "Opening Homepage...";
      } else if (userMessage.toLowerCase().includes('open profile performance')) {
        response = "Opening Profile Performance page...";
      } else if (userMessage.toLowerCase().includes('open custom report 1')) {
        response = "Opening Custom Report 1 page...";
      }
      resolve(response);
    }, 500);
  });
}

export async function analyzeSentiment(text) {
  // Simulate sentiment/emotion detection
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sentiment: 'positive',
        emotions: ['joy', 'trust'],
      });
    }, 500);
  });
}



