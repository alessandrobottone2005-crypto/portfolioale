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
  initThreeJS();
  initGSAPAnimations();
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

  // Accent color (Orange rgb: 249, 115, 22) and Muted zinc (161, 161, 170)
  const orangeColor = new THREE.Color('#f97316');
  const zincColor = new THREE.Color('#3f3f46');

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Random positions in a sphere/box
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 15;

    // Mix colors randomly
    const mixedColor = Math.random() > 0.8 ? orangeColor : zincColor;
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

  // 2. Floating Abstract Geometry (Sleek low-poly torus knot)
  const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xf97316,
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
    torusKnot.position.x = targetX * 1.5;
    torusKnot.position.y = -targetY * 1.5;

    // React to scroll position
    const scrollY = window.scrollY;
    camera.position.y = -scrollY * 0.003;

    // Render
    renderer.render(scene, camera);

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
