import React from 'react';
import { Mail as MailIcon, Star, Inbox, Send, Trash2 } from 'lucide-react';

export const Mail: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="w-48 bg-gray-50 p-4">
        <button className="w-full bg-blue-500 text-white rounded-lg p-2 mb-4">
          Compose
        </button>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
            <Inbox className="w-4 h-4" />
            <span>Inbox</span>
          </button>
          <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
            <Star className="w-4 h-4" />
            <span>Starred</span>
          </button>
          <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
            <Send className="w-4 h-4" />
            <span>Sent</span>
          </button>
          <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
            <Trash2 className="w-4 h-4" />
            <span>Trash</span>
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="text-center text-gray-500 mt-8">
          <MailIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Select an email to read</p>
        </div>
      </div>
    </div>
  );
};