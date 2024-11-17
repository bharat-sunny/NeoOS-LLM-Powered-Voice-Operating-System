import { create } from 'zustand';
import { SystemState, Command, Process, Window, File } from '../types';

interface SystemStore extends SystemState {
  toggleDarkMode: () => void;
  toggleListening: () => void;
  setVolume: (volume: number) => void;
  addCommand: (command: Omit<Command, 'id' | 'timestamp'>) => void;
  addProcess: (process: Omit<Process, 'id'>) => void;
  killProcess: (id: number) => void;
  createWindow: (window: Omit<Window, 'id'>) => void;
  closeWindow: (id: string) => void;
  setActiveWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  toggleWindowMinimize: (id: string) => void;
  toggleWindowMaximize: (id: string) => void;
  createFile: (file: Omit<File, 'id' | 'created' | 'modified'>) => void;
  deleteFile: (id: string) => void;
  updateFile: (id: string, content: string) => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
  isDarkMode: false,
  isListening: false,
  volume: 1,
  commands: [],
  processes: [],
  files: [],
  windows: [],

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleListening: () => set((state) => ({ isListening: !state.isListening })),
  setVolume: (volume) => set({ volume }),

  addCommand: (command) =>
    set((state) => ({
      commands: [
        ...state.commands,
        {
          ...command,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
        },
      ],
    })),

  addProcess: (process) =>
    set((state) => ({
      processes: [
        ...state.processes,
        {
          ...process,
          id: Math.floor(Math.random() * 10000),
        },
      ],
    })),

  killProcess: (id) =>
    set((state) => ({
      processes: state.processes.filter((p) => p.id !== id),
    })),

  createWindow: (window) =>
    set((state) => ({
      windows: [
        ...state.windows,
        {
          ...window,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
      activeWindow: window.id,
    })),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindow: state.windows[0]?.id,
    })),

  setActiveWindow: (id) =>
    set({ activeWindow: id }),

  updateWindowPosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    })),

  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    })),

  toggleWindowMinimize: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    })),

  toggleWindowMaximize: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    })),

  createFile: (file) =>
    set((state) => ({
      files: [
        ...state.files,
        {
          ...file,
          id: Math.random().toString(36).substr(2, 9),
          created: Date.now(),
          modified: Date.now(),
        },
      ],
    })),

  deleteFile: (id) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== id),
    })),

  updateFile: (id, content) =>
    set((state) => ({
      files: state.files.map((f) =>
        f.id === id
          ? { ...f, content, modified: Date.now() }
          : f
      ),
    })),
}));