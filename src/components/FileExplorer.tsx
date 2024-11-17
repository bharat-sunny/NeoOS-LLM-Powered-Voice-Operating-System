import React from 'react';
import { Folder, File, Trash2 } from 'lucide-react';
import { useSystemStore } from '../store/systemStore';

export const FileExplorer: React.FC = () => {
  const { files, deleteFile } = useSystemStore();

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="p-4 bg-gray-50 rounded-lg flex flex-col items-center"
          >
            {file.type === 'directory' ? (
              <Folder className="w-12 h-12 text-yellow-500" />
            ) : (
              <File className="w-12 h-12 text-blue-500" />
            )}
            <span className="mt-2 text-sm">{file.name}</span>
            <button
              onClick={() => deleteFile(file.id)}
              className="mt-2 p-1 hover:bg-red-100 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};