// Interactive Features & Fluid Micro-interactions for UI/UX & Visual Design Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initIntersectionObserver();
  initProjectFiltering();
  initMobileMenu();
  initEmailCopy();
  initContactForm();
  initSmoothScroll();
  initScrollHeader();
  initScrollIndicator();
  initProjectModal();
  initThreeJS();
  initPreloader();
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

// Premium moment-of-brand preloader with skip controls per VIBE-CODING-GUIDELINES.md
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloader-bar');
  const percentText = document.getElementById('preloader-percent');
  const skipBtn = document.getElementById('skip-preloader-btn');

  if (!preloader) return;

  let progress = 0;
  let hasSkipped = false;

  // Accessibility Check: Instant skip if prefers-reduced-motion is true
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    dismissPreloader();
    return;
  }

  function dismissPreloader() {
    if (hasSkipped) return;
    hasSkipped = true;

    // Smooth transition fade-out
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';

    setTimeout(() => {
      preloader.remove();
    }, 700);

    // Launch core GSAP animations after preloader clears
    initGSAPAnimations();
  }

  // Bind skip button
  if (skipBtn) {
    skipBtn.addEventListener('click', dismissPreloader);
  }

  // Progress simulation loop
  const interval = setInterval(() => {
    if (hasSkipped) {
      clearInterval(interval);
      return;
    }

    progress += Math.floor(Math.random() * 12) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      if (bar) bar.style.width = '100%';
      if (percentText) percentText.innerText = '100%';

      setTimeout(dismissPreloader, 300);
    } else {
      if (bar) bar.style.width = `${progress}%`;
      if (percentText) percentText.innerText = `${progress}%`;
    }
  }, 60);
}

// Advanced Motion Graphics and Scroll-driven Animations via GSAP & ScrollTrigger
function initGSAPAnimations() {
  // Fail-safe check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP non è caricato.');
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Infinite Horizontal Marquee Ticker Loop
  gsap.to('.ticker-content', {
    xPercent: -50,
    ease: 'none',
    duration: 20,
    repeat: -1
  });

  // 2. High-end Load-In Stagger for Hero Elements
  const heroTl = gsap.timeline();

  // Set initial hidden states to avoid flash of unstyled content
  gsap.set('section[aria-label="Presentazione"] h2, section[aria-label="Presentazione"] h1, section[aria-label="Presentazione"] p, section[aria-label="Presentazione"] .group, section[aria-label="Presentazione"] a:not(.group)', {
    opacity: 0,
    y: 30
  });

  heroTl.to('section[aria-label="Presentazione"] h2', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .to('section[aria-label="Presentazione"] h1', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power4.out'
  }, '-=0.5')
  .to('section[aria-label="Presentazione"] p', {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  }, '-=0.8')
  .to('section[aria-label="Presentazione"] a, section[aria-label="Presentazione"] button', {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.8');

  // 3. Parallax Scrolling for Project SVG Mockups
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('.project-card').forEach(card => {
      const svg = card.querySelector('.project-card-image-container svg');
      if (svg) {
        gsap.fromTo(svg,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });

    // 4. Subtle Page-Wide Section Header Scroll-driven Slide
    gsap.utils.toArray('h3.font-editorial').forEach(heading => {
      gsap.from(heading, {
        letterSpacing: '-0.05em',
        opacity: 0.8,
        duration: 1.5,
        scrollTrigger: {
          trigger: heading,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // 5. Magnet Element Dynamic Hover Response
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.4,
        y: y * 0.4,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// Centered scroll-driven progress connector (Un unico pezzo per Awwwards feel)
function initScrollIndicator() {
  const indicator = document.getElementById('scroll-path-indicator');
  if (!indicator) return;

  const handleScrollIndicator = () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal <= 0) return;

    const scrolledPercent = (window.scrollY / scrollTotal) * 100;
    indicator.style.height = `${scrolledPercent}%`;
  };

  window.addEventListener('scroll', handleScrollIndicator);
  window.addEventListener('resize', handleScrollIndicator);
  handleScrollIndicator(); // Trigger initially
}

// Scroll-triggered header transition (Transparent -> Frosted Glass per DESIGN.md)
function initScrollHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.remove('bg-transparent', 'border-transparent');
      // Dynamic dark glassmorphism styling
      header.classList.add('bg-zinc-950/80', 'backdrop-blur-md', 'border-b', 'border-zinc-900/80');
    } else {
      header.classList.add('bg-transparent', 'border-transparent');
      header.classList.remove('bg-zinc-950/80', 'backdrop-blur-md', 'border-b', 'border-zinc-900/80');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initially
}

// Interactive Project Detail Modal per Figma Design System spec
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalYear = document.getElementById('modal-project-year');
  const modalDescription = document.getElementById('modal-project-description');
  const modalPreview = document.getElementById('modal-project-preview');
  const closeBtn = document.getElementById('close-modal-btn');

  if (!modal || !closeBtn) return;

  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    // Prevent default anchor clicks if cards are wrapped in links
    card.addEventListener('click', (e) => {
      e.preventDefault();

      // Extract details
      const title = card.querySelector('h4') ? card.querySelector('h4').innerText : 'Progetto';
      const category = card.querySelector('.flex span:nth-of-type(1)') ? card.querySelector('.flex span:nth-of-type(1)').innerText : 'UI/UX';
      const year = card.querySelector('.flex span:nth-of-type(3)') ? card.querySelector('.flex span:nth-of-type(3)').innerText : '2026';
      const description = card.querySelector('p') ? card.querySelector('p').innerText : 'Dettaglio Progetto';

      // Clone the internal SVG mockup cleanly
      const svg = card.querySelector('.project-card-image-container svg');

      // Update modal text content
      if (modalTitle) modalTitle.innerText = title;
      if (modalCategory) modalCategory.innerText = category;
      if (modalYear) modalYear.innerText = year;
      if (modalDescription) modalDescription.innerText = description;

      if (modalPreview && svg) {
        modalPreview.innerHTML = '';
        const clonedSvg = svg.cloneNode(true);
        clonedSvg.classList.remove('object-cover', 'w-full', 'h-full');
        clonedSvg.classList.add('w-full', 'max-w-md', 'h-auto');
        modalPreview.appendChild(clonedSvg);
      }

      // Elegant GSAP animation reveals
      if (typeof gsap !== 'undefined') {
        gsap.to(modal, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.4,
          ease: 'power3.out'
        });
        gsap.fromTo(modal.querySelector('> div'),
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' }
        );
      } else {
        modal.classList.remove('opacity-0', 'pointer-events-none');
      }
    });
  });

  // Close modal function
  function closeModal() {
    if (typeof gsap !== 'undefined') {
      gsap.to(modal, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power3.in'
      });
    } else {
      modal.classList.add('opacity-0', 'pointer-events-none');
    }
  }

  closeBtn.addEventListener('click', closeModal);

  // Close on outer click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none') && modal.style.pointerEvents !== 'none') {
      closeModal();
    }
  });
}

