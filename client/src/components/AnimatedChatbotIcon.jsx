import React from 'react';

const AnimatedChatbotIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Chatbot"
      className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-700 to-purple-900 flex items-center justify-center shadow-lg animate-pulse hover:animate-none focus:outline-none"
      style={{ cursor: 'pointer' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-3 4a9 9 0 110-18 9 9 0 010 18z"
        />
      </svg>
    </button>
  );
};

export default AnimatedChatbotIcon;
