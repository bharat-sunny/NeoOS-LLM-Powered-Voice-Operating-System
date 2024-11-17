import React from 'react';
import { useSystemStore } from '../store/systemStore';

export const ProcessManager: React.FC = () => {
  const { processes, killProcess } = useSystemStore();

  return (
    <div className="w-full">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">PID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Memory</th>
            <th className="px-4 py-2">CPU</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id} className="border-t">
              <td className="px-4 py-2">{process.id}</td>
              <td className="px-4 py-2">{process.name}</td>
              <td className="px-4 py-2">{process.status}</td>
              <td className="px-4 py-2">{process.memory}MB</td>
              <td className="px-4 py-2">{process.cpu}%</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => killProcess(process.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Kill
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};