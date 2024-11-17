import React from 'react';
import { Terminal as TerminalIcon, Activity, Folder, Settings, Chrome, Music2, Mail, Calendar } from 'lucide-react';
import { useSystemStore } from '../store/systemStore';

export const TaskBar: React.FC = () => {
  const { createWindow, windows } = useSystemStore();

  const apps = [
    { icon: TerminalIcon, name: 'Terminal', component: 'terminal' },
    { icon: Activity, name: 'Process Manager', component: 'processmanager' },
    { icon: Folder, name: 'File Explorer', component: 'fileexplorer' },
    { icon: Chrome, name: 'Browser', component: 'browser' },
    { icon: Music2, name: 'Music', component: 'music' },
    { icon: Mail, name: 'Mail', component: 'mail' },
    { icon: Calendar, name: 'Calendar', component: 'calendar' },
    { icon: Settings, name: 'Settings', component: 'settings' },
  ];

  const handleAppClick = (component: string, title: string) => {
    createWindow({
      title,
      component,
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
    });
  };

  return (
    <div className="h-16 md:h-20 bg-black/70 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto h-full flex items-center px-2 md:px-4 space-x-1 md:space-x-2 overflow-x-auto">
        <div className="flex-shrink-0 flex space-x-1 md:space-x-2">
          {apps.map(({ icon: Icon, name, component }) => (
            <button
              key={name}
              onClick={() => handleAppClick(component, name)}
              className="group p-2 md:p-3 hover:bg-white/20 rounded-lg text-white flex flex-col items-center justify-center transition-all duration-200 relative"
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs mt-1 opacity-70 group-hover:opacity-100">{name}</span>
              <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
        
        <div className="flex-1 min-w-[20px]" />
        
        <div className="flex-shrink-0 flex space-x-1 md:space-x-2">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() => window.isMinimized && handleAppClick(window.component, window.title)}
              className={`px-3 py-2 rounded-lg text-white flex items-center space-x-2 transition-all duration-200 ${
                window.isMinimized ? 'bg-white/10 hover:bg-white/20' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <span className="text-xs md:text-sm truncate max-w-[100px] md:max-w-[150px]">
                {window.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};