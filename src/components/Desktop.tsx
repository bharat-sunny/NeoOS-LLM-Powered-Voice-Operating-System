import React, { useEffect } from 'react';
import { useSystemStore } from '../store/systemStore';
import { Window } from './Window';
import { TaskBar } from './TaskBar';
import { SystemBar } from './SystemBar';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export const Desktop: React.FC = () => {
  const { windows, isDarkMode } = useSystemStore();
  const { startListening, isSupported } = useSpeechRecognition();

  useEffect(() => {
    if (isSupported) {
      startListening();
    }
  }, [isSupported, startListening]);

  return (
    <div 
      className={`h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}
      style={{
        backgroundImage: isDarkMode 
          ? 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2560)'
          : 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2560)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <SystemBar />
      <div className="flex-1 relative overflow-hidden">
        {windows.map((window) => (
          <Window key={window.id} {...window} />
        ))}
        {windows.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className={`${isDarkMode ? 'bg-black/60' : 'bg-white/60'} p-8 rounded-xl backdrop-blur-lg max-w-md mx-auto transform transition-all duration-500 hover:scale-105 shadow-2xl border border-white/20`}>
              <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Welcome to NeoOS
              </h1>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your voice-controlled operating system
              </p>
              <div className="space-y-4">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Try saying:</p>
                <ul className="space-y-2 text-sm">
                  <li className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-gray-800'} p-3 rounded-lg transition-transform hover:scale-105 cursor-pointer`}>
                    "Open terminal"
                  </li>
                  <li className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-gray-800'} p-3 rounded-lg transition-transform hover:scale-105 cursor-pointer`}>
                    "Open browser and search for cats"
                  </li>
                  <li className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-gray-800'} p-3 rounded-lg transition-transform hover:scale-105 cursor-pointer`}>
                    "Open music"
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <TaskBar />
    </div>
  );
};