// Immersive 3D Constellation and Floating Geometry Background via Three.js
function initThreeJS() {
  const canvas = document.getElementById('canvas-3d');
  if (!canvas) return;

  // Check if THREE is defined (fail-safe for loading)
  if (typeof THREE === 'undefined') {
    console.warn('Three.js non è caricato.');
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 1. Particle System (Constellation)
  const particlesCount = 800;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  // Accent colors per DESIGN.md and VIBE-CODING-GUIDELINES.md: Electric Indigo (#6366f1) and Muted zinc (#3f3f46)
  const indigoColor = new THREE.Color('#6366f1');
  const zincColor = new THREE.Color('#3f3f46');

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Random positions in a sphere/box
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 15;

    // Mix colors randomly (high density of indigo for immersive glow)
    const mixedColor = Math.random() > 0.7 ? indigoColor : zincColor;
    colors[i] = mixedColor.r;
    colors[i + 1] = mixedColor.g;
    colors[i + 2] = mixedColor.b;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Particle Material (subtle soft dots)
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleSystem);

  // 2. Floating Abstract Geometry (Sleek low-poly torus knot in Electric Indigo)
  const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Animation parameters
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Performance optimization: track tab visibility state
  let isTabActive = true;
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function tick() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate floating geometry
    torusKnot.rotation.x = elapsedTime * 0.05;
    torusKnot.rotation.y = elapsedTime * 0.08;

    // Rotate particles slowly
    particleSystem.rotation.y = elapsedTime * 0.02;

    // Smoothly interpolate mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    particleSystem.rotation.x = targetY * 0.5;
    particleSystem.rotation.y += targetX * 0.5;

    // React to scroll position with highly immersive, fluid transitions (Awwwards design system)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? (window.scrollY / scrollHeight) : 0;

    // Fluid position morphs based on scroll percent
    // Hero (0%) -> Projects (25%) -> About (60%) -> Contacts (100%)
    let targetTorusX = 0;
    let targetTorusY = 0;
    let targetTorusZ = 0;
    let targetTorusScale = 1.0;

    if (scrollPercent < 0.3) {
      // Transition Hero to Projects
      const t = scrollPercent / 0.3; // 0 to 1
      targetTorusX = -1.8 * t;
      targetTorusY = -0.5 * t;
      targetTorusZ = t * 0.5;
      targetTorusScale = 1.0 - t * 0.3;
    } else if (scrollPercent < 0.7) {
      // Transition Projects to About
      const t = (scrollPercent - 0.3) / 0.4; // 0 to 1
      targetTorusX = -1.8 + t * 3.6; // Moves to the right
      targetTorusY = -0.5 + t * 0.5;
      targetTorusZ = 0.5 - t * 0.5;
      targetTorusScale = 0.7 + t * 0.4;
    } else {
      // Transition About to Contacts
      const t = (scrollPercent - 0.7) / 0.3; // 0 to 1
      targetTorusX = 1.8 - t * 1.8; // Centered
      targetTorusY = 0.0 - t * 0.5;
      targetTorusZ = 0.0 + t * 1.5; // Moves closer for high immersion
      targetTorusScale = 1.1 + t * 0.4;
    }

    // Smoothly lerp towards target scroll parameters + mouse tracking
    torusKnot.position.x += (targetTorusX + targetX * 1.5 - torusKnot.position.x) * 0.05;
    torusKnot.position.y += (targetTorusY - targetY * 1.5 - torusKnot.position.y) * 0.05;
    torusKnot.position.z += (targetTorusZ - torusKnot.position.z) * 0.05;

    const scaleVal = torusKnot.scale.x + (targetTorusScale - torusKnot.scale.x) * 0.05;
    torusKnot.scale.set(scaleVal, scaleVal, scaleVal);

    // Camera movement tracking the scroll path
    camera.position.y = -window.scrollY * 0.002;

    // Render only when tab is active (saves CPU/GPU per VIBE-CODING-GUIDELINES.md)
    if (isTabActive) {
      renderer.render(scene, camera);
    }

    // Call tick on the next frame
    window.requestAnimationFrame(tick);
  }

  tick();
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
    const email = 'hello@alessandrobottone.it';
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
