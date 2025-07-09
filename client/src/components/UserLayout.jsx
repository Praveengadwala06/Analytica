import React from 'react';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';

function UserLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-900 relative z-10">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
      <Chatbot />
    </div>
  );
}

export default UserLayout;
