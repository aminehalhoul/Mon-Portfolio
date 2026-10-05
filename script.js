/* ================================================================
   MOHAMED AMINE HALHOUL â€” PORTFOLIO (anish7.me inspiration)
   Animations & Interactions
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Custom Cursor
  const cursor = document.getElementById('cursor');
  
  // Follow mouse
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Expand on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .project-card, .exp-card, .social-icon');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
  });

  // 2. Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Floating Nav Panel (Premium anish7.me style)
  const menuBtn = document.getElementById('menuBtn');
  const navPanel = document.getElementById('navPanel');
  const navLinks = document.querySelectorAll('.nav-panel-link');
  let isNavOpen = false;

  const toggleNav = () => {
    isNavOpen = !isNavOpen;
    if (isNavOpen) {
      navPanel.classList.add('open');
      menuBtn.textContent = 'CLOSE';
      menuBtn.classList.add('close-state');
      document.body.style.overflow = 'hidden';
    } else {
      navPanel.classList.remove('open');
      menuBtn.textContent = 'MENU';
      menuBtn.classList.remove('close-state');
      document.body.style.overflow = '';
    }
  };

  menuBtn.addEventListener('click', toggleNav);

  // Close when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isNavOpen) toggleNav();
    });
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNavOpen) {
      toggleNav();
    }
  });

  // 3. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed for performance
        // observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Advanced Text Reveal (Word by Word)
  const textReveals = document.querySelectorAll('.reveal-text');
  
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const spans = entry.target.querySelectorAll('span');
        spans.forEach((span, index) => {
          setTimeout(() => {
            span.classList.add('highlight');
          }, index * 100); // 100ms delay between words
        });
      }
    });
  }, {
    threshold: 0.5
  });

  textReveals.forEach(el => textObserver.observe(el));

  // 5. Certifications Marquee (Testimonial Style)
  const marqueeTrack = document.getElementById('certMarquee');
  if (marqueeTrack) {
    const cards = Array.from(marqueeTrack.children);
    
    // Duplicate cards for infinite loop to look seamless
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      marqueeTrack.appendChild(clone);
    });
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      marqueeTrack.appendChild(clone);
    });

    // Function to calculate center and add .active class
    const updateActiveCard = () => {
      const viewportCenter = window.innerWidth / 2;
      let closestCard = null;
      let minDistance = Infinity;

      const allCards = document.querySelectorAll('.cert-card');
      
      allCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        // Calculate center of the card
        const cardCenter = rect.left + (rect.width / 2);
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      // Update classes
      allCards.forEach(card => card.classList.remove('active'));
      if (closestCard) {
        closestCard.classList.add('active');
      }
      
      requestAnimationFrame(updateActiveCard);
    };

    // Start tracking center
    requestAnimationFrame(updateActiveCard);
  }

});

/* ================================================================
   MODAL LOGIC
================================================================ */
window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function(event, id) {
  if (event && event.type === 'click') {
    // If clicking inside the content box, don't close (unless it's the close button itself)
    if (event.target.closest('.modal-content') && !event.target.closest('.modal-close')) {
      return;
    }
  }
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Close all modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModals = document.querySelectorAll('.modal.active');
    activeModals.forEach(modal => {
      window.closeModal(null, modal.id);
    });
  }
});

/* ================================================================
   AMINE AI CHATBOT
================================================================ */
(function() {
  const fab = document.getElementById('chatbotFab');
  const panel = document.getElementById('chatbotPanel');
  const closeBtn = document.getElementById('chatbotClose');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');
  const messagesEl = document.getElementById('chatbotMessages');
  const suggestionsEl = document.getElementById('chatbotSuggestions');
  const sendBtn = document.getElementById('chatbotSend');

  if (!fab || !panel) return;

  let isOpen = false;
  let chatHistory = [];

  // Open / Close
  function openChat() {
    isOpen = true;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    fab.classList.add('hidden');
    setTimeout(() => input.focus(), 400);
  }

  function closeChat() {
    isOpen = false;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    fab.classList.remove('hidden');
  }

  fab.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeChat();
  });

  // Add a message to the chat
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('chat-msg', sender);

    const avatarSvg = sender === 'ai'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>';

    msg.innerHTML = `
      <div class="chat-msg-avatar">${avatarSvg}</div>
      <div class="chat-msg-bubble">${text}</div>
    `;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // Typing indicator
  function showTyping() {
    const typing = document.createElement('div');
    typing.classList.add('chat-msg', 'ai');
    typing.id = 'typingIndicator';
    typing.innerHTML = `
      <div class="chat-msg-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
        </svg>
      </div>
      <div class="chat-msg-bubble">
        <div class="typing-indicator"><span></span><span></span><span></span></div>
      </div>
    `;
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  //  API call â€“ Ready for backend integration
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  
  
  
  const CHAT_API_ENDPOINT = 'http://127.0.0.1:8000/chat';

  async function sendToAPI(question) {
    showTyping();
    sendBtn.disabled = true;

    try {
      // Préparer l'historique sans la question actuelle
      const historyToSend = chatHistory.slice(0, -1);
      
      const res = await fetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question, history: historyToSend })
      });

      hideTyping();

      if (res.status === 429) {
        addMessage('Vous avez envoyé plusieurs messages rapidement. Veuillez patienter quelques instants.', 'ai');
        return;
      }
      
      if (!res.ok) throw new Error(HTTP );
      const data = await res.json();
      const aiResponse = data.answer || 'Désolé, je n\'ai pas pu traiter votre question.';
      
      addMessage(aiResponse, 'ai');
      chatHistory.push({ role: 'ai', content: aiResponse });
      
      // Limiter l'historique côté client à 6 messages
      if (chatHistory.length > 6) {
        chatHistory = chatHistory.slice(-6);
      }
      
    } catch (err) {
      hideTyping();
      addMessage('Amine AI est temporairement indisponible. Veuillez réessayer.', 'ai');
      console.warn('Chatbot API error:', err);
    } finally {
      sendBtn.disabled = false;
    }
  }

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    
    if (text.length > 500) {
      addMessage('Votre message est trop long (maximum 500 caractères).', 'ai');
      return;
    }

    addMessage(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    input.value = '';

    if (suggestionsEl) suggestionsEl.classList.add('hidden');

    sendToAPI(text);
  });

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q');
      addMessage(q, 'user');
      chatHistory.push({ role: 'user', content: q });
      suggestionsEl.classList.add('hidden');
      sendToAPI(q);
    });
  });

})();



/* ==========================================
   HERO PHOTO INTERACTION
========================================== */
const heroPolygon = document.getElementById('heroPolygon');
if (heroPolygon) {
  let isAnimating = false;
  heroPolygon.addEventListener('click', () => {
    if (isAnimating) return; // Empêcher les clics répétés
    
    isAnimating = true;
    heroPolygon.classList.toggle('show-photo-2');
    
    // Débloquer après la durée de l'animation (850ms)
    setTimeout(() => {
      isAnimating = false;
    }, 850);
  });
}
