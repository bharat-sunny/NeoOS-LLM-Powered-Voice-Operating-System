import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

export const Browser: React.FC<{ searchQuery?: string }> = ({ searchQuery }) => {
  const [url, setUrl] = useState('https://www.bing.com');
  const [searchInput, setSearchInput] = useState(searchQuery || '');

  useEffect(() => {
    if (searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery);
      setUrl(`https://www.bing.com/search?q=${encodedQuery}`);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const encodedQuery = encodeURIComponent(searchInput);
      setUrl(`https://www.bing.com/search?q=${encodedQuery}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 bg-gray-100 flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-200 rounded">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded">
          <RefreshCw className="w-4 h-4" />
        </button>
        <form onSubmit={handleSearch} className="flex-1 flex">
          <div className="flex-1 flex items-center bg-white border rounded-lg px-3 py-1">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 ml-2 outline-none"
              placeholder="Search or enter URL"
            />
          </div>
        </form>
      </div>
      <div className="flex-1">
        <iframe
          src={url}
          className="w-full h-full border-none"
          title="Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};