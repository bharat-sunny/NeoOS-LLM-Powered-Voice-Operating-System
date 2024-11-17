import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { useSystemStore } from '../store/systemStore';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { LLMService } from '../services/llmService';

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const { commands, addCommand, createWindow, closeWindow, toggleWindowMinimize, toggleWindowMaximize } = useSystemStore();
  const { isListening, startListening, stopListening, isSupported } = useSpeechRecognition();
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = async (text: string) => {
    addCommand({ text, type: 'user' });
    
    const response = await LLMService.executeCommand(text);
    
    switch (response.action) {
      case 'OPEN_APP':
        if (response.payload.app) {
          const componentName = response.payload.app.toLowerCase().replace(/\s+/g, '');
          createWindow({
            title: response.payload.app,
            component: componentName,
            position: { x: Math.random() * 100, y: Math.random() * 100 },
            size: { width: 800, height: 600 },
            isMinimized: false,
            isMaximized: false,
            searchQuery: response.payload.searchQuery,
          });
          addCommand({ 
            text: `Opening ${response.payload.app}${response.payload.searchQuery ? ` and searching for "${response.payload.searchQuery}"` : ''}...`, 
            type: 'system' 
          });
        } else {
          addCommand({
            text: 'Application not found. Try "open terminal" or "open browser"',
            type: 'system'
          });
        }
        break;
        
      case 'CLOSE_APP':
        if (response.payload.app) {
          closeWindow(response.payload.app.toLowerCase().replace(/\s+/g, ''));
          addCommand({ 
            text: `Closing ${response.payload.app}...`, 
            type: 'system' 
          });
        }
        break;

      case 'MINIMIZE_WINDOW':
        if (response.payload.window) {
          toggleWindowMinimize(response.payload.window.toLowerCase().replace(/\s+/g, ''));
          addCommand({ 
            text: `Minimizing ${response.payload.window}...`, 
            type: 'system' 
          });
        }
        break;

      case 'MAXIMIZE_WINDOW':
        if (response.payload.window) {
          toggleWindowMaximize(response.payload.window.toLowerCase().replace(/\s+/g, ''));
          addCommand({ 
            text: `Maximizing ${response.payload.window}...`, 
            type: 'system' 
          });
        }
        break;
        
      default:
        addCommand({ 
          text: response.payload.response || 'Command not recognized. Try "open terminal" or "open browser"', 
          type: 'system' 
        });
    }
    
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-green-400 font-mono rounded-lg overflow-hidden">
      <div className="p-2 bg-gray-800 text-xs">
        Modern Web OS Terminal
      </div>
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto space-y-2"
      >
        <div className="text-blue-400">Welcome to Modern Web OS Terminal</div>
        <div className="text-blue-400">Type 'help' for available commands</div>
        {commands.map((cmd) => (
          <div 
            key={cmd.id}
            className={`${
              cmd.type === 'user' ? 'text-blue-400' : 'text-green-400'
            }`}
          >
            {cmd.type === 'user' ? '> ' : '$ '}
            {cmd.text}
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          {isSupported && (
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-full ${
                isListening ? 'bg-red-500' : 'bg-gray-700'
              } hover:opacity-80 transition-opacity`}
            >
              {isListening ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          )}
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                handleCommand(input.trim());
              }
            }}
            className="flex-1 bg-gray-800 text-green-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Type a command or speak..."
          />
          
          <button
            onClick={() => input.trim() && handleCommand(input.trim())}
            className="p-2 bg-gray-700 rounded-full hover:opacity-80 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};