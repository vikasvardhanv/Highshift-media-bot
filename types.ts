// FIX: Import React to make React.ReactNode available.
import React from 'react';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export enum AppState {
  SERVICE_SELECTION,
  CHAT,
  BOOKING,
  SNAKE_GAME,
}