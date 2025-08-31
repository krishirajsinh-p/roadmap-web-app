document.addEventListener('DOMContentLoaded', function () {
    const chatWidget = document.getElementById('chat-widget');
    const chatHeader = document.getElementById('chat-header');
    const toggleChatButton = document.getElementById('toggle-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');

    function toggleChat() {
        chatWidget.classList.toggle('chat-open');
        chatWidget.classList.toggle('chat-closed');
        const icon = toggleChatButton.querySelector('i');
        icon.classList.toggle('fa-chevron-up');
        icon.classList.toggle('fa-chevron-down');
    }

    chatHeader.addEventListener('click', toggleChat);

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';
            getBotResponse(message);
        }
    }

    if (sendButton && chatInput) {
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        console.error('Chat elements not found in the DOM');
    }

    function addMessage(sender, text) {
        if (chatMessages) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', `${sender}-message`);
            messageElement.textContent = text;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            console.error('Chat messages container not found');
        }
    }

    async function getBotResponse(message) {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
        typingIndicator.textContent = 'Typing...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const response = await mockLLMAPI(message);

        chatMessages.removeChild(typingIndicator);
        addMessage('bot', response);
    }

    async function mockLLMAPI(message) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        if (message.toLowerCase().includes('hello')) {
            return "Hello! How can I assist you with your Mermaid diagrams today?";
        } else if (message.toLowerCase().includes('diagram')) {
            return "I can help you create, modify, or understand Mermaid diagrams. What specific question do you have?";
        } else {
            return "I'm an AI assistant focused on helping with Mermaid diagrams. Could you please ask a question related to Mermaid or diagramming?";
        }
    }
});