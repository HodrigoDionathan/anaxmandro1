document.addEventListener("DOMContentLoaded", () => {
    const sections = [
        document.querySelector("#sobre"),
        document.querySelector("#habilidades"),
        document.querySelector("#contato")
    ];

    // Adiciona o efeito com um atraso entre as animações
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.remove("hidden");
            section.classList.add("slide-in");
        }, index * 1000); // 1 segundo de intervalo entre as seções
    });
});

// Indicador de carregamento
const loading = document.createElement('div');
loading.className = 'loading';
document.body.appendChild(loading);

window.addEventListener('load', () => {
    loading.classList.add('active');
    setTimeout(() => {
        loading.style.display = 'none';
    }, 500);
});

// Lazy loading para imagens
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Tooltips para elementos interativos
const tooltips = {
    'menu-toggle': 'Clique para abrir o menu',
    'whatsapp-chat': 'Clique para iniciar uma conversa',
    'galeria': 'Clique nas imagens para ampliar'
};

function addTooltips() {
    Object.entries(tooltips).forEach(([elementId, text]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.setAttribute('title', text);
        }
    });
}

// Scroll suave melhorado
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Melhorar o carregamento de imagens
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    addTooltips();
    lazyLoadImages();
    
    // Loading bar
    const loadingBar = document.createElement('div');
    loadingBar.className = 'loading-bar';
    document.body.appendChild(loadingBar);
    
    window.addEventListener('load', () => {
        loadingBar.classList.add('active');
        setTimeout(() => loadingBar.style.opacity = '0', 1000);
    });
});

// Configuração do chatbot
const chatbotResponses = {
    initial: "Olá! Sou o assistente virtual do Dr. Anaxmandro. Como posso ajudar você hoje?",
    consulta: {
        message: "Para agendar uma consulta, por favor escolha um dos horários disponíveis:",
        options: [
            "Segunda-feira - 09:00",
            "Terça-feira - 14:00",
            "Quarta-feira - 10:00",
            "Quinta-feira - 15:00"
        ]
    },
    horarios: {
        message: "Nossos horários de atendimento são:",
        options: [
            "Segunda a Sexta: 08:00 às 18:00",
            "Sábado: 08:00 às 12:00"
        ]
    },
    emergencia: {
        message: "Em caso de emergência:",
        options: [
            "Ligue para (83) 99981-8044",
            "Procure a emergência mais próxima",
            "Entre em contato com SAMU: 192"
        ]
    },
    informacoes: {
        message: "Informações importantes:",
        options: [
            "CRM: XXXXX",
            "Endereço: Rua Example, 123",
            "Especialidades: Psiquiatria",
            "Convênios aceitos: XXX, YYY, ZZZ"
        ]
    }
};

// Inicialização do chatbot
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = document.getElementById('chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotSelect = document.getElementById('chatbot-options');
    const chatbotSend = document.getElementById('chatbot-send');

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

    // Toggle do chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.toggle('open');
        if (chatbot.classList.contains('open') && chatbotMessages.children.length === 0) {
            // Mensagem inicial apenas na primeira abertura
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
                setTimeout(() => {
                    addMessage(response.message);
                    if (response.options) {
                        setTimeout(() => {
                            addOptions(response.options);
                        }, 500);
                    }
                }, 500);
            }
            
            chatbotSelect.value = '';
        }
    });

    // Simular status "digitando"
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.textContent = 'Digitando...';
        chatbotMessages.appendChild(typingDiv);
        return typingDiv;
    }

    // Animação de digitação
    function simulateTyping(callback) {
        const typing = showTyping();
        setTimeout(() => {
            typing.remove();
            callback();
        }, 1000);
    }
});
