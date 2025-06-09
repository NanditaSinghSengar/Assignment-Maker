import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = getBotReply(input);
    setMessages((prev) => [...prev, userMessage, { sender: 'bot', text: botReply }]);

    setInput('');
  };

  const getBotReply = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) return 'Hello! How can I help you today?';
    if (lower.includes('assignment')) return 'You can upload your assignment using our form.';
    if (lower.includes('thanks')) return 'You\'re welcome!';
    return 'Sorry, I didn’t understand. Can you please rephrase?';
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Chatbot</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2 bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left text-blue-600'}`}
          >
            <span className={`inline-block px-3 py-2 rounded ${msg.sender === 'user' ? 'bg-green-100' : 'bg-blue-100'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 border rounded-l px-2 py-1 outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 py-1 rounded-r hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
