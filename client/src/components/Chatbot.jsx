import React, { useState } from 'react';
import { mockChatbotResponse } from '../services/api';
import { fetchChatGPTResponse } from '../services/openai';
import AnimatedChatbotIcon from './AnimatedChatbotIcon';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    if (isOpen) {
      // Clear chat messages when closing
      setMessages([{ from: 'bot', text: 'Hello! How can I assist you today?' }]);
    }
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([{ from: 'bot', text: 'Hello! How can I assist you today?' }]);
    setIsOpen(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;

    // Context about the application modules and components
    const appContext = `
      This is an analytics application with modules including Profile Performance, Custom Reports, Post Performance, Tag Performance, Competitors by Network, and Internal Performance.
      The application provides insights on social media metrics such as accounts reached, engagement, likes, views, and comments.
      Users can navigate through various pages like Homepage, ProfilePerformance, CustomReport1, CustomReport2, PostPerformance, TagPerformance, and competitor analysis pages for Twitter, Facebook, Instagram, and LinkedIn.
      The chatbot should assist users by explaining these modules, metrics, and suggesting strategies based on this context.
    `;

    const prompt = appContext + "\nUser query: " + userMessage;

    setMessages([...messages, { from: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);
    try {
      // Check for page open commands
      const lowerCaseMessage = userMessage.toLowerCase();
      let botResponse = '';

      // Simple page navigation commands
      if (lowerCaseMessage.includes('open homepage')) {
        botResponse = 'Opening Homepage...';
        window.location.href = '/'; // Adjust route as needed
      } else if (lowerCaseMessage.includes('open profile performance')) {
        botResponse = 'Opening Profile Performance page...';
        window.location.href = '/ProfilePerformance'; // Adjust route as needed
      } else if (lowerCaseMessage.includes('open custom report 1')) {
        botResponse = 'Opening Custom Report 1 page...';
        window.location.href = '/CustomReport1'; // Adjust route as needed
      } else {
        // Call ChatGPT API for other queries
        botResponse = await fetchChatGPTResponse(prompt);
      }

      setMessages(prev => [...prev, { from: 'bot', text: botResponse }]);
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || error.message || 'Sorry, something went wrong. Please try again later.';
      setMessages(prev => [...prev, { from: 'bot', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-12">
        <AnimatedChatbotIcon onClick={toggleChat} />
      </div>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-96 bg-white rounded-lg shadow-lg flex flex-col z-50">
          <div className="flex flex-col p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={clearChat}
                className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Clear chat"
                title="Clear chat"
              >
                &#x2715; Clear
              </button>
            </div>
            <div className="flex-1 overflow-auto mb-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 p-2 rounded ${
                    msg.from === 'bot' ? 'bg-gray-200 text-black self-start' : 'bg-blue-500 text-white self-end'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="mb-2 p-2 rounded bg-gray-200 text-black self-start">
                  Typing...
                </div>
              )}
            </div>
            <div className="flex">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-l px-2 py-1"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button
                className="bg-blue-600 text-white px-4 rounded-r"
                onClick={handleSend}
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
