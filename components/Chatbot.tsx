
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Service } from '../types';
import { AppState } from '../types';

interface ChatbotProps {
  service: Service;
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  appState: AppState;
  onRestart: () => void;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></div>
    </div>
);

const BotMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-start gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="bg-gray-700 rounded-lg rounded-tl-none px-4 py-3 max-w-md">
            <p className="text-gray-200">{text}</p>
        </div>
    </div>
);

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex justify-end">
        <div className="bg-indigo-600 rounded-lg rounded-br-none px-4 py-3 max-w-md">
            <p className="text-white">{text}</p>
        </div>
    </div>
);


export const Chatbot: React.FC<ChatbotProps> = ({ service, chatHistory, onSendMessage, isLoading, appState, onRestart }) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && appState === AppState.CHAT) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] p-4">
      <div className="w-full max-w-2xl h-[80vh] max-h-[700px] bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 flex flex-col">
        <header className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div>
             <h2 className="text-lg font-bold text-white">AI Consultation</h2>
             <p className="text-sm text-indigo-400">{service.name}</p>
          </div>
          <button onClick={onRestart} className="text-sm text-gray-400 hover:text-white transition">Start Over</button>
        </header>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {chatHistory.map((msg, index) =>
            msg.sender === 'bot' ? <BotMessage key={index} text={msg.text} /> : <UserMessage key={index} text={msg.text} />
          )}
          {isLoading && <div className="flex justify-start"><div className="bg-gray-700 rounded-lg p-3"><LoadingIndicator/></div></div>}
          {appState === AppState.BOOKING && (
             <div className="flex justify-start">
                 <a 
                    href="mailto:info@highshiftmedia.com" 
                    className="mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 inline-flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Book a Call via Email
                </a>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={appState === AppState.CHAT ? "Type your answer..." : "Consultation finished"}
              disabled={isLoading || appState !== AppState.CHAT}
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || appState !== AppState.CHAT || !input.trim()}
              className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-500 transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};