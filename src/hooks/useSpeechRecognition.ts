import { useState, useEffect, useCallback } from 'react';
import { useSystemStore } from '../store/systemStore';
import { LLMService } from '../services/llmService';

export const useSpeechRecognition = () => {
  const { 
    isListening, 
    toggleListening, 
    addCommand, 
    createWindow 
  } = useSystemStore();
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [processingCommand, setProcessingCommand] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Configure recognition settings
      recognition.continuous = false; // Changed to false to prevent command concatenation
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      setRecognition(recognition);
    }
  }, []);

  const handleCommand = async (text: string) => {
    if (processingCommand) return; // Prevent multiple simultaneous commands
    
    setProcessingCommand(true);
    addCommand({ text, type: 'user' });
    
    try {
      const response = await LLMService.executeCommand(text);
      
      switch (response.action) {
        case 'OPEN_APP':
          if (response.payload.app && response.payload.component) {
            createWindow({
              title: response.payload.app,
              component: response.payload.component,
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
        default:
          addCommand({ 
            text: response.payload.response || 'Command not recognized. Try "open terminal" or "open browser"', 
            type: 'system' 
          });
      }
    } finally {
      setProcessingCommand(false);
    }
  };

  const startListening = useCallback(() => {
    if (recognition && !processingCommand) {
      try {
        recognition.start();
        toggleListening();
        addCommand({ 
          text: 'Voice recognition activated. Try saying "open terminal" or "open browser"', 
          type: 'system' 
        });
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        addCommand({ 
          text: 'Failed to start voice recognition. Please try again.', 
          type: 'system' 
        });
        setProcessingCommand(false);
      }
    }
  }, [recognition, toggleListening, addCommand, processingCommand]);

  const stopListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
        toggleListening();
        addCommand({ 
          text: 'Voice recognition deactivated', 
          type: 'system' 
        });
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
      }
      setProcessingCommand(false);
    }
  }, [recognition, toggleListening, addCommand]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (event.results[0].isFinal) {
        handleCommand(transcript.toLowerCase().trim());
      }
    };

    recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    recognition.onend = () => {
      // Automatically restart if still in listening mode
      if (isListening && !processingCommand) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Failed to restart speech recognition:', error);
          stopListening();
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      // Handle specific error cases
      switch (event.error) {
        case 'no-speech':
          // This is normal, just restart if still listening
          if (isListening && !processingCommand) {
            try {
              recognition.start();
            } catch (error) {
              console.error('Failed to restart after no-speech:', error);
              stopListening();
            }
          }
          break;
          
        case 'not-allowed':
        case 'service-not-allowed':
          addCommand({ 
            text: 'Microphone access denied. Please enable microphone access and try again.', 
            type: 'system' 
          });
          stopListening();
          break;
          
        case 'network':
          addCommand({ 
            text: 'Network error occurred. Please check your connection and try again.', 
            type: 'system' 
          });
          stopListening();
          break;
          
        default:
          addCommand({ 
            text: 'Voice recognition error occurred. Please try again.', 
            type: 'system' 
          });
          stopListening();
      }
      setProcessingCommand(false);
    };

    return () => {
      recognition.stop();
    };
  }, [recognition, isListening, stopListening, handleCommand, addCommand, processingCommand]);

  return {
    isListening,
    startListening,
    stopListening,
    isSupported: !!recognition
  };
};