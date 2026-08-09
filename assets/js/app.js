// Interactive Features & Fluid Micro-interactions for UI/UX & Visual Design Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initIntersectionObserver();
  initProjectFiltering();
  initMobileMenu();
  initEmailCopy();
  initContactForm();
  initSmoothScroll();
});

// Custom Fluid Cursor with Magnetic Properties & Text Reveal
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor tracking
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.15;
    cursorY += dy * 0.15;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const interactableCards = document.querySelectorAll('.project-card');
  const interactableButtons = document.querySelectorAll('a, button, input, textarea, [role="button"]');

  interactableCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
    });
  });

  interactableButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (!cursor.classList.contains('hovered')) {
        cursor.classList.add('button-hovered');
      }
    });
    btn.addEventListener('mouseleave', () => {
      cursor.classList.remove('button-hovered');
    });
  });

  // Hide/Show cursor depending on page exit
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

// Fade in & slide up elements elegantly on scroll
function initIntersectionObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

// Dynamic project filtering
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active states
      filterBtns.forEach(b => b.classList.remove('active', 'border-white', 'text-white'));
      filterBtns.forEach(b => b.classList.add('border-zinc-800', 'text-zinc-400'));

      // Active current button
      btn.classList.add('active', 'border-white', 'text-white');
      btn.classList.remove('border-zinc-800', 'text-zinc-400');

      const filterValue = btn.getAttribute('data-filter');

      projects.forEach(project => {
        const category = project.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          project.classList.remove('hidden-filter');
        } else {
          project.classList.add('hidden-filter');
        }
      });
    });
  });
}

// Accessible Mobile Navigation Menu
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-link');

  if (!menuToggle || !mobileMenu) return;

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');

    // Toggle menu icon between burger and X
    const svgPaths = menuToggle.querySelectorAll('path');
    if (isExpanded) {
      svgPaths[0].setAttribute('d', 'M4 6h16');
      svgPaths[1].setAttribute('d', 'M4 12h16');
      svgPaths[2].setAttribute('d', 'M4 18h16');
    } else {
      svgPaths[0].setAttribute('d', 'M6 18L18 6M6 6l12 12');
      svgPaths[1].setAttribute('d', '');
      svgPaths[2].setAttribute('d', '');
    }
  }

  menuToggle.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');

      const svgPaths = menuToggle.querySelectorAll('path');
      svgPaths[0].setAttribute('d', 'M4 6h16');
      svgPaths[1].setAttribute('d', 'M4 12h16');
      svgPaths[2].setAttribute('d', 'M4 18h16');
    });
  });
}

// Copy to Clipboard Feedback
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'hello@alessandrodesign.it';
    navigator.clipboard.writeText(email).then(() => {
      showToast('E-mail copiata negli appunti!');
    }).catch(err => {
      console.error('Errore nella copia: ', err);
    });
  });
}

// Handle Custom Contact Form Interactions
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get inputs
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;

    if (!name || !email || !message) {
      showToast('Per favore, compila tutti i campi.');
      return;
    }

    // Submit animation simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'INVIO IN CORSO...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast('Grazie! Il tuo messaggio è stato inviato.');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Toast System
function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}

// Smooth anchor scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
