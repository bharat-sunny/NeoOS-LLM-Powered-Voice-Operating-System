export interface Command {
  id: string;
  text: string;
  timestamp: number;
  type: 'user' | 'system';
}

export interface Process {
  id: number;
  name: string;
  status: 'running' | 'stopped';
  memory: number;
  cpu: number;
}

export interface File {
  id: string;
  name: string;
  type: 'file' | 'directory';
  content?: string;
  size: number;
  created: number;
  modified: number;
}

export interface Window {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  searchQuery?: string;
}

export interface SystemState {
  isDarkMode: boolean;
  isListening: boolean;
  volume: number;
  brightness: number;
  wifi: boolean;
  bluetooth: boolean;
  batteryLevel: number;
  notifications: boolean;
  commands: Command[];
  processes: Process[];
  files: File[];
  windows: Window[];
  activeWindow?: string;
  clipboard: string;
  language: string;
  timezone: string;
}

export type CommandAction =
  | 'OPEN_APP'
  | 'CLOSE_APP'
  | 'CREATE_FILE'
  | 'DELETE_FILE'
  | 'RENAME_FILE'
  | 'MOVE_FILE'
  | 'COPY_FILE'
  | 'TOGGLE_THEME'
  | 'SET_VOLUME'
  | 'SET_BRIGHTNESS'
  | 'TOGGLE_WIFI'
  | 'TOGGLE_BLUETOOTH'
  | 'SET_LANGUAGE'
  | 'SET_TIMEZONE'
  | 'TOGGLE_NOTIFICATIONS'
  | 'MINIMIZE_WINDOW'
  | 'MAXIMIZE_WINDOW'
  | 'RESTORE_WINDOW'
  | 'ARRANGE_WINDOWS'
  | 'SEARCH_FILES'
  | 'SEARCH_APPS'
  | 'SYSTEM_INFO'
  | 'KILL_PROCESS'
  | 'RESTART_PROCESS'
  | 'CLEAR_CLIPBOARD'
  | 'COPY_TO_CLIPBOARD'
  | 'PASTE_FROM_CLIPBOARD'
  | 'TAKE_SCREENSHOT'
  | 'UNKNOWN'
  | 'ERROR';

export interface SystemCommand {
  action: CommandAction;
  payload: any;
}