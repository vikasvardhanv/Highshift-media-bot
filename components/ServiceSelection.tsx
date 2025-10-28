
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-dots">
       <div className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Welcome to Highshift Media AI
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Let's build the future together. Select a service below to tell us more about your project.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl w-full">
        {SERVICES.map((service) => (
          <div key={service.id} className={service.id === 'snake' ? 'lg:col-span-1' : 'lg:col-span-1'}>
            <ServiceCard service={service} onClick={() => onSelect(service)} />
          </div>
        ))}
      </div>
    </div>
  );
};