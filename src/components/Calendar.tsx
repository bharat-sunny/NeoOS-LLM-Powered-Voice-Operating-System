import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Calendar: React.FC = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button className="p-2 hover:bg-gray-100 rounded">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <button
            key={i}
            className={`p-2 text-center hover:bg-gray-100 rounded ${
              i + 1 === currentDate.getDate() ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};