/* ================================================================
   MOHAMED AMINE HALHOUL — PORTFOLIO (anish7.me inspiration)
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
