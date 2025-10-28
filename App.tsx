
import React, { useState, useCallback } from 'react';
import { ServiceSelection } from './components/ServiceSelection';
import { Chatbot } from './components/Chatbot';
import { SnakeGame } from './components/SnakeGame';
import type { Service, ChatMessage } from './types';
import { AppState } from './types';
import { QUESTIONS } from './constants';
import { generateSummary } from './services/geminiService';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.SERVICE_SELECTION);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleServiceSelect = useCallback((service: Service) => {
    setSelectedService(service);
    if (service.id === 'snake') {
      setAppState(AppState.SNAKE_GAME);
      return;
    }

    const firstQuestion = QUESTIONS[service.id]?.[0];
    if (firstQuestion) {
      setChatHistory([
        { sender: 'bot', text: `Great! Let's get started with ${service.name}. I have a few questions to understand your needs.` },
        { sender: 'bot', text: firstQuestion }
      ]);
    }
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setAppState(AppState.CHAT);
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!selectedService) return;

    const updatedHistory: ChatMessage[] = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(updatedHistory);
    
    const newAnswers = [...userAnswers, message];
    setUserAnswers(newAnswers);

    const nextQuestionIndex = currentQuestionIndex + 1;
    const serviceQuestions = QUESTIONS[selectedService.id];

    if (nextQuestionIndex < serviceQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setChatHistory(prev => [...prev, { sender: 'bot', text: serviceQuestions[nextQuestionIndex] }]);
    } else {
      setIsLoading(true);
      setAppState(AppState.BOOKING); // Change state to prevent user input while summarizing
      
      const summary = await generateSummary(selectedService.id, selectedService.name, newAnswers);
      
      setChatHistory(prev => [
          ...prev, 
          { sender: 'bot', text: summary },
          { sender: 'bot', text: "Thank you! To schedule a consultation, please click the button below to send us an email." }
      ]);
      setIsLoading(false);
    }
  }, [selectedService, chatHistory, userAnswers, currentQuestionIndex]);

  const handleRestart = () => {
    setAppState(AppState.SERVICE_SELECTION);
    setSelectedService(null);
    setChatHistory([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsLoading(false);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.SERVICE_SELECTION:
        return <ServiceSelection onSelect={handleServiceSelect} />;
      case AppState.SNAKE_GAME:
        return <SnakeGame onRestart={handleRestart} />;
      case AppState.CHAT:
      case AppState.BOOKING:
        if (selectedService) {
          return <Chatbot 
                    service={selectedService}
                    chatHistory={chatHistory}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    appState={appState}
                    onRestart={handleRestart}
                 />;
        }
        // Fallback to service selection if service is null
        handleRestart();
        return <ServiceSelection onSelect={handleServiceSelect} />;
      default:
        return <ServiceSelection onSelect={handleServiceSelect} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900">
      {renderContent()}
    </div>
  );
}

export default App;