
import React from 'react';
import type { Service } from './types';

const ChatbotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ContentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const AutomationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ModelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16v4m-2-2h4m5 10v4m-2-2h4M5 3a2 2 0 00-2 2v1.5a2.5 2.5 0 005 0V5a2 2 0 00-2-2zm14 0a2 2 0 00-2 2v1.5a2.5 2.5 0 005 0V5a2 2 0 00-2-2zM5 17a2 2 0 00-2 2v1.5a2.5 2.5 0 005 0V19a2 2 0 00-2-2zm14 0a2 2 0 00-2 2v1.5a2.5 2.5 0 005 0V19a2 2 0 00-2-2z" />
  </svg>
);

const GameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const SERVICES: Service[] = [
  {
    id: 'chatbot',
    name: 'AI Chatbot Development',
    description: 'Engage customers 24/7 with intelligent, conversational AI chatbots tailored to your business needs.',
    icon: <ChatbotIcon />
  },
  {
    id: 'content',
    name: 'AI-Powered Content Creation',
    description: 'Generate high-quality blog posts, marketing copy, and social media content at scale with AI.',
    icon: <ContentIcon />
  },
  {
    id: 'automation',
    name: 'AI Business Automation',
    description: 'Streamline your workflows, automate repetitive tasks, and increase efficiency with custom AI solutions.',
    icon: <AutomationIcon />
  },
  {
    id: 'model',
    name: 'Custom AI Model Training',
    description: 'Develop and train bespoke AI models on your data to solve unique business challenges.',
    icon: <ModelIcon />
  },
  {
    id: 'snake',
    name: 'Just for Fun: Snake',
    description: 'Take a break and play a classic game of Snake. A small demo of interactive development.',
    icon: <GameIcon />
  }
];

const GENERAL_QUESTIONS = [
  "Could you briefly describe your business and the industry you operate in? This helps us understand your unique landscape.",
  "What specific challenge or opportunity are you hoping to address with AI? What problem are you trying to solve?",
  "What does a successful outcome look like for you? Are you aiming to increase revenue, improve efficiency, or enhance customer experience?",
  "Have you explored any AI solutions before? What technical resources or data do you have available for this project?",
  "To help us scope this correctly, could you provide an estimated budget and ideal timeline for implementing this AI solution?"
];

export const QUESTIONS: Record<string, string[]> = {
  chatbot: GENERAL_QUESTIONS,
  content: GENERAL_QUESTIONS,
  automation: GENERAL_QUESTIONS,
  model: GENERAL_QUESTIONS,
};