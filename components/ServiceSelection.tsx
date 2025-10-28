
import React from 'react';
import type { Service } from '../types';
import { SERVICES } from '../constants';

interface ServiceSelectionProps {
  onSelect: (service: Service) => void;
}

const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-left w-full h-full flex flex-col transition-all duration-300 hover:bg-gray-700/60 hover:border-indigo-500 hover:-translate-y-1"
  >
    {service.icon}
    <h3 className="font-bold text-lg text-white mb-2">{service.name}</h3>
    <p className="text-gray-400 text-sm flex-grow">{service.description}</p>
  </button>
);

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative">
       <div className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          Highshift Media
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          AI-Powered Solutions for Tomorrow's Business.
        </p>
         <p className="mt-2 text-md text-gray-400">
          Select a service below to start a conversation with our AI assistant.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl w-full">
        {SERVICES.map((service) => (
          <div key={service.id} className={service.id === 'snake' ? 'lg:col-span-1' : 'lg:col-span-1'}>
            <ServiceCard service={service} onClick={() => onSelect(service)} />
          </div>
        ))}
      </div>
       <footer className="absolute bottom-0 w-full text-center p-4 text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Highshift Media. All Rights Reserved.
      </footer>
    </div>
  );
};
