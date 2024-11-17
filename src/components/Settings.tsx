import React from 'react';
import { useSystemStore } from '../store/systemStore';
import { Moon, Sun, Volume2, Wifi, Bluetooth, Bell } from 'lucide-react';

export const Settings: React.FC = () => {
  const { isDarkMode, volume, toggleDarkMode, setVolume } = useSystemStore();

  return (
    <div className="p-6">
      <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Settings
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isDarkMode ? (
              <Moon className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            ) : (
              <Sun className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            )}
            <span className={isDarkMode ? 'text-white' : 'text-gray-700'}>Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors ${
              isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                isDarkMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <span className={`w-12 text-right ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            {Math.round(volume * 100)}%
          </span>
        </div>

        <div className="space-y-4">
          <button className={`flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            <Wifi className="w-5 h-5" />
            <span>Wi-Fi</span>
          </button>
          
          <button className={`flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            <Bluetooth className="w-5 h-5" />
            <span>Bluetooth</span>
          </button>
          
          <button className={`flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </button>
        </div>

        <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            About
          </h3>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>Modern Web OS v1.0.0</p>
            <p className="mt-1">A voice-controlled web operating system interface</p>
          </div>
        </div>
      </div>
    </div>
  );
};