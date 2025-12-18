
import React, { useState, useCallback } from 'react';
import { ServiceSelection } from './components/ServiceSelection';
import { Chatbot } from './components/Chatbot';
import { SnakeGame } from './components/SnakeGame';
import { BusinessPlanner } from './components/BusinessPlanner';
import { VoiceAgent } from './components/VoiceAgent';
import type { Service, ChatMessage, Question } from './types';
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
    
    if (service.id === 'business_plan') {
      setAppState(AppState.BUSINESS_PLAN);
      return;
    }
    
    if (service.id === 'voice_agent') {
        setAppState(AppState.VOICE_AGENT);
        return;
    }

    const firstQuestion = QUESTIONS[service.id]?.[0]?.text;
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
      setChatHistory(prev => [...prev, { sender: 'bot', text: serviceQuestions[nextQuestionIndex].text }]);
    } else {
      setIsLoading(true);
      setAppState(AppState.BOOKING); // Change state to prevent user input while summarizing
      
      const summary = await generateSummary(selectedService.id, selectedService.name, newAnswers);
      
      setChatHistory(prev => [
          ...prev, 
          { sender: 'bot', text: summary },
          { sender: 'bot', text: "Thank you! Everything is ready. Please click the button below to send your information to our development team." }
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
      case AppState.BUSINESS_PLAN:
        return <BusinessPlanner onRestart={handleRestart} />;
      case AppState.VOICE_AGENT:
          return <VoiceAgent onRestart={handleRestart} />;
      case AppState.CHAT:
      case AppState.BOOKING:
        if (selectedService) {
          const currentQuestion = QUESTIONS[selectedService.id]?.[currentQuestionIndex];
          return <Chatbot 
                    service={selectedService}
                    chatHistory={chatHistory}
                    userAnswers={userAnswers}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    appState={appState}
                    onRestart={handleRestart}
                    currentQuestion={currentQuestion}
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
