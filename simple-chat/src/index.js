import './index.css';

const form = document.querySelector('form');
const authorInput = document.getElementById('author-input');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.querySelector('.messages-container');

// Загрузить сохранённое имя
authorInput.value = localStorage.getItem('author') || '';

form.addEventListener('submit', handleSubmit);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
});

function getMessages() {
    return JSON.parse(localStorage.getItem('messages') || '[]');
}

function saveMessages(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return hours + ':' + minutes;
}

function renderMessages() {
    const messages = getMessages();
    messagesContainer.innerHTML = '';
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'message';

        const authorDiv = document.createElement('div');
        authorDiv.className = 'message-author';
        authorDiv.textContent = msg.author || 'Аноним';

        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = msg.text;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = formatTime(msg.timestamp);

        div.appendChild(authorDiv);
        div.appendChild(textDiv);
        div.appendChild(timeDiv);
        messagesContainer.appendChild(div);
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const text = messageInput.value.trim();
    const author = authorInput.value.trim() || 'Аноним';

    if (text === '') return;

    // Сохранить имя
    localStorage.setItem('author', author);

    const messages = getMessages();
    messages.push({
        text: text,
        author: author,
        timestamp: Date.now()
    });
    saveMessages(messages);

    const div = document.createElement('div');
    div.className = 'message';

    const authorDiv = document.createElement('div');
    authorDiv.className = 'message-author';
    authorDiv.textContent = author;

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;

    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = formatTime(Date.now());

    div.appendChild(authorDiv);
    div.appendChild(textDiv);
    div.appendChild(timeDiv);
    messagesContainer.appendChild(div);

    messageInput.value = '';
}

renderMessages();
