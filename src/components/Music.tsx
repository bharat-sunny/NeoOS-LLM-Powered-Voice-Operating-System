import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export const Music: React.FC = () => {
  return (
    <div className="p-4">
      <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex items-center justify-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
            alt="Album cover"
            className="w-48 h-48 rounded-lg shadow-lg"
          />
        </div>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Currently Playing</h3>
          <p className="text-gray-600">Artist Name</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <SkipBack className="w-6 h-6" />
          </button>
          <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Play className="w-8 h-8" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center mt-4">
          <Volume2 className="w-4 h-4 mr-2" />
          <input
            type="range"
            className="w-full"
            min="0"
            max="100"
            defaultValue="50"
          />
        </div>
      </div>
    </div>
  );
};