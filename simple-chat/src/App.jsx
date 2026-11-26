import { useState, useEffect, useRef } from 'react';
import './App.css';

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function App() {
  const [author, setAuthor] = useState(() => localStorage.getItem('author') || '');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('messages') || '[]');
    } catch {
      return [];
    }
  });
  const messagesEndRef = useRef(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = messageText.trim();
    const authorName = author.trim() || 'Аноним';

    if (text === '') return;

    // Save author name
    localStorage.setItem('author', authorName);
    setAuthor(authorName);

    const newMessage = {
      text,
      author: authorName,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="app">
      <form className="form" onSubmit={handleSubmit}>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={`${msg.timestamp}-${index}`} className="message">
              <div className="message-author">{msg.author || 'Аноним'}</div>
              <div className="message-text">{msg.text}</div>
              <div className="message-time">{formatTime(msg.timestamp)}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="form-actions">
          <input
            className="form-input"
            id="author-input"
            name="author"
            placeholder="Ваше имя"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className="form-input"
            id="message-input"
            name="message-text"
            placeholder="Введите сообщение"
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn-send" type="submit">
            <span className="material-icons">send</span>
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
