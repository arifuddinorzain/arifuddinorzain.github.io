/**
 * ARIF // MODERN PORTFOLIO JAVASCRIPT ENGINE
 * Clean, lightweight, modern interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. NAVBAR SCROLL EFFECT & ACTIVE LINK SPY
  // ==========================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Glass background intensity on scroll
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });
  });

  // ==========================================
  // 2. MOBILE MENU DRAWER
  // ==========================================
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      mobileBtn.textContent = isOpen ? '✕' : '☰';
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileBtn.textContent = '☰';
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 3. DYNAMIC ROLE TYPING TEXT IN HERO
  // ==========================================
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const roles = [
      'Bachelor of Electronic Engineering (UTeM)',
      'Full-Stack Web Developer (PHP & Laravel)',
      'IoT & Embedded Systems Engineer',
      'Process & Form Automation Specialist',
      'Modern UI/UX & Responsive Architect'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 30;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 70;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // Pause before new word
      }

      setTimeout(typeLoop, typeSpeed);
    }
    typeLoop();
  }

  // ==========================================
  // 4. SKILLS CATEGORY FILTERING
  // ==========================================
  const filterTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.dataset.category;

      skillCards.forEach(card => {
        if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ==========================================
  // 5. SCROLL REVEAL & FADE ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { 
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
    // Trigger immediately if already inside viewport on load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      el.classList.add('active');
    }
  });

  // ==========================================
  // 6. CONTACT FORM REAL EMAIL DISPATCH (FORMSUBMIT)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim() || 'Not provided';
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) return;

      if (formFeedback) {
        formFeedback.innerHTML = '<span style="color:var(--primary); font-weight:600;">Sending your message...</span>';
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/arifuddinorzain@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message,
            _subject: `New Portfolio Message from ${name}`
          })
        });

        const data = await response.json();

        if (response.ok || data.success === 'true' || data.success === true) {
          if (formFeedback) {
            formFeedback.innerHTML = '<span style="color:var(--accent-emerald); font-weight:600;">✓ Thank you! Your message was sent directly to Arif\'s email.</span>';
          }
          contactForm.reset();
        } else {
          throw new Error('Failed to send');
        }
      } catch (err) {
        if (formFeedback) {
          formFeedback.innerHTML = '<span style="color:var(--accent-rose); font-weight:500;">Could not send automatically. Please email directly to <a href="mailto:arifuddinorzain@gmail.com" style="color:var(--primary); text-decoration:underline;">arifuddinorzain@gmail.com</a></span>';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
      }
    });
  }

  // ==========================================
  // 7. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
