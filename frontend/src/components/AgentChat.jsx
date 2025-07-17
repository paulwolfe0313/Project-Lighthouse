// src/components/AgentChat.jsx
import React from 'react';

const AgentChat = () => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        <p className="text-sm text-gray-500 italic">AI Agent is here to help.</p>
        <div className="mt-4 space-y-2">
          <div className="bg-gray-100 p-3 rounded-lg text-sm self-start w-fit">
            Hi! How can I assist you with your workflow today?
          </div>
          <div className="bg-primary text-white p-3 rounded-lg text-sm self-end w-fit">
            Show me my recent finance uploads.
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <input
          type="text"
          placeholder="Type your question..."
          className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring focus:border-primary"
        />
      </div>
    </div>
  );
};

export default AgentChat;
