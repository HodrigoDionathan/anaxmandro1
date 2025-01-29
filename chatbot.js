// Configuração do chatbot
const chatbotResponses = {
    initial: "Olá! Sou o assistente virtual do Dr. Anaxmandro. Como posso ajudar você hoje?",
    consulta: {
        message: "Para agendar uma consulta, você será redirecionado para o WhatsApp do Dr. Anaxmandro.",
        options: ["Clique em 'Continuar' para prosseguir com o agendamento."],
        whatsapp: "Olá Dr. Anaxmandro, gostaria de agendar uma consulta."
    },
    horarios: {
        message: "Nossos horários de atendimento são:",
        options: [
            "Segunda a Sexta: 08:00 às 18:00",
            "Sábado: 08:00 às 12:00"
        ],
        whatsapp: "Olá Dr. Anaxmandro, gostaria de saber mais sobre os horários de atendimento."
    },
    emergencia: {
        message: "Em caso de emergência, você será redirecionado para contato imediato.",
        options: ["Clique em 'Continuar' para contato urgente."],
        whatsapp: "URGENTE: Olá Dr. Anaxmandro, preciso de atendimento emergencial."
    },
    informacoes: {
        message: "Para mais informações, você será redirecionado para contato direto.",
        options: ["Clique em 'Continuar' para mais informações."],
        whatsapp: "Olá Dr. Anaxmandro, gostaria de mais informações sobre o atendimento."
    }
};

// Função para redirecionar para o WhatsApp
function redirectToWhatsApp(message) {
    const phoneNumber = "5583999818044"; // Número do Dr. Anaxmandro
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Inicialização do chatbot
function initChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotSelect = document.getElementById('chatbot-options');
    const chatbotSend = document.getElementById('chatbot-send');

    if (!chatbot || !chatbotMessages || !chatbotToggle || !chatbotSelect || !chatbotSend) {
        console.error('Elementos do chatbot não encontrados');
        return;
    }

    // Função para adicionar mensagem
    function addMessage(message, isBot = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Função para adicionar opções como mensagens
    function addOptions(options) {
        options.forEach(option => {
            addMessage(`• ${option}`, true);
        });
    }

    // Função para adicionar botão de continuação
    function addContinueButton(whatsappMessage) {
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'message bot continue-button';
        const button = document.createElement('button');
        button.textContent = 'Continuar no WhatsApp';
        button.onclick = () => redirectToWhatsApp(whatsappMessage);
        buttonDiv.appendChild(button);
        chatbotMessages.appendChild(buttonDiv);
    }

    // Toggle do chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.toggle('open');
        if (chatbot.classList.contains('open') && chatbotMessages.children.length === 0) {
            addMessage(chatbotResponses.initial);
        }
    });

    // Envio de mensagem
    chatbotSend.addEventListener('click', () => {
        const selected = chatbotSelect.value;
        if (selected) {
            addMessage(chatbotSelect.options[chatbotSelect.selectedIndex].text, false);
            
            const response = chatbotResponses[selected];
            if (response) {
                simulateTyping(() => {
                    addMessage(response.message);
                    if (response.options) {
                        addOptions(response.options);
                    }
                    if (response.whatsapp) {
                        setTimeout(() => {
                            addContinueButton(response.whatsapp);
                        }, 1000);
                    }
                });
            }
            
            chatbotSelect.value = '';
        }
    });

    // Simular status "digitando"
    function simulateTyping(callback) {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.textContent = 'Digitando...';
        chatbotMessages.appendChild(typingDiv);
        
        setTimeout(() => {
            typingDiv.remove();
            callback();
        }, 1500);
    }
}

// Inicializar o chatbot quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initChatbot); 