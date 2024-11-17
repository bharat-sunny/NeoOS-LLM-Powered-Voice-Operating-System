import React from 'react';
import { Rnd } from 'react-rnd';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { useSystemStore } from '../store/systemStore';
import { Terminal } from './Terminal';
import { ProcessManager } from './ProcessManager';
import { FileExplorer } from './FileExplorer';
import { Browser } from './Browser';
import { Music } from './Music';
import { Mail } from './Mail';
import { Calendar } from './Calendar';
import { Settings } from './Settings';

interface WindowProps {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  searchQuery?: string;
}

const componentMap = {
  'terminal': Terminal,
  'processmanager': ProcessManager,
  'fileexplorer': FileExplorer,
  'browser': Browser,
  'music': Music,
  'mail': Mail,
  'calendar': Calendar,
  'settings': Settings
};

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  component,
  position,
  size,
  isMinimized,
  isMaximized,
  searchQuery,
}) => {
  const {
    closeWindow,
    setActiveWindow,
    updateWindowPosition,
    updateWindowSize,
    toggleWindowMinimize,
    toggleWindowMaximize,
    activeWindow,
  } = useSystemStore();

  const Component = componentMap[component as keyof typeof componentMap];

  if (isMinimized || !Component) return null;

  // Handle mobile view
  const isMobile = window.innerWidth < 768;
  const mobileSize = { width: window.innerWidth, height: window.innerHeight - 96 };
  const mobilePosition = { x: 0, y: 0 };

  return (
    <Rnd
      position={isMobile ? mobilePosition : (isMaximized ? { x: 0, y: 0 } : position)}
      size={isMobile ? mobileSize : (isMaximized ? { width: window.innerWidth, height: window.innerHeight - 96 } : size)}
      disableDragging={isMobile || isMaximized}
      enableResizing={!isMobile && !isMaximized}
      onDragStop={(e, d) => updateWindowPosition(id, { x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) =>
        updateWindowSize(id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        })
      }
      className={`bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden transition-shadow ${
        activeWindow === id ? 'z-50 ring-2 ring-blue-500' : 'z-0'
      }`}
      onMouseDown={() => setActiveWindow(id)}
      dragHandleClassName="window-handle"
    >
      <div className="window-handle p-2 bg-gray-800 dark:bg-gray-900 text-white flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <div className="flex space-x-1">
          <button
            onClick={() => toggleWindowMinimize(id)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          {!isMobile && (
            <button
              onClick={() => toggleWindowMaximize(id)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => closeWindow(id)}
            className="p-1 hover:bg-red-500 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-2.5rem)] overflow-auto">
        <Component searchQuery={searchQuery} />
      </div>
    </Rnd>
  );
};