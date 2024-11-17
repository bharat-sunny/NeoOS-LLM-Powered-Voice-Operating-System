import { CommandAction, SystemCommand } from '../types';

interface CommandPattern {
  patterns: RegExp[];
  action: CommandAction;
  extractPayload: (match: RegExpMatchArray, command: string) => any;
}

// Define exact component mappings
const APPS = {
  'terminal': 'terminal',
  'browser': 'browser',
  'music': 'music',
  'mail': 'mail',
  'calendar': 'calendar',
  'settings': 'settings',
  'process manager': 'processmanager',
  'processmanager': 'processmanager',
  'file explorer': 'fileexplorer',
  'fileexplorer': 'fileexplorer',
} as const;

// Define display names for apps
const APP_DISPLAY_NAMES = {
  'terminal': 'Terminal',
  'browser': 'Browser',
  'music': 'Music',
  'mail': 'Mail',
  'calendar': 'Calendar',
  'settings': 'Settings',
  'processmanager': 'Process Manager',
  'fileexplorer': 'File Explorer',
} as const;

export class LLMService {
  private static readonly COMMAND_PATTERNS: CommandPattern[] = [
    {
      patterns: [
        /^(?:open|launch|start|show)(?:\s+the\s+)?([a-z\s]+?)(?:\s+(?:and|to)\s+.*)?$/i,
      ],
      action: 'OPEN_APP',
      extractPayload: (match, command) => {
        const fullCommand = command.toLowerCase();
        let requestedApp = match[1].trim().toLowerCase();
        
        // Handle special cases
        if (requestedApp === 'term') requestedApp = 'terminal';
        
        // Find matching app
        const appKey = Object.keys(APPS).find(key => 
          key === requestedApp ||
          key.replace(/\s+/g, '') === requestedApp ||
          key.startsWith(requestedApp)
        );

        if (appKey) {
          const component = APPS[appKey as keyof typeof APPS];
          const displayName = APP_DISPLAY_NAMES[component as keyof typeof APP_DISPLAY_NAMES];
          
          // Extract search query for browser
          if (component === 'browser') {
            const searchMatch = fullCommand.match(/(?:search|look up|find)(?:\s+for)?\s+(.+)$/i);
            if (searchMatch) {
              return { 
                app: displayName,
                component,
                searchQuery: searchMatch[1].trim()
              };
            }
          }
          
          return { 
            app: displayName,
            component
          };
        }
        return null;
      }
    },
    {
      patterns: [
        /^(?:close|exit|quit)(?:\s+the\s+)?([a-z\s]+)$/i,
      ],
      action: 'CLOSE_APP',
      extractPayload: (match) => {
        const requestedApp = match[1].trim().toLowerCase();
        const appKey = Object.keys(APPS).find(key => 
          key === requestedApp ||
          key.replace(/\s+/g, '') === requestedApp ||
          key.startsWith(requestedApp)
        );
        return appKey ? { 
          app: APP_DISPLAY_NAMES[APPS[appKey as keyof typeof APPS] as keyof typeof APP_DISPLAY_NAMES],
          component: APPS[appKey as keyof typeof APPS]
        } : null;
      }
    }
  ];

  public static async executeCommand(command: string): Promise<SystemCommand> {
    try {
      // Take only the first sentence if multiple commands are given
      const firstCommand = command.split(/[.!?]\s+/)[0].toLowerCase().trim();
      
      for (const pattern of this.COMMAND_PATTERNS) {
        for (const regex of pattern.patterns) {
          const match = firstCommand.match(regex);
          if (match) {
            const payload = pattern.extractPayload(match, firstCommand);
            if (payload) {
              return {
                action: pattern.action,
                payload
              };
            }
          }
        }
      }

      return {
        action: 'UNKNOWN',
        payload: { response: "I'm not sure how to handle that command. Try saying 'open terminal' or 'open browser'." }
      };
    } catch (error) {
      console.error('Error processing command:', error);
      return {
        action: 'ERROR',
        payload: { error: 'Failed to process command' }
      };
    }
  }
}