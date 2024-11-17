import React from 'react';
import { Moon, Sun, Volume2, Wifi, Bluetooth, Battery, Bell } from 'lucide-react';
import { useSystemStore } from '../store/systemStore';

export const SystemBar: React.FC = () => {
  const { isDarkMode, volume, toggleDarkMode, setVolume } = useSystemStore();

  return (
    <div className="h-8 bg-black/70 backdrop-blur-xl text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto h-full px-2 md:px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-1 hover:bg-white/10 rounded-full transition-all duration-200"
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>
          
          <div className="hidden md:flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 accent-white"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          <Wifi className="w-4 h-4" />
          <Bluetooth className="hidden md:block w-4 h-4" />
          <Bell className="hidden md:block w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span className="text-xs md:text-sm font-medium">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};