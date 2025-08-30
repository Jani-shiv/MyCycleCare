// Import necessary React components and icons
import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

// Define the Message type for chat messages
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

// Mock responses for the AI wellness buddy
const mockResponses = [
  "It's normal to experience cramps during your period. Try a heating pad on your lower abdomen and stay hydrated!",
  "Regular exercise, even gentle activities like walking, can help reduce period pain over time.",
  "Many people experience mood changes before their period. This is due to hormonal fluctuations and is completely normal.",
  "Getting enough sleep during your period can help manage symptoms. Aim for 7-9 hours each night.",
  "If your period pain is severe enough to disrupt your daily activities, consider speaking with a healthcare provider.",
  "Drinking plenty of water helps reduce bloating during your period.",
  "Some foods that may help with period symptoms include fruits, vegetables, whole grains, and foods rich in calcium and magnesium.",
  "Your cycle typically consists of the menstrual phase, follicular phase, ovulation, and luteal phase.",
  "Tracking your symptoms can help you identify patterns and prepare for upcoming cycles.",
  "Self-care is important! Take time for yourself, especially during your period."
];

// Main WellnessChat component
const WellnessChat = () => {
  // State for managing chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your MyCycleCare wellness assistant. How can I help you today? You can ask me about period symptoms, cycle tracking, or wellness tips.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  // State for managing current message input
  const [currentMessage, setCurrentMessage] = useState('');
  // State for managing typing indicator
  const [isTyping, setIsTyping] = useState(false);
  
  // Function to handle sending messages
  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    // Simulate assistant response with delay
    setIsTyping(true);
    setTimeout(() => {
      // Select random response from mock responses
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      // Create assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Handle keyboard events for message input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    // Main chat container
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[500px]">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold">Wellness Assistant</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ask me anything about your cycle and well-being
        </p>
      </div>
      
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Render all messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] rounded-lg px-4 py-2 
                ${message.sender === 'user' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}
              `}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Message input area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {/* Message input textarea */}
          <textarea
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            placeholder="Type your message..."
            rows={1}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* Send message button */}
          <button
            className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isTyping}
          >
            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        {/* Demo disclaimer */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          This is a demo assistant. In a real app, it would connect to an AI service.
        </p>
      </div>
    </div>
  );
};

export default WellnessChat;